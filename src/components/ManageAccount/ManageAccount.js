import React from 'react'
import ContainerLeft from "../Container/ContainerLeft";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./ManageAccount.css";

export default function ManageAccount() {
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
              </div>
              <div className="box-body">
                <div className="manage-account">
                  <div>
                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item">
                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#petowner" role="tab" aria-controls="petowner" aria-selected="true">Pet Owner</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#doctor" role="tab" aria-controls="doctor" aria-selected="false">Doctor</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" id="contact-tab" data-toggle="tab" href="#manager" role="tab" aria-controls="manager" aria-selected="false">Manager</a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div className="tab-pane fade show active" id="petowner" role="tabpanel" aria-labelledby="home-tab">
                        <table class="table table-hover">
                          <thead>
                            <tr>
                              <th scope="col">STT</th>
                              <th scope="col">Tài khoản</th>
                              <th scope="col">Xóa</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>0945228146</td>
                              <td><ion-icon name="trash-outline"></ion-icon></td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>0839837501</td>
                              <td><ion-icon name="trash-outline"></ion-icon></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="tab-pane fade" id="doctor" role="tabpanel" aria-labelledby="profile-tab">Doctor</div>
                      <div className="tab-pane fade" id="manager" role="tabpanel" aria-labelledby="contact-tab">Manager</div>
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
  )
}
