import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API } from "../api/api";

//component
import Layout from "../../components/layouts/Layout"
import Button from "../../components/Button";

export default function Detail() {
  const router = useRouter()
  const [post, setPost] = useState([])
  const id = router.query.detail

  useEffect(() => {
    const getPost = async (e) => {
      try {
        const response = await API.get(`/post/${id}`);
        setPost(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, []);

  return (
    <>
    <Layout title={process.env.appName}>
      <div className="md:px-60 py-5">
      <div className="flex justify-between items-center mb-5">
            <div>
              <div className="flex items-center " onClick={() => router.push(`/user/${post?.userID}`)}>
                  <img src={post?.userId?.image} alt="profile" className="cursor-pointer h-[60px] w-[60px] object-cover object-center rounded-full mr-4"/>
                  <div>
                      <p className="font-bold text-lg cursor-pointer">{post?.title}</p>
                      <p className="cursor-pointer">{post?.userId?.name}</p>
                  </div>
              </div>
            </div>
              <div className="flex items-center">
              <div>
                <Button onClick={() => router.push("/upload")} className="px-6 py-1.5 bg-gray-400 text-white rounded ml-1 md:mx-1 hover:bg-white hover:text-gray-400 text-sm font-medium transition duration-300">Follow</Button>
                <Button onClick={() => router.push(`/hired/${post?.userId?.id}`)} className="px-6 py-1.5 bg-primary text-white rounded ml-1 md:mx-1 hover:bg-white hover:text-primary text-sm font-medium transition duration-300">Hire</Button>
              </div>
            </div>
        </div>
        <div className="mb-5">
            <img src={post?.image1} alt="" className="w-full"/>
            <div className="flex justify-center mt-3">
              <div className="mr-1">
                {post?.image2 ? (
                  <img src={post?.image2} alt="" className="w-36"/>
                ) : (
                  <div className="hidden"></div>
                )}         
              </div>
              <div className="mr-1">
                {post?.image3 ? (
                  <img src={post?.image3} alt="" className="w-36"/>
                ) : (
                  <div className="hidden"></div>
                )}         
              </div>
              <div className="mr-1">
                {post?.image4 ? (
                  <img src={post?.image4} alt="" className="w-36"/>
                ) : (
                  <div className="hidden"></div>
                )}         
              </div>
              <div className="mr-1">
                {post?.image5 ? (
                  <img src={post?.image5} alt="" className="w-36"/>
                ) : (
                  <div className="hidden"></div>
                )}         
              </div>
            </div>
        </div>
        <div>
            <p className="font-bold mb-3">👋 Say Hello <span className="text-primary">{post?.userId?.email}</span></p>
            <p>{post?.desc}</p>
        </div>
      </div>
    </Layout>
    </>
  )
}

