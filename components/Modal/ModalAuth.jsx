import { useContext, useState } from "react"
import Button from "../Button"
import Input from "../Input"
import Modal from './modal'
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { API } from "../../pages/api/api";
import { Error, Success } from '../../helper/toast';

export default function ModalAuth() {    
  
  //show modal
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const notify = () => toast("Wow so easy!");

  //switch modal
  const handleSwitchRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  }

  const handleSwitchLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  }

  //functional
  const [login, setLogin] = useState({})
  const router = useRouter()
  const [state, dispatch] = useContext(UserContext)

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      const config = {
        headers: {
          "Content-Type": "aplication/json"
        }
      }
      const body = JSON.stringify(form)

      const response = await API.post("/login", body, config)

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data
      })
      setShowLogin(false)
      Success({ message: `Login Success!` })
        router.push("/home")
    }catch (error) {
      Error({ message: `Login Filed!` })
    }
  }) 

  const [register, setRegister] = useState({
    email: "",
    password: "",
    name: "",
  });
  
  const handleChangeRegister = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  }
  const handleSubmitRegister = useMutation(async (e) => {
    try {
      e.preventDefault();
      const config = {
        Headers: {
          "Content-type": "aplication/json",
        },
      };
      const body = JSON.stringify(register);

      const response = await API.post("/register", body, config);

      Success({ message: `Register Successs!` })

      setShowLogin(true);
      setShowRegister(false);

    } catch (error) {
      Error({ message: `Register Filed!` })
    }
    setShowRegister(false)
  })
 
  return (
    <>
        <>
            <Button className="px-6 py-1.5 bg-primary text-white rounded md:mx-1 hover:bg-white hover:text-primary text-sm font-medium transition duration-300" onClick={() => setShowRegister(true)}>Join Now</Button>
            <Modal isVisible={showRegister} onClose={() => setShowRegister(false)}>
            <h1 className="font-semibold text-4xl text-primary mb-7">Register</h1>
              <form onSubmit={(e) => handleSubmitRegister.mutate(e)}>
                <div>
                  <Input 
                  type='email' 
                  placeholder="Email"
                  onChange={handleChangeRegister}
                  name="email"
                  />
                </div>
                <div>
                  <Input 
                  type='password' 
                  placeholder="Password"
                  onChange={handleChangeRegister}
                  name="password"
                  />
                </div>
                <div>
                  <Input 
                  type='text' 
                  placeholder="Full Name"
                  onChange={handleChangeRegister}
                  name="name"
                  />
                </div>
                <div className="mb-3">
                  <Button type="submit" className="w-full bg-primary text-white rounded-xl hover:bg-white hover:text-primary hover:border-primary  text-sm font-medium transition duration-300 py-2.5">Register</Button>
                </div>
                <div className="text-sm font-medium text-gray-500 text-center">
                Already have an account ? <a onClick={handleSwitchLogin} className="text-gray-600 font-bold hover:underline">Klik Here</a>
                </div>
              </form>
            </Modal>
        </>

        <>
            <Button className="px-6 py-1.5 bg-gray-300 text-black rounded md:mx-1 hover:bg-primary hover:text-white text-sm font-medium transition duration-300" onClick={() => setShowLogin(true)}>Login</Button>
            <Modal isVisible={showLogin} onClose={() => setShowLogin(false)}>
              <h1 className="font-semibold text-4xl text-primary mb-10">Login</h1>
              <form onSubmit={(e) => handleSubmit.mutate(e)}>
                <div>
                  <Input 
                  type='email' 
                  placeholder="Email"
                  name="email"
                  id="email"
                  onChange={handleChange}/>
                </div>
                <div className="mb-8">
                  <Input 
                  type='password' 
                  placeholder="Password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  />
                </div>
                <div>
                  <Button type="submit" className="w-full bg-primary text-white rounded-xl hover:bg-white hover:text-primary hover:border-primary  text-sm font-medium transition duration-300 py-2.5 mb-5">Login</Button>
                </div>
                <div className="text-sm font-medium text-gray-500 text-center">
                Do not have an account ? <a onClick={handleSwitchRegister} className="text-gray-600 font-bold hover:underline">Klik Here</a>
                </div>
              </form>
            </Modal>
        </>

    </>
  )
}
