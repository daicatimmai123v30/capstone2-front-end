import React ,{useEffect,useState} from 'react';
import ReactStars from "react-rating-stars-component";
import Header from '../Header/Header'
import Footer from '../Footer/Footer';
import ContainerLeft from '../Container/ContainerLeft';
import axios from 'axios';
import { API_URL, HIDE_LOADING, OPEN_CHAT, SHOW_LOADING, TOKEN } from '../../actions/types';
import setAuthToken from '../../utils/setAuthToken';
import { useHistory } from 'react-router';
import Appointment from '../../assets/icons/appointment.png'
import Mess from '../../assets/icons/mess.png'
import Chat from '../Chat/Chat';
import './Doctor.css'
import { useDispatch, useSelector } from 'react-redux';
import PageLoader from '../PageLoader/PageLoader';
import MessageBox from '../MessageBox/MessageBox'
const Doctor = () => {
    const [doctor,setDoctor]=useState({});
    const dispatch = useDispatch();
    const [isDoctor,setIsDoctor]=useState(false)
    const chat =useSelector(state=>state.chat)
    const {location} = useHistory();
    const history = useHistory();
    const [data,setData] = useState({
        rating:0,
        comments:'',
        text:'',
        visibleMessageBox:false,
        isSuccess:false,
    })
    const loadDoctor =async ()=>{
        try {
            setAuthToken(localStorage.getItem(TOKEN))
            const response= await axios.get(`${API_URL}/api/Doctor/${location.pathname.split('/')[2]}`);
            if(response.data.success)
            {
                setDoctor(response.data.doctor)
                setIsDoctor(true);
            }
            else
                setIsDoctor(false);
        } catch (error) {
            
        }
    }
    const onReview = async() =>{
        dispatch({type:SHOW_LOADING});
        try {
            const response = await axios.post(`${API_URL}/api/Doctor/review`,{
                idDoctor:doctor._id,
                rating:data.rating,
                comments:data.comments
            });
            if(response.data.success){
                setData({...data,visibleMessageBox:true,text:response.data.messages,isSuccess:true})
            }
            else
                setData({...data,visibleMessageBox:true,text:response.data.messages})
        } catch (error) {

            dispatch({type:HIDE_LOADING});
            setData({...data,visibleMessageBox:true,text:'Lỗi server'})
        }
        dispatch({type:HIDE_LOADING});
    }
    useEffect(()=>{
        loadDoctor();
    },[])
    const ratingChanged = (newRating) => {
        setData({...data,rating:newRating});
    }
    return (
        <div className="main">
            {chat.visibleChat?(<Chat></Chat>):null}
            <Header></Header>
            <div className="body">
                <div className="body-container">
                    <ContainerLeft/>
                    <div className="container-right container-doctor">
                        <div className="box box-doctor">
                            <div className="doctor">
                                <div className="user-avatar">
                                    <img  src={doctor.image} alt="user-avatar" className="user-image"/>
                                    <div style={{width:'100%',height:150,marginTop:20,alignItems:'center',justifyContent:'space-between',display:'flex',flexDirection:'column'}}>
                                        <div className="btn-messenge" onClick={()=>dispatch({type:OPEN_CHAT,payload:{_id:doctor._id,firstName:doctor.firstName,image:doctor.image}})}>
                                            <img style={{width:40,height:40}} src={Mess}/>
                                            <label>Nhắn tin</label>
                                        </div>
                                        <div className="btn-appointment" onClick={()=>history.push(`/Appointment/${doctor._id}`)}>
                                            <img style={{width:40,height:40}} src={Appointment}/>
                                            <label>Đặt lịch hẹn</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="user-information">
                                    <label className="fullName">{doctor.lastName +' '+ doctor.firstName}</label>
                                    <div className="role-doctor">
                                        <label >Y Tá</label>
                                        <input type="radio" name="role-doctor" value="Y Tá" checked disabled />
                                        <label >Bác Sĩ</label>
                                        <input type="radio" id="css" name="role-doctor" value="Bác Sĩ" disabled/>
                                        <label>Khác</label>
                                        <input type="radio" id="javascript" name="role-doctor" value="Khác" disabled/>
                                    </div>
                                    <label className="property">Giới Tính: <label>{doctor.gender}</label></label>
                                    <label className="property">Ngày Sinh: <label>{doctor?.dateOfBirth?.split('T')[0]}</label></label>
                                    <label className="property">Số Điện Thoại: <label>{doctor.phoneNumber}</label></label>
                                    <label className="property">Tỉnh/Thành Phố: <label>{doctor.city}</label></label>
                                    <label className="property">Quận/Huyện: <label>{doctor.district}</label></label>
                                    <label className="property">Xã/Phường: <label>{doctor.ward}</label></label>
                                    <label className="property">Bằng Cấp:</label>
                                </div>
                            </div>
                        </div>
                        <div className="rating-doctor">
                            <div className="view-comment">
                                <textarea 
                                    className="input-comment"
                                    onChange={(event)=>setData({...data,comments:event.target.value})} 
                                ></textarea>
                                <div className="comments-bottom">
                                    <ReactStars
                                        count={5}
                                        onChange={ratingChanged}
                                        size={40}
                                        edit={true}
                                        activeColor="#ffd700"
                                        isHalf={true}
                                    />
                                   <button onClick={()=>onReview()}>
                                       Rate and Comment
                                   </button>
                                </div>
                            </div>
                            <div className="list-comments">
                                {doctor?.review?.map((value,index)=>(
                                    <div className="row-data">
                                        <label className="name-user">{value.idOwner.firstName}: <label>{value.comments}</label></label>
                                        <label className="rating">{value.rating}/5</label>
                                    </div>
                                ))} 
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
            <PageLoader/>
            {data.visibleMessageBox?(
                <MessageBox isSuccess={data.isSuccess} messages={data.text}  onClick={()=>{
                    setData({...data,visibleMessageBox:false});
                    if(data.isSuccess)
                        window.location.reload(true)
                }} />
            ):null}
            <Footer></Footer>
        </div>
    )
}

export default Doctor
