import React ,{useEffect,useState} from 'react'
import './Search.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer';
import Chat from '../Chat/Chat';
import ContainerLeft from '../Container/ContainerLeft';
import { useSelector,useDispatch } from 'react-redux';
import {useLocation,useHistory} from 'react-router-dom'
import queryString from 'querystring'
import axios from 'axios';
import {API_URL,OPEN_CHAT} from '../../actions/types'
import ReactStars from "react-rating-stars-component";
import Appointment from '../../assets/icons/appointment.png';
import Mess from '../../assets/icons/mess.png';
const Search = () => {
  const chat = useSelector(state=>state.chat);
  const history = useHistory();
  const dispatch = useDispatch();
  const [value,setValue] = useState([]);
  const {search} = useLocation();
  const getResult = async() =>{
    try {
      const response = await axios.get(`${API_URL}/api/search?query=${queryString.parse(search)['?query']}`);
      console.log(response)
      if(response.data.success){
        setValue(response.data.value)
      }
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
    getResult();
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
                                <label className="box-header-title">Tìm kiếm</label>
                            </div>
                            <div className="search">
                                {value.map((value,index)=>{
                                  if(value.type == 'owner'){
                                    return(
                                      <div key={value._id} className="owners-form">
                                          <img src={API_URL + value.image} className="owner-avatar" alt="owner-avatar"/>
                                          <div style={{paddingLeft:15}}>
                                              <a onClick={()=>{
                                                  history.push(`/Profile/${value._id}`);
                                              }}>{value.lastName +" "+ value.firstName}</a>
                                              <div style={{width:400,height:100,display:'flex',flexDirection:'row'}}>
                                                  <div className="btn-messenge" onClick={()=>dispatch({type:OPEN_CHAT,payload:{_id:value._id,firstName:value.firstName,image:API_URL + value.image}})}>
                                                      <img style={{width:40,height:40}} src={Mess}/>
                                                      <label>Nhắn tin</label>
                                                  </div>
                                                  <div className="btn-appointment">
                                                      <img style={{width:40,height:40}} src={Appointment}/>
                                                      <label>Đặt lịch hẹn</label>
                                                  </div>
                                              </div>
                                              <span className='span-role'>Người dùng</span>
                                          </div>
                                      </div>
                                    )
                                  }else if (value.type == 'doctor'){
                                    return(
                                      <div key={value._id} className="doctors-form">
                                          <img src={API_URL + value.image} className="doctor-avatar" alt="doctor-avatar"/>
                                          <div style={{paddingLeft:15}}>
                                              <a onClick={()=>{
                                                  history.push(`/Doctor/${value._id}`);
                                              }}>{value.lastName +" "+ value.firstName}</a>
                                              <div style={{width:400,display:'flex',flexDirection:'row'}}>
                                                  <div className="btn-messenge" onClick={()=>dispatch({type:OPEN_CHAT,payload:{_id:value._id,firstName:value.firstName,image:API_URL + value.image}})}>
                                                      <img style={{width:40,height:40}} src={Mess}/>
                                                      <label>Nhắn tin</label>
                                                  </div>
                                                  <div className="btn-appointment" onClick={()=>history.push(`/Appointment/${value._id}`)}>
                                                      <img style={{width:40,height:40}} src={Appointment}/>
                                                      <label>Đặt lịch hẹn</label>
                                                  </div>  
                                                  
                                              </div>
                                              <span className='span-role'>Bác sĩ</span>
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
                                    )
                                  }else{
                                    return(
                                      <div key={value._id} className="owners-form">
                                          <img src={API_URL + value.imageProduct[0].image} className="owner-avatar" alt="owner-avatar"/>
                                          <div style={{paddingLeft:15, display:'flex' ,flexDirection:'column'}}>
                                              <a onClick={()=>{
                                                  history.push(`/Liquidation-details/${value._id}`);
                                              }}>{value.titleProduct}</a>
                                              <p>Giá: <span className='span-priceProduct'>{value.priceProduct}</span></p>
                                              <p>Số lượng: <span className='span-amountProduct'>{value.amountProduct}</span></p>
                                          </div>
                                      </div>
                                    )
                                  }
                                })}
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
            <Footer></Footer>
        </div>
  )
}

export default Search