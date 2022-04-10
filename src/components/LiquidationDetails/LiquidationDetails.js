import React, { useState, useEffect } from "react";
import ContainerLeft from "../Container/ContainerLeft";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./LiquidationDetails.css";
import Carousel from "react-bootstrap/Carousel";
import setAuthToken from "../../utils/setAuthToken";
import { useSelector } from "react-redux";
import {
  API_URL,
  TOKEN,
  SHOW_LOADING,
  HIDE_LOADING,
} from "../../actions/types";
import { useHistory,useParams} from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import MessageBox from '../MessageBox/MessageBox'
export default function LiquidationDetails() {
  const {slug} = useParams();
  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState({});
  // console.log("location: ", location);
  // console.log("window.location: ", window.location);
  const [product, setProduct] = useState({});
  const [imgProduct, setImgProduct] = useState([]);
  // const [user, setUser] = useState({});
  const {user} = useSelector(state =>state.user);
  const [data, setData] = useState({
    // rating: 0,
    content: "",
    visibleMessageBox: false,
    isSuccess: false,
    text:""
  });
  const getProductById = async()=> {
    setAuthToken(localStorage.getItem(TOKEN));
    const response = await axios.get(
      `${API_URL}/api/Liquidation/${slug}`
    );
    setProduct(response?.data?.product);
    setImgProduct(response?.data?.product?.imageProduct);
    
  }
  useEffect(() => {
    getProductById();
  },[]);
  const onComment = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/Liquidation/comment/${slug}`, {
        content: data.content,
      });
      console.log(response)
      if (response.data.success) {
        window.location.reload();
      } else
        setData({
          ...data,
          visibleMessageBox: true,
          text: response.data.messages,
        });
    } catch (error) {
      dispatch({ type: HIDE_LOADING });
      setData({ ...data, visibleMessageBox: true, text: "Lỗi server" });
    }
    dispatch({ type: HIDE_LOADING });
  };

  return (
    <div className="main">
      <Header />
      <div className="body">
        <div className="body-container">
          <ContainerLeft />
          <div className="container-right container-liquidation-details">
            <div className="box">
              <div className="box-header">
                <label className="box-header-title">Chi tiết sản phẩm</label>
              </div>
              <div className="product-details">
                <div className="row">
                  <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 img-product">
                    <Carousel>
                      {imgProduct?.map((value, index) => (
                        <Carousel.Item>
                          <img
                            className="d-block w-100"
                            src={value}
                            alt="First slide"
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>

                  <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 content-product">
                    <h3>{product?.titleProduct}</h3>
                    <label className="title-product">
                      Giá:{" "}
                      <label className="content-title">
                        {product?.priceProduct}
                      </label>
                    </label>
                    <br />
                    <label className="title-product">
                      Số lượng:{" "}
                      <label className="content-title">
                        {product?.amountProduct}
                      </label>
                    </label>
                    <br />
                    <label className="title-product">
                      Số điện thoại:{" "}
                      <label className="content-title">
                        {user?.phoneNumber}
                      </label>
                    </label>
                    <br />
                    <label className="title-product">
                      Địa chỉ:{" "}
                      <label className="content-title">
                        {user?.street}
                        {", "}
                        {user?.district}
                        {", "}
                        {user?.ward}
                        {", "}
                        {user?.city}
                      </label>
                    </label>
                    <br />
                  </div>
                </div>
                <div className="rating-doctor">
                  <div className="view-comment">
                    <textarea
                      className="input-comment"
                      onChange={(event) =>
                        setData({ ...data, content: event.target.value })
                      }
                    ></textarea>
                    <div className="comments-bottom">
                      <button onClick={() => onComment()} style={{float: 'right'}}>Comment</button>
                    </div>
                  </div>
                  <div className="list-comments">
                    {product?.comments?.map((value, index) => (
                      <div className="row-data">
                        <label className="name-user">
                          {value.idOwner.firstName}:{" "}
                          <label>{value.content}</label>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {data.visibleMessageBox?(
                <MessageBox isSuccess={data.isSuccess} messages={data.text}  onClick={()=>{
                    setData({...data,visibleMessageBox:false});
                }} />
        ):null}
    </div>
  );
}
