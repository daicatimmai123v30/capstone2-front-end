import axios from "axios";
import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { API_URL, TOKEN } from "../../actions/types";
import setAuthToken from "../../utils/setAuthToken";
import Chat from "../Chat/Chat";
import ContainerLeft from "../Container/ContainerLeft";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import moment from "moment";
import {
  Stack,
  Pagination
} from '@mui/material'

import "./ListDocuments.css";

const ListDocuments = () => {
  const history = useHistory();
  const chat = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [documents, setDocuments] = useState([]);
  const getDocuments = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/Document`);
      if (response.data.success) {
        setDocuments(response.data.documents);
      }
    } catch (error) {
      alert(error.toString());
    }
  };
  useEffect(() => {
    getDocuments();
  }, []);
  return (
    <div className="main">
      {chat.visibleChat ? <Chat></Chat> : null}
      <Header></Header>
      <div className="body">
        <div className="body-container">
          <ContainerLeft />
          <div className="container-right">
            <div className="box">
              <div className="box-header">
                <label className="box-header-title">Tài liệu</label>
                <div className="button-document">
                  {user.role === "ADMIN" ? (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => history.push("/Documents")}
                    >
                      Viết bài <ion-icon name="pencil-outline"></ion-icon>
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="ListDocuments">
                <table class="table table-borderless table-hover">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Tiêu đề</th>
                      <th scope="col">Mô tả</th>
                      <th scope="col">Xem chi tiết</th>
                      {user.role === "ADMIN" ? (
                        <th scope="col">Chỉnh sửa</th>
                      ) : null}
                      <th>Ngày tạo</th>
                    </tr>
                  </thead>
                  {documents.map((value, index) => (
                    <tbody key={value._id}>
                      <tr>
                        <th>{index + 1}</th>
                        <td>{value.title}</td>
                        <td>{value.description}</td>
                        <td>
                          <a
                            onClick={() => {
                              history.push(`/DocumentDetail/${value._id}`);
                            }}
                            href
                          >
                            <ion-icon name="eye-outline"></ion-icon>
                          </a>
                        </td>
                        {user.role === "ADMIN" ? (
                          <td>
                            <ion-icon name="create-outline"></ion-icon>
                          </td>
                        ) : null}
                        <td>{moment(value.createdAt).format("DD/MM/YYYY")}</td>
                      </tr>
                    </tbody>
                  ))}
                  
                </table>
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
      <Footer></Footer>
    </div>
  );
};

export default ListDocuments;
