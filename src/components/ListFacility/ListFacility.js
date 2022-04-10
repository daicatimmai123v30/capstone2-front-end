import React,{useEffect, useState}from 'react';
import './ListFacility.css'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ContainerLeft from '../Container/ContainerLeft';
import Add from '../../assets/icons/add.png';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Chat from '../Chat/Chat'
import { API_URL, TOKEN } from '../../actions/types';
import setAuthToken from '../../utils/setAuthToken';
import ReactStars from "react-rating-stars-component";
const ListFacility = (props) => {
    
    const history = useHistory();
    const chat = useSelector(state=>state.chat);
    const {user}= useSelector(state=>state.user);
    const [facilities,setFacilities]=useState([]);
    const loadFacilities= async()=>{
        try {
            setAuthToken(localStorage.getItem(TOKEN))
            const response =await axios.get(`${API_URL}/api/Clinic`);
            if(response.data.success)
                setFacilities(response.data.clinics)
        } catch (error) {
            
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
        loadFacilities();
    },[])
    return (
        <div className="main">
            {chat.visibleChat?(<Chat></Chat>):null}   
                <Header></Header>
            <div className="body">
                <div className="body-container">
                    <ContainerLeft></ContainerLeft>
                    <div className="container-right">
                        <div className="box1">   
                            <div className='facility'>
                                {facilities.map((value,index)=>(
                                    <button key={index} onClick={()=>history.push(`/Facility/${value._id}`)}>
                                        <div href='' className="header_facility">
                                            <img src={value.avatar} alt='' className='header_facility-img'/>
                                            <div className='header_facility-info'>
                                                <span className='header_facility-name'>{value.nameClinic}</span>
                                                <span className='header_facility-descriotion'>Địa chỉ:<span> {" "+value.street + ", "+value.city+", "+value.district+", "+value.province}</span></span>
                                                <span className='header_facility-descriotion'>Số điện thoại:<span> {" "+value.landLine}</span></span>
                                                <ReactStars
                                                    size={40}
                                                    edit={false}
                                                    activeColor="#ffd700"
                                                    value={totalRating(value.review)}
                                                    isHalf={true}
                                                    style={{borderColor:'red'}}
                                                />
                                            </div>
                                        </div>
                                    </button>
                                ))}
                                    {user.role==="ADMIN"?(
                                        <img src={Add} style={{width:200,height:200,cursor:'pointer'}} onClick={()=>history.push('Create-facility')}/>
                                    ):null}
                            </div>
                        
                        </div>
                    </div>  
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default ListFacility