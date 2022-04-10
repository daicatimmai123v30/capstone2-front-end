import React from "react";
import ContainerLeft from "../Container/ContainerLeft";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Liquidation.css";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { API_URL, TOKEN } from "../../actions/types";

// import product_2 from "../../assets/image/product_2.jpg";
// import product_3 from "../../assets/image/product_3.jpg";
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
// import { API_URL } from "../../actions/types";

export default function Liquidation() {
  const history = useHistory();

  const [product, setProduct] = useState({
    _id: 0,
    titleProduct: "",
    amountProduct: "",
    priceProduct: "",
    images: [],
  });

  const [urlImages, setUrlImage] = useState([]);
  const [products, setProducts] = useState([]);
  const uploadImage = useRef(null);

  useEffect(() => {
    listProducts();

  }, []);

  const listProducts = async () => {
     setAuthToken(localStorage.getItem(TOKEN));
    const response = await axios.get(`${API_URL}/api/Liquidation/all`);
    setProducts(response?.data?.products);
    // console.log("res: ", response.data.products._id);
  };

  const postProduct = async () => {
    const { amountProduct, priceProduct, titleProduct } = product;
    var formData = new FormData();
    formData.append("amountProduct", amountProduct);
    formData.append("priceProduct", priceProduct);
    formData.append("titleProduct", titleProduct);
    for (var image of product.images) {
      formData.append("imageProduct", image);
    }
    const response = await axios.post(
      `${API_URL}/api/Liquidation/post`,
      formData
    );
    // console.log(formData.getAll());
    listProducts();
    // console.log("response: ", response);
  };

  const editProduct = async () => {
    try {      
      var formData = new FormData();
      formData.append("titleProduct", product.titleProduct);
      formData.append("priceProduct", product.priceProduct);
      formData.append("amountProduct", product.amountProduct);
      const response = await axios.put(
        `${API_URL}/api/Liquidation/${product._id}`,
        formData
      );
      listProducts();
    } catch (e) {
      console.log("Error :(", e);
    }
  };
  console.log(products)
  const deleteProducts = async (_id) => {
    try {
      const response = await axios.delete(`${API_URL}/api/Liquidation/${_id}`);
      const newProducts = products.filter((product) =>
        product._id === response.data._id ? false : true
      );
      setProducts(newProducts);
      listProducts();
    } catch (error) {
      console.log("Error :(", error);
    }
  };

  const onChange = (event) => {
    if (event.target.name === "image") {
      const arrayImage = product.images;
      for (var file of event.target.files) {
        urlImages?.push({ uri: URL.createObjectURL(file) });
        arrayImage?.push(file);
      }
      setProduct({
        ...product,
        images: arrayImage,
      });
    } else setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const renderDetails = (_id) => {
    history.push(`/Liquidation-details/${_id}`,);
  };
  return (
    <div className="main">
      <Header />
      <div className="body">
        <div className="body-container">
          <ContainerLeft />
          <div className="container-right container-liquidation">
            <div className="box">
              <div className="box-header">
                <label className="box-header-title">Sản phẩm thanh lý</label>
              </div>
              <div className="button-post">
                <button
                  type="button"
                  className="btn btn-secondary btn-post"
                  data-toggle="modal"
                  data-target="#post_popup"
                >
                  Viết bài <ion-icon name="pencil-outline"></ion-icon>
                </button>
                <div
                  className="modal fade create-post"
                  id="post_popup"
                  tabIndex={-1}
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Nội dung sản phẩm</h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={()=>{
                            setProduct({
                                  _id: 0,
                                  titleProduct: "",
                                  amountProduct: "",
                                  priceProduct: "",
                                  images: [],
                            })
                            setUrlImage([])
                            }}
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <form>
                          <div className="group">
                            <input
                              type="text"
                              required
                              name="titleProduct"
                              onChange={onChange}
                              value={product.titleProduct}
                            />
                            <span className="highlight" />
                            <span className="bar" />
                            <label>Tên sản phẩm</label>
                          </div>
                          <div className="group">
                            <input
                              type="number"
                              required
                              name="priceProduct"
                              onChange={onChange}
                              min={1000}
                              value={product.priceProduct}
                            />
                            <span className="highlight" />
                            <span className="bar" />
                            <label>Giá</label>
                          </div>
                          <div className="group">
                            <input
                              type="number"
                              required
                              name="amountProduct"
                              onChange={onChange}
                              min={1}
                              value={product.amountProduct}
                            />
                            <span className="highlight" />
                            <span className="bar" />
                            <label>Số lượng</label>
                          </div>
                          <div className="img-product">
                            <p className="add-image">Thêm ảnh</p>
                            {urlImages.length > 0 ? (
                              <div className="list-media-liquidation">
                                {urlImages.map((value, index) => (
                                  <div key={index} className="item">
                                    <img
                                      src={value.uri}
                                      style={{ width: "100%", height: "100%" }}
                                      alt=""
                                    />
                                  </div>
                                ))}
                                <div
                                  className="item-add"
                                  onClick={() => uploadImage.current.click()}
                                >
                                  <p>Thêm ảnh khác</p>
                                  <ion-icon name="add-circle"></ion-icon>
                                </div>
                              </div>
                            ) : (
                              <div
                                className="media"
                                onClick={() => uploadImage.current.click()}
                              >
                                <ion-icon name="arrow-up-circle"></ion-icon>
                              </div>
                            )}
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              ref={uploadImage}
                              name="image"
                              style={{ display: "none" }}
                              onChange={onChange}
                            />
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                          onClick={()=>{
                            setProduct({
                                  _id: 0,
                                  titleProduct: "",
                                  amountProduct: "",
                                  priceProduct: "",
                                  images: [],
                            })
                            setUrlImage([])
                            }}
                        >
                          Thoát
                        </button>
                        <from onClick={postProduct}>
                          <button
                            type="submit"
                            className="btn btn-success"
                            data-dismiss="modal"
                          >
                            Ðăng
                          </button>
                        </from>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-post">
                {products
                  ?.map((product, index) => (
                    <div key={index} className="content-post-detail">
                      <div className="infor-product">
                        <div className="row">
                          <div className="col-xs-11 col-sm-11 col-md-11 col-lg-11">
                            <h5>
                              <label
                                style={{
                                  fontSize: "110%",
                                  fontWeight: "400",
                                }}
                              >
                                {product.titleProduct}
                              </label>
                            </h5>
                          </div>
                          <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                            <div className="dropdown">
                              <ion-icon
                                className="btn btn-none"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                name="ellipsis-vertical-outline"
                              ></ion-icon>
                              <div
                                className="dropdown-menu button-post"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <button
                                  className="dropdown-item"
                                  data-toggle="modal"
                                  data-target={`#edit_product` + product._id}
                                  onClick={() => {
                                    setProduct(product);
                                  }}
                                >
                                  Chỉnh sửa
                                </button>
                                <button
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() => deleteProducts(product._id)}
                                >
                                  Xóa
                                </button>
                              </div>
                              <div
                                className="modal fade edit-post"
                                id={`edit_product` + product._id}
                                tabIndex={-1}
                                role="dialog"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                                key={index}
                              >
                                <div className="modal-dialog" role="document">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5 className="modal-title">
                                        Nội dung sản phẩm
                                      </h5>
                                      <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                      >
                                        <span aria-hidden="true">×</span>
                                      </button>
                                    </div>
                                    <div className="modal-body">
                                      <form>
                                        <div className="group">
                                          <input
                                            type="text"
                                            required
                                            name="titleProduct"
                                            onChange={onChange}
                                            defaultValue={product.titleProduct}
                                          />
                                          <span className="highlight" />
                                          <span className="bar" />
                                          <label>Tên sản phẩm</label>
                                        </div>
                                        <div className="group">
                                          <input
                                            type="number"
                                            required
                                            name="priceProduct"
                                            onChange={onChange}
                                            defaultValue={product.priceProduct}
                                            min={1000}
                                          />
                                          <span className="highlight" />
                                          <span className="bar" />
                                          <label>Giá</label>
                                        </div>
                                        <div className="group">
                                          <input
                                            type="number"
                                            required
                                            name="amountProduct"
                                            onChange={onChange}
                                            defaultValue={product.amountProduct}
                                            min={1}
                                          />
                                          <span className="highlight" />
                                          <span className="bar" />
                                          <label>Số lượng</label>
                                        </div>
                                        <div className="img-product">
                                          <p className="add-image">Thêm ảnh</p>
                                          {/* <div className="media"> */}
                                          {/* <ion-icon name="arrow-up-circle"></ion-icon> */}
                                          {urlImages.length > 0 ? (
                                              <div className="list-media-liquidation">
                                                {urlImages.map(
                                                  (value, index) => (
                                                    <div
                                                      key={index}
                                                      className="item"
                                                    >
                                                      <img
                                                        src={value.uri}
                                                        style={{
                                                          width: "100%",
                                                          height: "100%",
                                                        }}
                                                        alt=""
                                                      />
                                                    </div>
                                                  )
                                                )}
                                                <div
                                                  className="item-add"
                                                  onClick={() =>
                                                    uploadImage.current.click()
                                                  }
                                                >
                                                  <p>Thêm ảnh khác</p>
                                                  <ion-icon name="add-circle"></ion-icon>
                                                </div>
                                              </div>
                                            ) : (
                                              <div
                                                className="media"
                                                onClick={() =>
                                                  uploadImage.current.click()
                                                }
                                              >
                                                <ion-icon name="arrow-up-circle"></ion-icon>
                                              </div>
                                            )}
                                            {/* {product.imageProduct.map(
                                            (value, index) => (
                                              <img
                                                className="d-block w-100"
                                                src={value}
                                                alt="First slide"
                                              />
                                            )
                                          )}                                           */}
                                          {/* </div> */}
                                        </div>
                                      </form>
                                    </div>
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                        onClick={() => {
                                          setProduct({
                                            _id: 0,
                                            amountProduct: "",
                                            priceProduct: "",
                                            titleProduct: "",
                                          });
                                        }}
                                      >
                                        Thoát
                                      </button>
                                      <from
                                        onClick={() => editProduct(product._id)}
                                      >
                                        <button
                                          type="submit"
                                          className="btn btn-success"
                                          data-dismiss="modal"
                                        >
                                          Lưu
                                        </button>
                                      </from>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="slide-image">
                        <Carousel>
                          {product.imageProduct.map((value, index) => (
                            <Carousel.Item key={index}>
                              <img
                                className="d-block w-100"
                                src={value}
                                alt="First slide"
                              />
                            </Carousel.Item>
                          ))}
                        </Carousel>
                      </div>
                      <div className="detail-product">
                        <div className="row">
                          <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <label style={{ marginTop: "15px" }}>
                              2 giờ trước
                            </label>
                          </div>
                          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8"></div>
                          <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <input
                              type="button"
                              value="Xem chi tiết"
                              onClick={() => renderDetails(product._id)}
                              className="btn-details"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                  .reverse()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
