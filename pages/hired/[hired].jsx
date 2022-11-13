import Layout from "../../components/layouts/Layout"
import Input from "../../components/Input"
import Button from "../../components/Button"
import { useContext, useState } from "react"
import { useMutation } from "react-query"
import { API } from "../api/api"
import { useRouter } from "next/router"
import { Error, Success } from '../../helper/toast';
import { UserContext } from "../../context/UserContext"

export default function Hired() {
  const router = useRouter()
  const [state, dispatch] = useContext(UserContext);
  const id = router.query.hired
  const buyer_id = state.user.id;

  const [form, setForm] = useState({
    admin_id: parseInt(id),
    buyer_id: buyer_id,
    title: "",
    desc: "",
    startDate: "",
    endDate: "",
    price: "",
  });

  const { title, desc, startDate, endDate, price } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await API.post(`/transaction`, form);

      const auth = await API.get("/check-auth");

      let payload = auth.data.data;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      Success({ message: `Project Sended Successfully!` })
      router.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="md:px-72 py-10">
        <div className="col-span-2">
            <form onSubmit={(e) => handleSubmit(e)}>
                <Input type="text" placeholder="Title" name="title" onChange={handleChange}/> 
                <textarea onChange={handleChange} name="desc" className="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-gray-200 transition duration-300 bg-gray-100 h-36 mb-5" placeholder="Description"></textarea>
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <Input type="date" name="startDate" onChange={handleChange}/>
                    </div>
                    <div>
                        <Input type="date" name="endDate" onChange={handleChange}/>
                    </div>
                </div>
                <Input type="text" placeholder="Price" name="price" onChange={handleChange}/>
                <div className="flex justify-center mt-5">
                    <Button className="px-6 py-1.5 bg-gray-400 text-white rounded ml-1 md:mx-1 hover:bg-white hover:text-gray-400 text-sm font-medium transition duration-300">Cancel</Button>
                    <Button type="submit">bidding</Button>
                </div>
            </form>
        </div>
      </div>
    </Layout>
  )
}
