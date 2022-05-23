import axios from "axios";
import ContainerLeft from "../Container/ContainerLeft";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./ManageAccount.css";
import { useHistory, useLocation } from "react-router";
import { Stack, Pagination } from "@mui/material";
import { API_URL, TOKEN } from "../../actions/types";
import React, { useEffect, useState } from "react";
import setAuthToken from "../../utils/setAuthToken";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageAccount = () => {
  const { search } = useLocation();
  const history = useHistory();
  const [accountDoctor, setAccountDoctor] = useState([]);
  const [accountOwner, setAccountOwner] = useState([]);
  const [totalDoctor, setTotalDoctor] = useState("");
  const [totalOwner, setTotalOwner] = useState("");
  const [page, setPage] = useState(search.split("?")[1].split("=")[1]);
  const getAccount = async () => {
    try {
      setAuthToken(localStorage.getItem(TOKEN));
      const totalAccount = "";
      const response = await axios.get(`${API_URL}/api/Account/all?pg=${page}`);
      const { data } = response;
      setTotalDoctor(data.doctor.total);
      setTotalOwner(data.owner.total);
      if (totalDoctor % 5 === totalAccount || totalOwner % 5 === totalAccount) {
        page = totalAccount + 1;
      }
      setAccountDoctor(response.data.doctor.account);
      setAccountOwner(response.data.owner.account);
      console.log("account: ", response.data.doctor.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  const deleteAccount = async (_id) => {
    console.log("chung");
    try {
      const response = await axios.delete(`${API_URL}/api/Account/${_id}`);
      const notifyDelete = () => {
        toast("Delete Success", { className: "notify", draggable: true });
      };
      notifyDelete();
      console.log(response);
      // setAccountDoctor(response);
      // setAccountOwner(response);
      getAccount();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <ToastContainer
        draggable={false}
        transition={Bounce}
        autoClose={2500}
      ></ToastContainer>
      <Header />
      <div className="body">
        <div className="body-container">
          <ContainerLeft />
          <div className="container-right container-statistical">
            <div className="box">
              <div className="box-header">
                <label className="box-header-title">Quản lý tài khoản</label>
                <div className="button-document">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => history.push("/Create-doctor")}
                  >
                    Thêm
                  </button>
                </div>
              </div>
              <div className="box-body">
                <div className="manage-account">
                  <div>
                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id="home-tab"
                          data-toggle="tab"
                          href="#petowner"
                          role="tab"
                          aria-controls="petowner"
                          aria-selected="true"
                        >
                          Chủ vật nuôi
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="profile-tab"
                          data-toggle="tab"
                          href="#doctor"
                          role="tab"
                          aria-controls="doctor"
                          aria-selected="false"
                        >
                          Bác sĩ
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="contact-tab"
                          data-toggle="tab"
                          href="#manager"
                          role="tab"
                          aria-controls="manager"
                          aria-selected="false"
                        >
                          Quản lý
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="petowner"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        <table class="table table-hover">
                          <thead>
                            <tr>
                              <th scope="col">No</th>
                              <th scope="col">Họ</th>
                              <th scope="col">Tên</th>
                              <th scope="col">Tài khoản</th>
                              <th scope="col">Xóa</th>
                            </tr>
                          </thead>
                          <tbody>
                            {accountOwner?.map((value, index) => (
                              <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{value.lastName}</td>
                                <td>{value.firstName}</td>
                                <td>{value.idNumber.phoneNumber}</td>
                                <td>
                                  <ion-icon
                                    name="trash-outline"
                                    onClick={() => deleteAccount(value._id)}
                                  ></ion-icon>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="page-navigation">
                          <Stack spacing={1}>
                            <Pagination
                              count={3}
                              color="primary"
                              page={2}
                              // onChange={(event, number) => {
                              //     navigate(`/Products?pg=${number}`);
                              //     const response = JSON.parse(localStorage.getItem('PRODUCTS')).splice((number-1)*8,8);
                              //     setProducts(response)
                              // }}
                            />
                          </Stack>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="doctor"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                      >
                        <table class="table table-hover">
                          <thead>
                            <tr>
                              <th scope="col">No</th>
                              <th scope="col">Họ</th>
                              <th scope="col">Tên</th>
                              <th scope="col">Tài khoản</th>
                              <th scope="col">Xóa</th>
                            </tr>
                          </thead>
                          <tbody>
                            {accountDoctor?.map((value, index) => (
                              <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{value.lastName}</td>
                                <td>{value.firstName}</td>
                                <td>{value.account.username}</td>
                                <td>
                                  <ion-icon
                                    name="trash-outline"
                                    onClick={() => deleteAccount(value._id)}
                                  ></ion-icon>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="page-navigation">
                          <Stack spacing={1}>
                            <Pagination
                              count={3}
                              color="primary"
                              page={2}
                              // onChange={(event, number) => {
                              //     navigate(`/Products?pg=${number}`);
                              //     const response = JSON.parse(localStorage.getItem('PRODUCTS')).splice((number-1)*8,8);
                              //     setProducts(response)
                              // }}
                            />
                          </Stack>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="manager"
                        role="tabpanel"
                        aria-labelledby="contact-tab"
                      >
                        <table class="table table-hover">
                          <thead>
                            <tr>
                              <th scope="col">No</th>
                              <th scope="col">Họ</th>
                              <th scope="col">Tên</th>
                              <th scope="col">Tài khoản</th>
                              <th scope="col">Xóa</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>first name</td>
                              <td>last name</td>
                              <td>Manager</td>
                              <td>
                                <ion-icon name="trash-outline"></ion-icon>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="page-navigation">
                          <Stack spacing={1}>
                            <Pagination
                              count={3}
                              color="primary"
                              page={2}
                              // onChange={(event, number) => {
                              //     navigate(`/Products?pg=${number}`);
                              //     const response = JSON.parse(localStorage.getItem('PRODUCTS')).splice((number-1)*8,8);
                              //     setProducts(response)
                              // }}
                            />
                          </Stack>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ManageAccount;
