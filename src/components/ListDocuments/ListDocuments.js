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
            {chat.visibleChat?(<Chat></Chat>):null}
            <Header></Header>
            <div className="body">
                <div className="body-container">
                    <ContainerLeft/>
                    <div className="container-right">
                        <div className="box">
                            <div className="box-header">
                                <label className="box-header-title">Tài liệu</label>
                                <div className="button-document">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={()=>history.push('/Documents')}
                                    >
                                        Viết bài <ion-icon name="pencil-outline"></ion-icon>
                                    </button>
                                </div>
                            </div>
                            
                            <div className="ListDocuments">
                                {documents.map((value,index)=>(
                                <div key={value._id} className="ListDocuments-form">
                                    <div style={{paddingLeft:15,display:'flex',flexDirection:'column'}}>
                                        <a onClick={()=>{
                                            history.push(`/DocumentDetail/${value._id}`);
                                        }}>{value.title}</a>
                                        <span>{value.description}</span>
                                    </div>
                                    <div>
                                        <button>
                                            Sửa
                                        </button>
                                    </div>
                                </div>
                                ))}  
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
            <Footer></Footer>
        </div>
  )
}

export default ListDocuments