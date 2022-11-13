import Image from "next/image";
import Link from "next/link";

import ModalAuth from "../Modal/ModalAuth";
import Dropdown from "./dropdown/dropdown";

import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Error, Success } from '../../helper/toast';
import { API } from "../../pages/api/api";
import Button from "../Button";


export default function Navbar({showLogin, setShowLogin, counter}) {
  const [state, dispatch] = useContext(UserContext)
  console.log(state);
  // const [carts, setCarts] = useContext(CartContext)
  const isLogin = state.isLogin
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter()
  const [profile, setProfile] = useState({})

  useEffect(() => {
    const getProfile = async (e) => {
      try {
        const response = await API.get("/check-auth");
        setProfile(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, []);

  const logout = () => {
    dispatch({
      type:"LOGOUT"
    })
    router.push("/")
    Success({ message: `Logout Success!` })
  }

  return (
    <nav className="bg-white sticky top-0 border-b-2">
      <div className="container">
        <div className="flex justify-between items-center p-1">
            <div>
              <Link href="/home">
                <Image src='/logo.png' alt="logo" width={126} height={83} className='cursor-pointer'/>
              </Link>
            </div>
              <div className="flex items-center">
              <div>
                <Button onClick={() => router.push("/upload")} className="px-6 py-1.5 bg-primary text-white rounded ml-1 md:mx-1 hover:bg-white hover:text-primary text-sm font-medium transition duration-300">Upload</Button>
              </div>
              <div className="ml-3">
                <img src={
                  profile.image === ""
                    ? "/noProfile.jpg"
                    : `http://localhost:5000/uploads/${profile.image}`
                } alt="profile" onClick={() => setShowDropdown(true)} className="cursor-pointer h-[60px] w-[60px] object-cover object-center rounded-full"/>
                <Dropdown isVisible={showDropdown} onClose={() => setShowDropdown(false)}>
                  <div>
                    <Link href='/profile'>
                      <div className="flex items-center mb-1 mr-[76px] ml-4 cursor-pointer">
                        <Image src="/profileDropdown.svg" alt='profile' width={33.37} height={39.95}/>
                        <p className="ml-2">Profile</p>
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link href='/my-order'>
                      <div className="flex items-center mb-1 mr-[25px] ml-[15px] cursor-pointer">
                        <Image src='/orderDropdown.svg' alt='profile' width={33.37} height={39.95}/>
                        <p className="ml-2">Order</p>
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link href='/my-offer'>
                      <div className="flex items-center mb-1 mr-[25px] ml-[15px] cursor-pointer">
                        <Image src='/orderDropdown.svg' alt='profile' width={33.37} height={39.95}/>
                        <p className="ml-2">Offer</p>
                      </div>
                    </Link>
                  </div>
                  <hr />
                  <div className="flex items-center mt-1  mr-10 ml-4 cursor-pointer" onClick={logout}>
                    <Image src='/logoutDropdown.svg' alt='profile' width={33.37} height={39.95}/>
                    <p className="ml-2">Logout</p>
                  </div>
                </Dropdown>
              </div>
            </div>
        </div>
      </div>
    </nav>
  )
}
