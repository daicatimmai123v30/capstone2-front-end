import React from 'react'
import ContainerLeft from "../Container/ContainerLeft";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./ManageAccount.css";
import { useHistory } from "react-router";
import {
  Stack,
  Pagination
} from '@mui/material'
export default function ManageAccount() {
  const history = useHistory();
  return (
    <div className="main">
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
                              <th scope="col">First name</th>
                              <th scope="col">Last name</th>
                              <th scope="col">Tài khoản</th>
                              <th scope="col">Xóa</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>last name</td>
                              <td>first name</td>
                              <td>Pet Owner</td>
                              <td>
                                <ion-icon name="trash-outline"></ion-icon>
                              </td>
                            </tr>
                          </tbody>
                        </table>
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
                              <th scope="col">First name</th>
                              <th scope="col">Last name</th>
                              <th scope="col">Tài khoản</th>
                              <th scope="col">Xóa</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>last name</td>
                              <td>first name</td>
                              <td>Veterinarian</td>
                              <td>
                                <ion-icon name="trash-outline"></ion-icon>
                              </td>
                            </tr>
                          </tbody>
                        </table>
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
                              <th scope="col">First name</th>
                              <th scope="col">Last name</th>
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
                      </div>
                    </div>
                  </div>
                </div>
                <div className="page-navigation">
                    <Stack spacing={1}>
                      <Pagination
                        count={3}
                        color='primary'
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
      <Footer />
    </div>
  );
}
