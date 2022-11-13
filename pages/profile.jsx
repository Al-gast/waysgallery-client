import Button from "../components/Button"
import Card from "../components/Card"
import Layout from "../components/layouts/Layout"
import { useRouter } from "next/router"
import Rp from "rupiah-format"
import { API } from "./api/api"
import { useContext, useEffect, useState } from "react"
import dateFormat from "dateformat";
import { UserContext } from "../context/UserContext"

export default function Profile() {
  const router = useRouter()
  const [state, dispatch] = useContext(UserContext);
  const [profile, setProfile] = useState({})
  const [post, setPost] = useState([])

  // console.log("profileeeeeeeeeeeeeee", profile);
  // console.log("postttttttttttttttttttttttt", post)

  const ID = profile.id

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

  const getPost = async (e) => {
    try {
      const response = await API.get(`/posts/${ID}`);
      console.log("asdfasfdsaf", response);
      setPost(response.data.data);
      console.log("isi post", response.data.data)
    } catch (error) {
      console.log("kena eror wojeokwaeor", error);
    }
  };

  useEffect(() => {
    getPost();
  }, [post]);

  return (
    <Layout>
      <div className="bg-[url('../public/bgDetail.png')] bg-no-repeat bg-cover bg-center">
        <div className="px-40 py-10">
          <div className="grid grid-cols-2 mb-16">
            <div>
              <img src={
                profile.image === ""
                  ? "/noProfile.jpg"
                  : `http://localhost:5000/uploads/${profile.image}`
              }
                alt="profile" className="cursor-pointer h-[110px] w-[110px] object-cover object-center rounded-full mr-4 mb-5" />
              <p className="mb-5 font-bold text-xl">{profile.name}</p>
              <p className="mb-12 font-bold text-4xl">{profile.greeting}</p>
              <Button onClick={() => router.push("/edit-profile")}>Edit Profile</Button>
            </div>
            <div>
              <img src={
                profile.bestArt === ""
                  ? "/noProfile.jpg"
                  : `http://localhost:5000/uploads/${profile.bestArt}`
              } alt=""
                className="object-cover object-center" />
            </div>
          </div>
          <div>
            <p className="mb-10 font-semibold">My Works</p>
            <div className="grid grid-cols-4 gap-2">
              {post?.map((item) =>(
                <div>
                  <img src={`http://localhost:5000/uploads/${item?.image1}`} alt="" onClick={() => router.push(`/detail/${item.userID}`)} className="cursor-pointer"/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
