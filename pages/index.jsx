//component
import ModalAuth from "../components/Modal/ModalAuth";

export default function Landing() {  
  return (
    <>
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
          </div>
        </div>
        <div className="col-span-2">
          <img src='/landing.svg' alt="main" width={486} height={439}/>
        </div>
      </div>
      </div>
    </>
  )
}
