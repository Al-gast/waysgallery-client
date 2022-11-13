import { useContext, useEffect, useState } from "react";
import Layout from "../components/layouts/Layout"
import Transaction from "../dummy/transaction"
import { API } from "./api/api";
import { UserContext } from "../context/UserContext";
import { useQuery } from "react-query";
import Button from "../components/Button";
import { useRouter } from "next/router";
import Modal from "../components/Modal/modal";
import Rp from "rupiah-format"

export default function MyOrder() {

  const [state] = useContext(UserContext);
  const router = useRouter()
  const [showTrans, setShowTrans] = useState(false);
  const [idTrans, setIdTrans] = useState(null);

  const handleShow = (id) => {
    setIdTrans(id);
    setShowTrans(true);
  };

    let { data: transactions } = useQuery(
      "mytransactions12Cacwadhe",
      async () => {
        const response = await API.get("/my-transactions");
        const response2 = response.data.data.filter(
          (p) => p.buyer_id == state.user.id
        );
        return response2;
      }
    );

    console.log("transactionsssssssssssss", transactions);

  return (
    <Layout>
      <div className="px-40 py-10">
      <div className="mb-7">
          <p>My Order</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-md text-gray-700 bg-gray-50">
              <tr className="">
                <th scope="col" className="py-3 px-6">No</th>
                <th scope="col" className="py-3 px-6">Vendor</th>
                <th scope="col" className="py-3 px-6">Order</th>
                <th scope="col" className="py-3 px-6">Star Project</th>
                <th scope="col" className="py-3 px-6">End Project</th>
                <th scope="col" className="py-3 px-6">Status</th>
                <th scope="col" className="py-3 px-6">Action</th>
              </tr>
            </thead>
              <tbody>
              {transactions?.map((item, index) => (
                  <tr className="border-b bg-white" onClick={() => handleShow(item.id)} key={item.id}>
                    <td className="py-4 px-6">{index + 1}</td>
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">{item.admin.name}</th>
                    <td className="py-4 px-6">{item.title}</td>
                    <td className="py-4 px-6">{item.startDate}</td>
                    <td className='py-4 px-6'>{item.endDate}</td>
                    <td className={
                        item.status === "pending"
                          ? "py-4 px-6 text-yellow-600"
                          : item.status === "progres"
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
                          <img src="/pending.svg" alt="" className="ml-8"/>
                      ) : item.status === "progress" ? (
                            <img src="/success.svg" alt="" className="ml-8"/>
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
                  <Modal isVisible={showTrans} onClose={() => setShowTrans(false)}>
                    <p>Title : {transactions?.id?.title}</p>
                    <p>Desc : {transactions?.id?.projectDesc}</p>
                    <p>Price : {Rp.convert(transactions?.id?.price)}</p>
                  </Modal>
              </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}
