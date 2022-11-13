import Layout from "../components/layouts/Layout"
import Input from "../components/Input"
import Button from "../components/Button"
import { useContext, useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { API } from "./api/api"
import { useRouter } from "next/router"
import { UserContext } from "../context/UserContext"
import { Error, Success } from '../helper/toast';

export default function EditProfile() {
    const [state, dispatch] = useContext(UserContext);
    const [preview, setPreview] = useState(null);
    const [preview1, setPreview1] = useState(null);
    const router = useRouter();
  
    // const navigateProfile = () => {
    //   router.push("profile");
    // };
  
    // useEffect(() => {
    //   document.title = "Edit Profile";
    // }, []);
  
    const [form, setForm] = useState({
      name: "",
      image: "",
      greeting: "",
      bestArt: "",
    });
  
    const id = state?.user.id;
  
    // let { data: user } = useQuery("userCache", async () => {
    //   const response = await API.get("/user/" + id);
    //   return response.data.data;
    // });
  
    // console.log(form);
  
    // useEffect(() => {
    //   if (user) {
    //     setForm({
    //       ...form,
    //       name: user.name,
    //       image: user.image,
    //       greeting: user.greeting,
    //       bestArt: user.bestArt,
    //     });
    //   }
    // }, [user]);
  
    useEffect(() => {
        const getData = async (e) => {
          try {
            const response = await API.get(`/check-auth`)

            // console.log("responseeeeeeeeeeeeeeee", response);
    
            setForm({
              name: response.data.data.name,
              image: response.data.data.image,
              greeting: response.data.data.greeting,
              bestArt: response.data.data.bestArt,
            })
          }catch (error){
            console.log(error);
          }
        }
        getData()
      }, [])

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
  
    const handleChange1 = (e) => {
      setForm({
        ...form,
        [e.target.name]:
          e.target.type === "file" ? e.target.files[0] : e.target.value,
      });
  
      if (e.target.type == "file") {
        const url = URL.createObjectURL(e.target.files[0]);
        setPreview1(url);
      }
    };
  
    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
  
        const formData = new FormData();
        if (preview) {
          formData.set("image", form?.image, form?.image.name);
        }
        if (preview1) {
          formData.set("bestArt", form?.bestArt, form?.bestArt.name);
        }
        formData.set("name", form.name);
        formData.set("greeting", form.greeting);
  
        const response = await API.patch(`/user/${id}`, formData);
  
        const auth = await API.get("/check-auth");
  
        let payload = auth.data.data;
  
        dispatch({
          type: "USER_SUCCESS",
          payload,
        });
        Success({ message: `Profile Updated!` })
        router.push("/profile");
      } catch (error) {
        console.log(error);
        Error({ message: `Update Profile Filed!` })
      }
    };

    // const handleSubmit = useMutation(async (e) => {
    //     try {
    //       e.preventDefault()
    
    //       const formData = new FormData()
    //       formData.set("name", profile.name)
    //       formData.set("greeting", profile.greeting)
    //       if (preview) {
    //         formData.set("image", profile?.image[0], profile?.image[0]?.name)
    //       }
    //       if (preview1) {
    //         formData.set("bestArt", profile?.image[0], profile?.image[0]?.name)
    //       }
    //       const response = await API.patch(`/user/${id}`, formData)
    
    //       Success({ message: `Update Profile Success!` })
    //       router.push('/profile')
    //     }catch(error){
    //       Error({ message: `Update Profile Filed!` })
    //       console.log(error);
    //     }
    //   })
  

  return (
    <Layout>
      <div className="md:px-40 py-5">
        <form onSubmit={(e) => handleSubmit(e)}>            
        <div className="grid grid-cols-5 gap-5">
            <div className="col-span-3">
                {preview1 ? (
                    preview1 &&(
                        <div>
                            <img src={preview1} alt={preview1} className="w-full object-cover rounded"/>
                        </div>
                    )
                ) : (
                    <div className="w-full border-4 border-gray-300 border-dashed p-16 py-40 rounded-xl mb-3">
                        <div className="flex justify-center">
                            <label htmlFor="bestart"><span className="text-primary font-bold">Upload</span> Best Your Art</label>
                            <input type="file" id="bestart" name="bestArt" hidden onChange={handleChange1}/>
                        </div>
                    </div>
                )}
            </div>
            <div className="col-span-2">
                <div className="flex justify-center items-center">
                    {preview ? (
                        preview &&(
                            <div>
                                <img src={preview} alt={preview} className="rounded-full object-cover object-center w-[200px] h-[200px]"/>
                            </div>
                        )
                    ) : (
                        <div className="w-40 h-40 border-4 border-gray-300 border-dashed rounded-full flex justify-center items-center">
                            <div className="flex justify-center">
                                <label htmlFor="image">
                                    <img src="/camera.svg" alt="" width={103} height={86}/>
                                </label>
                                <input type="file" id="image" name="image" hidden onChange={handleChange}/>
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-5">
                    <Input type="text" placeholder="Greeting" name="greeting" onChange={handleChange} value={form.greeting}/> 
                    <Input type="text" placeholder="Full Name" name="name" onChange={handleChange} value={form.name}/> 
                    <div className="flex justify-center mt-3">
                        <Button type="submit">save</Button>
                    </div>
                </div>
            </div>
        </div>
        </form>
      </div>
    </Layout>
  )
}
