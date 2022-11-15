import Button from "../../components/Button"
import Layout from "../../components/layouts/Layout"
import { useRouter } from "next/router"
import { API } from "../api/api"
import { useEffect, useState } from "react"

export default function DetailUser() {
  const router = useRouter()
  const [user, setUser] = useState({})
  const [post, setPost] = useState([])
  
  const id = router.query.user
  const ID = user.id

  useEffect(() => {
    const getUser = async (e) => {
      try {
        const response = await API.get(`/user/${id}`);
        setUser(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const getPost = async (e) => {
      try {
        const response = await API.get(`/posts/${ID}`);
        setPost(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPost();
  }, [post]);

  return (
    <Layout>
      <div className="bg-[url('../public/bgDetail.png')] bg-no-repeat bg-cover bg-center">
      <div className="px-40 py-10">
          <div className="grid grid-cols-2 mb-16">
            <div>
              <img src={
              user.image === ""
                ? "/noProfile.jpg"
                : user.image
            }  alt="profile" onClick={() => setShowDropdown(true)} className="cursor-pointer h-[110px] w-[110px] object-cover object-center rounded-full mr-4 mb-5"/>
              <p className="mb-5 font-bold text-xl">{user.name}</p>
              <p className="mb-12 font-bold text-4xl">{user.greeting}</p>
              <div>
                <Button onClick={() => router.push("/home")} className="px-6 py-1.5 bg-gray-400 text-white rounded ml-1 md:mx-1 hover:bg-white hover:text-gray-400 text-sm font-medium transition duration-300">Follow</Button>
                <Button onClick={() => router.push(`/hired/${user?.id}`)} className="px-6 py-1.5 bg-primary text-white rounded ml-1 md:mx-1 hover:bg-white hover:text-primary text-sm font-medium transition duration-300">Hire</Button>
              </div>
            </div>
            <div>
              <img src={
              user.bestArt === ""
                ? "/noProfile.jpg"
                : user.bestArt
            } alt="" />
            </div>
          </div>
          <div>
            <p className="mb-10 font-semibold">{user.name} Works</p>
            <div className="grid grid-cols-4 gap-2">
            {post?.map((item) =>(
                <div key={item.id}>
                  <img src={item.image1} alt="" onClick={() => router.push(`/detail/${item.userID}`)} className="cursor-pointer"/>
                </div>
              ))}
            </div>
          </div>
      </div>
      </div>
    </Layout>
  )
}
