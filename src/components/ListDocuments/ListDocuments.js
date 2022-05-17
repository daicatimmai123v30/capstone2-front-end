import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { API_URL, TOKEN } from '../../actions/types';
import setAuthToken from '../../utils/setAuthToken';
import Chat from '../Chat/Chat';
import ContainerLeft from '../Container/ContainerLeft';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import './ListDocuments.css';

const ListDocuments = () => {
    const history = useHistory();
    const chat = useSelector(state => state.chat);
    const {user} = useSelector(state => state.user);
    console.log(user.role)
    const dispatch = useDispatch();
    const [documents,setDocuments] = useState([]);
    const getDocuments = async() =>{
        try {
            const response = await axios.get(`${API_URL}/api/Document`);
            if(response.data.success){
                setDocuments(response.data.documents);
            }
        } catch (error) {
            alert(error.toString());
        }
    }
    useEffect(()=>{
        getDocuments();
    },[])
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
                      <th scope="col">Chỉnh sửa</th>
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
                        <td>
                          <ion-icon name="create-outline"></ion-icon>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default ListDocuments