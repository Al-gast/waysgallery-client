import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";


//component
import { UserContext } from "../context/UserContext";
import Button from "../components/Button";
import ModalAuth from "../components/Modal/ModalAuth";

export default function Landing() {
  const router = useRouter()
  
  const [state, dispatch] = useContext(UserContext)

  // modal login
  const [showLogin, setShowLogin] = useState(false);
  const handleClick = () => setShowLogin(true);

  // const [shop, setShop] = useState([])

  // useEffect(() => {
  //   const getShops = async (e) => {
  //     try {
  //       const response = await API.get("/partners");
  //       setShop(response.data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getShops();
  // }, []);

  return (
    <>
    {/* <Layout title={process.env.appName} setShowLogin={setShowLogin} showLogin={showLogin}> */}
      <div className="flex justify-center items-center bg-[url('../public/landing1.png')] bg-no-repeat bg-cover bg-center">
      <div className='grid md:grid-cols-4 content-center px-1 py-[40px]'>
        <div className="py-20 col-span-2">
          <div className="">
            <img src="/logo.png" alt="logo" width={300} />
            <h1 className=" text-2xl font-semibold mb-2">show your work to inspire everyone</h1>
            <p className="text-sm w-96 mb-5">
              Ways Exhibition is a website design creators gather to share their work with other creators
            </p>
            <ModalAuth/>
            {/* <div>
               <Button className="px-6 py-1.5 bg-primary text-white rounded md:mx-1 hover:bg-white hover:text-primary text-sm font-medium transition duration-300">Join Now</Button>
              <Button className="px-6 py-1.5 bg-gray-300 text-black rounded ml-1 md:mx-1 hover:bg-primary hover:text-white text-sm font-medium transition duration-300">Login</Button> 
            </div> */}
          </div>
        </div>
        <div className="col-span-2">
          <img src='/landing.svg' alt="main" width={486} height={439}/>
        </div>
      </div>
      </div>

    {/* </Layout> */}
    </>
  )
}
