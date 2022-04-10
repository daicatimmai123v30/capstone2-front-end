import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { API_URL, OPEN_CHAT, TOKEN } from '../../actions/types';
import Appointment from '../../assets/icons/appointment.png';
import Mess from '../../assets/icons/mess.png';
import setAuthToken from '../../utils/setAuthToken';
import Chat from '../Chat/Chat';
import ContainerLeft from '../Container/ContainerLeft';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './ListPetOwner.css';
const ListPetOwner = () => {
    const history = useHistory();
    const [owners,setOwners] = useState([]);
    const chat = useSelector(state => state.chat)
    const distpatch = useDispatch();
    const loadDoctors =async()=>{
        try {
            setAuthToken(localStorage.getItem(TOKEN))
            const response = await axios.get(`${API_URL}/api/Owner/list-pet-owner`);
            if(response.data.success)
                setOwners(response.data.owners)
        } catch (error) {
            alert('Lỗi Internet');
        }
    }
    useEffect(()=>{
        loadDoctors();
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
                                <label className="box-header-title">Chủ Vật Nuôi</label>
                            </div>
                            <div className="owners">
                                {owners.map((owner,index)=>(
                                <div key={index} className="owners-form">
                                    <img src={owner.image} className="owner-avatar" alt="owner-avatar"/>
                                    <div style={{paddingLeft:15}}>
                                        <a onClick={()=>{
                                            history.push(`/Profile/${owner._id}`);
                                        }}>{owner.lastName +" "+ owner.firstName}</a>
                                        <div style={{width:400,height:100,display:'flex',flexDirection:'row'}}>
                                            <div className="btn-messenge" onClick={()=>distpatch({type:OPEN_CHAT,payload:{_id:owner._id,firstName:owner.firstName,image:owner.image}})}>
                                                <img style={{width:40,height:40}} src={Mess}/>
                                                <label>Nhắn tin</label>
                                            </div>
                                            <div className="btn-appointment">
                                                <img style={{width:40,height:40}} src={Appointment}/>
                                                <label>Đặt lịch hẹn</label>
                                            </div>
                                        </div>
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

export default ListPetOwner;
