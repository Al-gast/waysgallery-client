import { useRouter } from "next/router";
import { API } from "./api/api";

//component
import Layout from "../components/layouts/Layout"
import Input from "../components/Input";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter()
  const [post, setPost] = useState([]);
  const [search, setSearch] = useState("")

  useEffect(() => {
    const getPost = async (e) => {
      try {
        const response = await API.get("/posts");
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
      <div className="md:px-20">
        <div className="flex justify-between">
          <div className="mt-6">
            <select
            name="role" 
            className="w-32 rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-gray-200 transition duration-300 bg-gray-100">
              <option value="today">Today</option>
              <option value="following">Following</option>
            </select>
          </div>
          <div className="mt-5">
            <Input type="search" placeholder="search..." onChange={(e) => setSearch(e.target.value)}/>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
        {post?.filter((item)=>{
          return search.toLowerCase() === "" ? item : item.title.toLowerCase().includes(search)
        }).map((post, index) => (
          <div key={post.id} className="cursor-pointer">
            {post?.image1 ? (
              <div onClick={() => router.push(`/detail/${post.id}`)}>
                <img src={post.image1} alt="" />
              </div>
            ) : (
              <img
                src="noProfile.jpg"
                alt="a"
                className="object-cover h-[200px] w-[200px]"
              />
            )}
          </div>
        ))}
        </div>
      </div>
      
    </Layout>
    </>
  )
}

