import React,{useEffect,useState}from 'react'
import ReactStars from "react-rating-stars-component";
import { Link, useHistory } from 'react-router-dom';
// import Background from '../../../assets/image/background@2x.png'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ContainerLeft from '../Container/ContainerLeft';
import Chat from '../Chat/Chat'
import './Facility.css'
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
import { API_URL, HIDE_LOADING, SHOW_LOADING, TOKEN } from '../../actions/types';
import setAuthToken from '../../utils/setAuthToken';
import MessageBox from '../MessageBox/MessageBox';
import PageLoader from '../PageLoader/PageLoader';
const Facility = () =>{
    const chat = useSelector(state=>state.chat);
    const {user}=useSelector(state=>state.user);
    const history =useHistory();
    const [facility,setFacility]=useState(null);
    const dispatch = useDispatch();
    const [data,setData] = useState({
        rating:0,
        comments:'',
        text:'',
        visibleMessageBox:false,
        isSuccess:false,
    })
    const loadFacility =async()=>{
        try {
            setAuthToken(localStorage.getItem(TOKEN))
            const response =await axios.get(`${API_URL}/api/Clinic/${window.location.pathname.split('/')[2]}`)
            if(response.data.success)
                setFacility(response.data.clinic)
        } catch (error) {
            
        }
    }
    const onReview = async() =>{
        dispatch({type:SHOW_LOADING});
        try {
            const response = await axios.post(`${API_URL}/api/Clinic/review`,{
                idClinic:facility._id,
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
    const ratingChanged = (newRating) => {
        setData({...data,rating:newRating});
    }
    
    useEffect(()=>{
        loadFacility()
    },[])
    return (
        <div className="main">
                {chat.visibleChat?(<Chat></Chat>):null}   
                <Header></Header>
            <div className="body">
                <div className="body-container">
                    <ContainerLeft></ContainerLeft>
                    <div className="container-right">
                        {facility?(
                            <div className="box1">
                                <div className='facility'>
                                    <p href='' className="header_facility">
                                        <img src={facility?.avatar} alt='' className='header_facility-img'/>
                                        <div className='header_facility-info'>
                                            <button className="btn-process1" onClick={()=>history.push(`/list-doctor/${facility._id}`)}>
                                                <label className="btn-label1">
                                                    Nhân sự
                                                </label>
                                                <ion-icon name="person-circle" style={{fontSize:'40px',color:'#1E3A28'}}></ion-icon>
                                            </button>
                                        </div>
                                    </p>
                                </div>
                                <div className='facility-cotent'>
                                    <div className='branch'>
                                        <span>Chi nhánh</span>
                                        <span className='parameter'>{facility.nameClinic}</span>
                                    </div>
                                    <div className='address'>
                                        <span className='header_facility-descriotion'> Địa chỉ: <span >{" "+facility?.street + ", "+facility?.city+", "+facility?.district+", "+facility?.province}</span></span>
                                        <br/>
                                        <span className='header_facility-descriotion'>Số điện thoại:<span >{" "+facility?.landLine}</span></span>
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
                                            <button onClick={()=>onReview()} >
                                                Rate and Comment
                                            </button>
                                        </div>
                                    </div>
                                    <div className="list-comments">
                                        {facility.review.map((value,index)=>(
                                            <div key={index} className="row-data">
                                                <label className="name-user">{value.idOwner.lastName +" "+value.idOwner.firstName}: <label>{value.comments}</label></label>
                                                <label className="rating">{value.rating}/5</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        ):(
                            <div className='empty-user'>
                                <p>Thông tin không tồn tại</p>
                            </div>
                        )}
                    </div>  
                </div>
            </div>
            <PageLoader/>
            {data.visibleMessageBox?(
                <MessageBox isSuccess={data.isSuccess} messages={data.text} isSuccess={data.isSuccess} onClick={()=>{
                    setData({...data,visibleMessageBox:false});
                    if(data.isSuccess)
                        window.location.reload(true)
                }} />
            ):null}
            <Footer></Footer>
        </div>
    );
}

export default Facility;