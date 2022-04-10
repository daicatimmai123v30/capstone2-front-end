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
import ReactStars from "react-rating-stars-component";
import Add from '../../assets/icons/add.png';
import './ListDoctor.css';
const ListDoctor = () => {
    const history = useHistory();
    const [doctors,setDoctors] = useState([]);
    const chat = useSelector(state => state.chat);
    const {user} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const loadDoctors =async()=>{
        try {
            setAuthToken(localStorage.getItem(TOKEN))
            var response;
            if(window.location.pathname.split('/')[2])
                response = await axios.get(`${API_URL}/api/Doctor/list-doctor/${window.location.pathname.split('/')[2]}`);
            else
                response = await axios.get(`${API_URL}/api/Doctor/list-doctor`);
            if(response.data.success)
            {
                setDoctors(response.data.doctors)
            }
        } catch (error) {
            alert('Lỗi Internet');
        }
    }
    const totalRating=(review)=>{
        var total=0;
        for(var i = 0;i<review.length;i++)
            total+=review[i].rating
        if(review.length>0)
            total=total/review.length;
        return total;
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
                                <label className="box-header-title">Bác Sĩ</label>
                            </div>
                            <div className="doctors">
                                {doctors.map((doctor,index)=>(
                                <div key={index} className="doctors-form">
                                    <img src={doctor.image} className="doctor-avatar" alt="doctor-avatar"/>
                                    <div style={{paddingLeft:15}}>
                                        <a onClick={()=>{
                                            history.push(`/Doctor/${doctor._id}`);
                                        }}>{doctor.lastName +" "+ doctor.firstName}</a>
                                        <div style={{width:400,display:'flex',flexDirection:'row'}}>
                                            <div className="btn-messenge" onClick={()=>dispatch({type:OPEN_CHAT,payload:{_id:doctor._id,firstName:doctor.firstName,image:doctor.image}})}>
                                                <img style={{width:40,height:40}} src={Mess}/>
                                                <label>Nhắn tin</label>
                                            </div>
                                            <div className="btn-appointment" onClick={()=>history.push(`/Appointment/${doctor._id}`)}>
                                                <img style={{width:40,height:40}} src={Appointment}/>
                                                <label>Đặt lịch hẹn</label>
                                            </div>
                                            
                                        </div>
                                        <ReactStars
                                            size={40}
                                            edit={false}
                                            activeColor="#ffd700"
                                            value={totalRating(doctor.review)}
                                            isHalf={true}
                                            style={{borderColor:'red'}}
                                        />
                                    </div>
                                </div>
                                ))}  
                            </div>
                            {user.role==="ADMIN"?(
                                <img src={Add} style={{width:200,height:200,cursor:'pointer'}} onClick={()=>history.push('Create-doctor')}/>
                            ):null}
                        </div>
                    </div>
                </div>  
            </div>
            <Footer></Footer>
        </div>
    )
}

export default ListDoctor
