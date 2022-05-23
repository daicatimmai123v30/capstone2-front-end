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
  const [totalDoctor, setTotalDoctor] = useState(0);
  const [totalOwner, setTotalOwner] = useState(0);
  
  const [page, setPage] = useState(search.split("?")[1].split("=")[1]);
  const getAccount = async (page) => {
    try {
      setAuthToken(localStorage.getItem(TOKEN));
      const totalAccount = "";
      const response = await axios.get(`${API_URL}/api/Account/all?pg=${page}`);
      const { data } = response;
      setTotalDoctor(data.doctor.total);
      setTotalOwner(data.owner.total);
      setAccountDoctor(data.doctor.account);
      setAccountOwner(data.owner.account);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccount(page);
  }, []);
  const notifyDelete = (messages) => {
    toast(messages, { className: "notify", draggable: true });
  };
  const deleteAccount = async (_id) => {
    try {
      const response = await axios.delete(`${API_URL}/api/Account/${_id}`);
      if(response.data.success){
        notifyDelete("Xóa thành công");
      }else{
        notifyDelete("Xóa không thành công");
      }
      // setAccountDoctor(response);
      // setAccountOwner(response);
      getAccount(page);
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
                        <div className="table-content">
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
                                count={(totalOwner/5) + (totalOwner%5 >0 ? 1 : 0)}
                                color="primary"
                                page={Number(page)}
                                onChange={(event, number) => {
                                  getAccount(number);
                                }}
                              />
                            </Stack>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="doctor"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                      >
                        <div className="table-content">
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
                                count={(totalDoctor/5) + (totalDoctor%5 >0 ? 1 : 0)}
                                color="primary"
                                page={Number(page)}
                                onChange={(event, number) => {
                                  getAccount(number);
                                }}
                              />
                            </Stack>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="manager"
                        role="tabpanel"
                        aria-labelledby="contact-tab"
                      >
                        <div className="table-content">
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
                                count={(totalDoctor/5) + (totalDoctor%5 >0 ? 1 : 0)}
                                color="primary"
                                page={Number(page)}
                                onChange={(event, number) => {
                                  getAccount(number);
                                }}
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
      </div>
      <Footer />
    </div>
  );
};

export default ManageAccount;
