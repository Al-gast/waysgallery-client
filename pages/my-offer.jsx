import { useContext, useEffect, useState } from "react";
import Layout from "../components/layouts/Layout"
import { API } from "./api/api";
import { UserContext } from "../context/UserContext";
import { useQuery } from "react-query";
import Button from "../components/Button";
import { useRouter } from "next/router";

export default function MyOffer() {

  const [state, dispatch] = useContext(UserContext);
  const [idTransaction, setIdTransaction] = useState();
  const router = useRouter()

  let { data: transactions, refetch } = useQuery(
    "mytransactions12Cacwadhe",
    async () => {
      const response = await API.get("/my-transactions");
      const response2 = response.data.data.filter(
        (p) => p.admin_id == state.user.id
      );
      return response2;
    }
  );

  const [form] = useState({
    status: "cancel",
  });

  const [formProgress] = useState({
    status: "progress",
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("status", form.status);

      const response = await API.patch(
        `/transaction/${idTransaction}`,
        formData
      );

      const auth = await API.get("/check-auth");

      let payload = auth.data.data;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });

      refetch();
      setIdTransaction("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit1 = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("status", formProgress.status);

      const response = await API.patch(
        `/transaction/${idTransaction}`,
        formData
      );

      const auth = await API.get("/check-auth");

      let payload = auth.data.data;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });

      refetch();
      setIdTransaction("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="px-40 py-10">
      <div className="mb-7">
          <p>My Offer</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-md text-gray-700 bg-gray-50">
              <tr className="">
                <th scope="col" className="py-3 px-6">No</th>
                <th scope="col" className="py-3 px-6">Client</th>
                <th scope="col" className="py-3 px-6">Order</th>
                <th scope="col" className="py-3 px-6">Star Project</th>
                <th scope="col" className="py-3 px-6">End Project</th>
                <th scope="col" className="py-3 px-6">Status</th>
                <th scope="col" className="py-3 px-6">Action</th>
              </tr>
            </thead>
              <tbody>
              {transactions?.map((item, index) => (
                <tr className="border-b bg-white">
                  <td className="py-4 px-6">{index + 1}</td>
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">{item.buyer.name}</th>
                  <td className="py-4 px-6">{item.title}</td>
                  <td className="py-4 px-6">{item.startDate}</td>
                  <td className='py-4 px-6'>{item.endDate}</td>
                  <td className={
                      item.status === "pending"
                        ? "py-4 px-6 text-yellow-600"
                        : item.status === "On The Way"
                        ? "py-4 px-6 text-blue-600"
                        : item.status === "complete"
                        ? "py-4 px-6 text-green-600"
                        : item.status === "cancel"
                        ? "py-4 px-6 text-red-600"
                        : ""
                    }>
                    {item.status}
                  </td>
                  <td>
                    {item.status === "pending" ? (
                      <div>
                        <Button
                        className="px-5 py-1 bg-red-600 text-white rounded ml-1 md:mx-1 hover:bg-white hover:text-red-600 text-sm font-medium transition duration-300" 
                        onClick={(e) => {
                          setIdTransaction(item.id);
                          handleSubmit(e);
                        }}>
                          Cancel
                        </Button>
                        <Button
                        className="px-5 py-1 bg-green-500 text-white rounded ml-1 md:mx-1 hover:bg-white hover:text-green-500 text-sm font-medium transition duration-300"
                        onClick={(e) => {
                          setIdTransaction(item.id);
                          handleSubmit1(e);
                        }}>
                          Approve
                        </Button>
                      </div>
                    ) : item.status === "progress" ? (
                        <Button
                        className="px-5 py-1 bg-primary text-white rounded ml-1 md:mx-1 hover:bg-white hover:text-primary text-sm font-medium transition duration-300"
                        onClick={() => {
                          router.push(`/send/${item.id}`);
                        }}>Send Progress</Button>
                    ) : item.status === "cancel" ? (
                      <img src="/cancel.svg" alt="" className="ml-8"/>
                    ) : item.status === "complete" ? (
                      <Button
                      className="px-5 py-1 bg-primary text-white rounded ml-1 md:mx-1 hover:bg-white hover:text-primary text-sm font-medium transition duration-300"
                      onClick={() => {
                        router.push(`/view/${item.id}`);
                      }}>View Project</Button>
                    ) : (
                      <div></div>
                    )}
                  </td>
                </tr>
              ))}
              </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}
