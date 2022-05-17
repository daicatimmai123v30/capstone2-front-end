import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { useHistory,useParams} from 'react-router';
import axios from "axios";
import {API_URL} from '../../actions/types'
import Header from '../Header/Header'
import Footer from '../Footer/Footer';
import ContainerLeft from '../Container/ContainerLeft';
import Chat from '../Chat/Chat';
import './DocumentDetail.css'
const DocumentDetail = () => {
    const history = useHistory();
    const chat = useSelector(state => state.chat);
    const params = useParams();
    const [data,setData] = useState({
        title:'ádsađá',
        description: 'áđasa',
        content : '<p>sadsadasdd</p>'
    }) 

    const getData =async()=>{
        try {
            const response = await axios.get(`${API_URL}/api/Document/${params.slug}`);
            if(response.data.success){
                setData(response.data.document);
            }
        } catch (error) {
            alert(error.toString())
        }
    }
    useEffect(()=>{
        getData();
    },[])
  return (
    <div className="main">
      {chat.visibleChat ? <Chat></Chat> : null}
      <Header></Header>
      <div className="body">
        <div className="body-container">
          <ContainerLeft />
          <div className="container-right">
            <div className="box box-document-detail">
              <div className="document-detail">
                <div className="title-document">
                  {/* <h3>Tiêu đề: </h3> */}
                  {/* <h1> */}
                    <span style={{ fontSize: "30px", color: "black" }}>
                      {data.title}
                    </span>
                  {/* </h1> */}
                </div>
                <div className="description-document">
                  {/* <h4>Mô tả: </h4> */}
                  <span
                    style={{
                      color: "rgb(184, 184, 184)",
                      fontStyle: "italic",
                      fontSize: "80%",
                      marginBottom: "10px"
                    }}
                  >
                    {data.description}
                  </span>
                </div>
                <div dangerouslySetInnerHTML={{ __html: data.content }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default DocumentDetail