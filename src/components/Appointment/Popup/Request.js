import React,{useState,useEffect} from 'react'
import './Request.css'
import AppointmentIcon from '../../../assets/icons/appointment.png';
import { useSelector,useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom'
import Calendar from 'react-calendar';
import TimePicker from './TimePicker/TimePicker';
import axios from 'axios';
import { API_URL, HIDE_LOADING, SHOW_LOADING, TOKEN } from '../../../actions/types';
import PageLoader from '../../PageLoader/PageLoader';
import MessageBox from '../../MessageBox/MessageBox'
import setAuthToken from '../../../utils/setAuthToken';
const Request = (props) => {
    const [data,setData]=useState({
        time:{
            name:'',
            visible:false
        },
        date:{
            name:'',
            visible:false
        },
        idPet:'',
        content:'',
        location:'',
        MessageBox:{
            visible:false,
            isSuccess:false,
        },
        idDoctor:null
    });
    const dispatch = useDispatch();
    const history = useHistory();
    const {location} = history;
    const onChangeData=(event)=>{
        setData({...data,[event.target.name]:event.target.value})
    }
    const onSubmit =async()=>{
        dispatch({type:SHOW_LOADING})
        try {
            const response = await axios.post(`${API_URL}/api/Appointment/request`,{...data,startDate:data.date.name+" "+data.time.name,idDoctor:data.idDoctor?._id});
            if(response.data.success){
                dispatch({type:HIDE_LOADING});
                setData({...data,MessageBox:{visible:true,isSuccess:true,text:'Hẹn lịch thành công'}})
            }
            else
            {
                setData({...data,MessageBox:{visible:true,isSuccess:false,text:response.data.messages}})
                dispatch({type:HIDE_LOADING});
            }
            console.log(response)
        } catch (error) {
            console.log(error.toString())
            setData({...data,MessageBox:{visible:true,isSuccess:false,text:"Lỗi server"}})
            dispatch({type:HIDE_LOADING});
        }
        
    }
    const loadDoctor=async()=>{
        if(props.idDoctor){
            try {
                setAuthToken(localStorage.getItem(TOKEN))
                const response = await axios.get(`${API_URL}/api/Doctor/${props.idDoctor}`);
                if(response.data.success)
                    setData({...data,idDoctor:response.data.doctor})
            } catch (error) {
                
            }
        }
    }
    useEffect(() => {
        loadDoctor();
    }, [])
    const {pets} = useSelector(state=>state.user)
    return (
        <div className="container-request-appointment">
            <div className="request-appointment">
                <div className="request-appointment-header">
                    <span>Đặt lịch khám</span>
                </div>
                <div className="request-appointment-content">
                    <div className="input-doctor">
                        <label>Bác sĩ:</label>
                        <input 
                            disabled 
                            value={data.idDoctor?(data.idDoctor?.lastName +" "+ data.idDoctor?.firstName):""}
                            placeholder="Có thể để trống"
                            type="text"
                        />
                    </div>
                    <div className="input-pet">
                        <label>Thú cưng: </label>
                        <select name="idPet" onChange={onChangeData}>
                            <option style={{display:'none'}}>Thú cưng</option>
                            {pets.map((pet,index)=>(
                                <option key={index} value={pet._id}>
                                    {pet.namePet}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-time">
                        <label>Thời gian: </label>
                        <input 
                            disabled 
                            value={data.date.name+" "+data.time.name}
                            placeholder="Chọn thời gian bắt đầu"
                        />
                        <img src={AppointmentIcon} onClick={()=>setData({...data,time:{...data.time,visible:false},date:{...data.date,visible:!data.date.visible}})}/>
                        <ion-icon name="time-outline"  onClick={()=>setData({...data,date:{...data.date,visible:false},time:{...data.time,visible:!data.time.visible}})}></ion-icon>
                        {data.date.visible?(
                            <Calendar
                                className="date"
                                minDate	={new Date()}
                                onChange={(date)=>{
                                setData({
                                        ...data,
                                        date:{
                                            name:new Date(date.toString().slice(0,21)+'.000Z').toISOString().slice(0,-14).replaceAll('-','/'),
                                            visible:false
                                        },
                                        
                                        })
                                }}
                            />
                        ):null}
                        {data.time.visible?(
                        <TimePicker onClick ={(value)=>setData({...data,time:{name:value,visible:false}})}/>
                        ):null}
                    </div>
                    <div className="input-content">
                        <label>Nội dung: </label>
                        <textarea name="content" onChange={onChangeData} />
                        
                    </div>
                </div>
                <div className="container-btn">
                    <button className="btn-book" onClick={()=>onSubmit()}>Đặt lịch</button>
                    <button className="btn-cancel" onClick={()=>props.onCancel()}>Hủy</button>
                </div>
            </div>
            <PageLoader/>
            {data.MessageBox.visible?(
                <MessageBox isSuccess={data.MessageBox.isSuccess} messages={data.MessageBox.text}  onClick={()=>{
                    if(data.MessageBox.isSuccess)
                    {
                        history.push('/Appointment');
                        window.location.reload(true)
                    }else
                        setData({...data,MessageBox:{...data.MessageBox,visible:false}})
                }}/>
            ):null}

        </div>
    )
}

export default Request
