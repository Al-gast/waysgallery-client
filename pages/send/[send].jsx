import Layout from "../../components/layouts/Layout"
import Button from "../../components/Button"
import { useContext, useState } from "react"
import { API } from "../api/api"
import { useRouter } from "next/router"
import { Error, Success } from '../../helper/toast';
import { UserContext } from "../../context/UserContext"

export default function SendProject() {
    const [state, dispatch] = useContext(UserContext);
    const [preview, setPreview] = useState(null);
    const [preview2, setPreview2] = useState(null);
    const [preview3, setPreview3] = useState(null);
    const [preview4, setPreview4] = useState(null);
    const [preview5, setPreview5] = useState(null);
    const router = useRouter();
  
    const [form, setForm] = useState({
      status: "complete",
      projectDesc: "",
      image1: "",
      image2: "",
      image3: "",
      image4: "",
      image5: "",
    });
  
    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]:
          e.target.type === "file" ? e.target.files[0] : e.target.value,
      });
  
      if (e.target.type == "file") {
        const url = URL.createObjectURL(e.target.files[0]);
        setPreview(url);
      }
    };
  
    const handleChange2 = (e) => {
      setForm({
        ...form,
        [e.target.name]:
          e.target.type === "file" ? e.target.files[0] : e.target.value,
      });
  
      if (e.target.type == "file") {
        const url = URL.createObjectURL(e.target.files[0]);
        setPreview2(url);
      }
    };
  
    const handleChange3 = (e) => {
      setForm({
        ...form,
        [e.target.name]:
          e.target.type === "file" ? e.target.files[0] : e.target.value,
      });
  
      if (e.target.type == "file") {
        const url = URL.createObjectURL(e.target.files[0]);
        setPreview3(url);
      }
    };
  
    const handleChange4 = (e) => {
      setForm({
        ...form,
        [e.target.name]:
          e.target.type === "file" ? e.target.files[0] : e.target.value,
      });
  
      if (e.target.type == "file") {
        const url = URL.createObjectURL(e.target.files[0]);
        setPreview4(url);
      }
    };
  
    const handleChange5 = (e) => {
      setForm({
        ...form,
        [e.target.name]:
          e.target.type === "file" ? e.target.files[0] : e.target.value,
      });
  
      if (e.target.type == "file") {
        const url = URL.createObjectURL(e.target.files[0]);
        setPreview5(url);
      }
    };
  
    let id = router.query.send
  
    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
  
        const formData = new FormData();
        if (preview) {
          formData.set("image1", form?.image1, form?.image1.name);
        }
        if (preview2) {
          formData.set("image2", form?.image2, form?.image2.name);
        }
        if (preview3) {
          formData.set("image3", form?.image3, form?.image3.name);
        }
        if (preview4) {
          formData.set("image4", form?.image4, form?.image4.name);
        }
        if (preview5) {
          formData.set("image5", form?.image5, form?.image5.name);
        }
        formData.set("projectDesc", form.projectDesc);
        formData.set("status", form.status);
  
        const response = await API.patch(`/transaction/${id}`, formData);
  
        const auth = await API.get("/check-auth");
  
        let payload = auth.data.data;
  
        dispatch({
          type: "USER_SUCCESS",
          payload,
        });
        
        Success({ message: `Project Sended Successfully!` })

        router.push("/my-offer");
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <Layout>
      <div className="md:px-40 py-5">
      <form onSubmit={(e) => handleSubmit(e)}>
            <div className="grid grid-cols-5 gap-5">
                <div className="col-span-3">
                    {preview ? (
                        preview && (
                            <div>
                                <img src={preview} alt={preview} className="w-full h-full object-cover rounded mb-5" />
                            </div>
                        )
                    ) : (
                        <div className="w-full border-4 border-gray-300 border-dashed p-16 rounded-xl mb-3">
                            <div className="flex justify-center">
                                <img src="/uploadCloud.svg" alt="upload" width={250} height={196} className="mb-5 self-center"/>
                            </div>
                            <div className="flex justify-center">
                                <label htmlFor="image1"><span className="text-primary font-bold">Browse</span> to choose a file</label>
                                <input type="file" id="image1" name="image1" hidden onChange={handleChange} className="w-full h-full"/>
                            </div>
                        </div>
                    )}
                    <div className="grid grid-cols-4 gap-3">
                        {preview2 ? (
                            preview2 && (
                            <div>
                                <img src={preview2} alt={preview2} className="w-full object-cover rounded"/>
                            </div>
                            )
                        ) : (    
                            <div className="w-full border-4 border-gray-300 border-dashed pt-6 rounded-xl mb-3">
                                <div className="flex justify-center">
                                    <label htmlFor="image2"><img src="/uploadPlus.svg" alt="upload" width={53} height={53} className="mb-5 self-center"/></label>
                                    <input type="file" hidden id="image2" name="image2" onChange={handleChange2}/>
                                </div>
                            </div>
                        )}
                        {preview3 ? (
                            preview3 && (
                            <div>
                                <img src={preview3} alt={preview3} className="w-full object-cover rounded"/>
                            </div>
                            )
                        ) : (    
                            <div className="w-full border-4 border-gray-300 border-dashed pt-6 rounded-xl mb-3">
                                <div className="flex justify-center">
                                    <label htmlFor="image3"><img src="/uploadPlus.svg" alt="upload" width={53} height={53} className="mb-5 self-center"/></label>
                                    <input type="file" hidden id="image3" name="image3" onChange={handleChange3}/>
                                </div>
                            </div>
                        )}
                        {preview4 ? (
                            preview4 && (
                            <div>
                                <img src={preview4} alt={preview4} className="w-full object-cover rounded"/>
                            </div>
                            )
                        ) : (    
                            <div className="w-full border-4 border-gray-300 border-dashed pt-6 rounded-xl mb-3">
                                <div className="flex justify-center">
                                    <label htmlFor="image4"><img src="/uploadPlus.svg" alt="upload" width={53} height={53} className="mb-5 self-center"/></label>
                                    <input type="file" hidden id="image4" name="image4" onChange={handleChange4}/>
                                </div>
                            </div>
                        )}
                        {preview5 ? (
                            preview5 && (
                            <div>
                                <img src={preview5} alt={preview5} className="w-full object-cover rounded"/>
                            </div>
                            )
                        ) : (    
                            <div className="w-full border-4 border-gray-300 border-dashed pt-6 rounded-xl mb-3">
                                <div className="flex justify-center">
                                    <label htmlFor="image5"><img src="/uploadPlus.svg" alt="upload" width={53} height={53} className="mb-5 self-center"/></label>
                                    <input type="file" hidden id="image5" name="image5" onChange={handleChange5}/>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-span-2">
                    <textarea name="projectDesc" onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-gray-200 transition duration-300 bg-gray-100 h-52 mb-8" placeholder="Description"></textarea>
                    <div className="flex justify-center">
                        <Button type="submit">Send Project</Button>
                    </div>
                </div>
            </div>
        </form>
      </div>
    </Layout>
  )
}
