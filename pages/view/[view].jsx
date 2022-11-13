import Layout from "../../components/layouts/Layout"
import Input from "../../components/Input"
import Button from "../../components/Button"
import { useEffect, useState } from "react"
import { useMutation } from "react-query"
import { API } from "../api/api"
import { useRouter } from "next/router"
import { Error, Success } from '../../helper/toast';
import Modal from "../../components/Modal/modal"

export default function SendProject() {

  const router = useRouter()
  const [transaction, setTransaction] = useState([]);
  const [showImage1, setShowImage1] = useState(false)
  const [showImage2, setShowImage2] = useState(false)
  const [showImage3, setShowImage3] = useState(false)
  const [showImage4, setShowImage4] = useState(false)
  const [showImage5, setShowImage5] = useState(false)
  const id = router.query.view

  useEffect(() => {
    const getTransaction = async (e) => {
      try {
        const response = await API.get(`/transaction/${id}`);
        setTransaction(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTransaction();
  }, []);

  return (
    <Layout>
      <div className="md:px-40 py-5">
        <div className="grid grid-cols-5 gap-5">
        <div className="mb-5 col-span-3">
            <img src={transaction?.image1} alt="" className="w-full cursor-pointer" onClick={() => setShowImage1(true)}/>
            <Modal isVisible={showImage1} onClose={() => setShowImage1(false)}>
              <img src={transaction?.image1} alt="" />
              <div className="flex justify-center mt-4">
                <Button><a href={transaction?.image1}>Download</a></Button>
              </div>
            </Modal>
            <div className="flex justify-center mt-3">
              <div className="mr-1">
                {transaction?.image2 ? (
                  <div>
                    <img src={transaction?.image2} alt="" className="w-36 cursor-pointer" onClick={() => setShowImage2(true)}/>
                    <Modal isVisible={showImage2} onClose={() => setShowImage2(false)}>
                      <img src={transaction?.image2} alt="" />
                      <div className="flex justify-center mt-4">
                        <Button><a href={transaction?.image2}>Download</a></Button>
                      </div>
                    </Modal>
                  </div>
                ) : (
                  <div className="hidden"></div>
                )}         
              </div>
              <div className="mr-1">
                {transaction?.image3 ? (
                  <div>
                    <img src={transaction?.image3} alt="" className="w-36 cursor-pointer" onClick={() => setShowImage3(true)}/>
                    <Modal isVisible={showImage3} onClose={() => setShowImage3(false)}>
                      <img src={transaction?.image3} alt=""/>
                      <div className="flex justify-center mt-4">
                        <Button><a href={transaction?.image3}>Download</a></Button>
                      </div>
                    </Modal>
                  </div>
                ) : (
                  <div className="hidden"></div>
                )}         
              </div>
              <div className="mr-1">
                {transaction?.image4 ? (
                  <div>
                  <img src={transaction?.image4} alt="" className="w-36 cursor-pointer" onClick={() => setShowImage4(true)}/>
                  <Modal isVisible={showImage4} onClose={() => setShowImage4(false)}>
                    <img src={transaction?.image4} alt="" />
                    <div className="flex justify-center mt-4">
                      <Button><a href={transaction?.image4}>Download</a></Button>
                    </div>
                  </Modal>
                </div>
                ) : (
                  <div className="hidden"></div>
                )}         
              </div>
              <div className="mr-1">
                {transaction?.image5 ? (
                  <div>
                  <img src={transaction?.image5} alt="" className="w-36 cursor-pointer" onClick={() => setShowImage5(true)}/>
                  <Modal isVisible={showImage5} onClose={() => setShowImage5(false)}>
                    <img src={transaction?.image5} alt="" />
                    <div className="flex justify-center mt-4">
                      <Button><a href={transaction?.image5}>Download</a></Button>
                    </div>
                  </Modal>
                </div>
                ) : (
                  <div className="hidden"></div>
                )}         
              </div>
            </div>
        </div>

            <div className="col-span-2">
                <p>
                {transaction.projectDesc}
                </p>
            </div>
        </div>
      </div>
    </Layout>
  )
}
