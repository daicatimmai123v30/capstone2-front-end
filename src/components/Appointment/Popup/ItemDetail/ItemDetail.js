import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL, HIDE_LOADING, SHOW_LOADING } from '../../../../actions/types'
import './ItemDetail.css';
import MessageBox from '../../../MessageBox/MessageBox';
import TimePicker from '../TimePicker/TimePicker';
import Calendar from 'react-calendar';
import AppointmentIcon from '../../../../assets/icons/appointment.png';
import PageLoader from '../../../PageLoader/PageLoader';
const ItemDetail = (props) => {
    const {user}=useSelector(state=>state.user);
    const [state,setState]= useState({
        isSuccess:false,
        visibleMessageBox:false,
        text:'',
        EndTime:{
            name:new Date(props.data.EndTime).toLocaleDateString()+" "+ new Date(props.data.EndTime).toLocaleTimeString() ,
            visibileCalendar:false,
            visibleClock:false,
        },
        Location:props.data.Location,
        StartTime:{
            name: new Date(props.data.StartTime).toLocaleDateString()+" "+ new Date(props.data.StartTime).toLocaleTimeString(),
            visibileCalendar:false,
            visibleClock:false,
        },
        Subject: props.data.Subject,
        content: props.data.content,
        doctor: props.data.doctor,
        status: props.data.status,
        _id: props.data._id
    })
    const [doctors,setDoctors]= useState([]);
    const dispatch = useDispatch();
    const cancelAppointment=async()=>{
        try {
            const response = await axios.delete(`${API_URL}/api/Appointment/${props.data._id}`);
            if(response.data.success)
            {
                setState({
                    ...state,isSuccess:true,visibleMessageBox:true,text: 'Hủy cuộc hẹn thành công'
                })
            }
            else
                setState({
                    ...state,isSuccess:false,visibleMessageBox:true,text: response.data.messages
                })
        } catch (error) {
                setState({
                    ...state,isSuccess:false,visibleMessageBox:true,text: 'Hủy cuộc hẹn thất bại'
                })
        }        
    }
    const acceptAppointment =async ()=>{
        dispatch({type:SHOW_LOADING});
        try {
            const newAppointment = {
                startDate:state.StartTime.name,
                endDate:state.EndTime.name,
                Location:state.Location,
                idDoctor:state.doctor
            }
            const response = await axios.patch(`${API_URL}/api/Appointment/${state._id}`,newAppointment);
            console.log(response)
            if(response.data.success){
                setState({
                    ...state,visibleMessageBox:true,isSuccess:true,text:'Chấp nhận thành công'
                })
            }else{
                setState({
                    ...state,visibleMessageBox:true,isSuccess:false,text:response.data.messages
                })
            }
        } catch (error) {
            dispatch({type:HIDE_LOADING});
            setState({
                ...state,visibleMessageBox:true,isSuccess:false,text:'Lỗi server'
            })  
        }
        dispatch({type:HIDE_LOADING});
    }
    const loadDoctors = async()=>{
        try {
            const response = await axios.get(`${API_URL}/api/Doctor/list-doctor`);
            if(response.data.success)
                setDoctors(response.data.doctors)
        } catch (error) {
            
        }
    }
    const finishAppointment =async()=>{
        try {
            const response = await axios.patch(`${API_URL}/api/Appointment/finish/${props.data._id}`);
            if(response.data.success){

            }
            else{
                setState({
                    ...state,
                    visibleMessageBox:true,
                    text:response.data.messages,
                    isSuccess:false
                })
            }
        } catch (error) {
            
        }
    }
    const onChange =(event)=>{
        setState({...state,[event.target.name]:event.target.value})
    }
    
    useEffect(()=>{
        loadDoctors();
    },[])
    return (
        <div className="container-item-detail">
            <div className="item-detail-box">
                <div className="item-detail-box-header">
                    <p>{new Date(props.data.StartTime).toLocaleDateString()+"; "+
                        new Date(props.data.StartTime).toLocaleDateString('fr-FR',{ hour: '2-digit', minute: '2-digit'}).split(',')[1]+" - "+
                        new Date(props.data.EndTime).toLocaleDateString('fr-FR',{ hour: '2-digit', minute: '2-digit'}).split(',')[1]
                    }</p>
                </div>
                <div className="item-detail-box-body">
                    <label className="property">Trạng thái: <label>{props.data.status==="REQUESTING"?"Đang duyệt":props.data.status==="CANCELED"?"Đã hủy":props.data.status==="WAITING"?"Đã duyệt":props.data.status==="FINISHED"?"Đã khám xong":""}</label></label>
                    <label className="property">Thú cưng: <label>{props.data.Subject}</label></label>
                    <div style={{display:'flex',flexDirection:'row'}}>
                        <div style={{display:'flex',flexDirection:'column',flex:0.4,justifyContent:'space-between'}}>
                            <label className="property">Bác sĩ: 
                            </label>
                            <label className="property">Thời gian bắt đầu: 
                            </label>
                            <label className="property">Thời gian kết thúc: 
                            </label>
                        </div>
                        <div style={{display:'flex',flexDirection:'column',flex:0.6,justifyContent:'space-between'}}>
                            {user.role=="ADMIN"?(
                                <select 
                                    name="doctor" onChange={onChange}
                                    style={{width:'75%',backgroundColor:'transparent',borderWidth:0,borderBottomWidth:1,borderColor:'#707070',borderRadius:0,marginRight:10}}
                                >
                                    <option style={{display:'none'}}>Chọn bác sĩ</option>
                                    {doctors.map((value,index)=>(
                                        <option key={index} value={value._id} selected={value._id===state.doctor?"selected":""} >
                                            {value.lastName+" "+value.firstName}
                                        </option>
                                    ))}
                                </select>
                            ):(
                                <input
                                style={{width:'75%',backgroundColor:'transparent',borderWidth:0,borderBottomWidth:1,borderColor:'#707070',borderRadius:0,marginRight:10}} 
                                disabled
                                value={doctors.filter(value=>value._id===state.doctor).length>0
                                ?doctors.filter(value=>value._id===state.doctor).map(value=>value.lastName+" "+value.firstName)[0]
                                :'Đang chờ'}
                                />
                            )}
                            
                            <div style={{display:'flex',flexDirection:'row', alignItems:'center',position:'relative'}}> 
                                <input
                                    style={{width:'75%',backgroundColor:'transparent',borderWidth:0,borderBottomWidth:1,borderColor:'#707070',borderRadius:0,marginRight:10}}
                                    disabled
                                    value={state.StartTime.name}
                                />
                                {user.role=="ADMIN"?(
                                    <>
                                        <img 
                                            src={AppointmentIcon} 
                                            style={{width:30,height:30}}
                                            onClick={()=>
                                                setState({
                                                    ...state,
                                                    StartTime:{...state.StartTime,visibileCalendar:!state.StartTime.visibileCalendar,visibleClock:false},
                                                    EndTime:{...state.EndTime,visibileCalendar:false,visibleClock:false}
                                                    })
                                            }
                                        />
                                        <ion-icon 
                                            name="time-outline" 
                                            style={{fontSize:30,color:'gray'}}
                                            onClick={()=>
                                                setState({
                                                    ...state,
                                                    StartTime:{...state.StartTime,visibileCalendar:false,visibleClock:!state.StartTime.visibleClock},
                                                    EndTime:{...state.EndTime,visibileCalendar:false,visibleClock:false}
                                                    })
                                            }
                                        />
                                    </>
                                ):null}
                                {state.StartTime.visibileCalendar?(
                                <Calendar 
                                    className="calendar"
                                    minDate	={new Date()}
                                    onChange={(date)=>{
                                        setState({
                                            ...state,
                                            StartTime:{
                                                ...state.StartTime,name:new Date(date).toLocaleDateString(),visibileCalendar:false
                                            }
                                        })
                                    }}

                                />
                                ):null}
                                {state.StartTime.visibleClock?(
                                    <TimePicker 
                                        className="time-picker"
                                        onClick={(value)=>{
                                                setState({
                                                    ...state,
                                                    StartTime:{...state.StartTime,name:state.StartTime.name.split(' ')[0]+" "+value,visibleClock:false}
                                                })
                                        }}
                                    />
                                ):null}
                            </div>
                            <div style={{display:'flex',flexDirection:'row', alignItems:'center',position:'relative'}}> 
                                <input 
                                    style={{width:'75%',backgroundColor:'transparent',borderWidth:0,borderBottomWidth:1,borderColor:'#707070',borderRadius:0,marginRight:10}} 
                                    disabled
                                    value={state.EndTime.name}
                                />
                                {user.role==="ADMIN"?(
                                    <>
                                        <img 
                                            src={AppointmentIcon} 
                                            style={{width:30,height:30}}
                                            onClick={()=>
                                                setState({
                                                    ...state,
                                                    EndTime:{...state.EndTime,visibileCalendar:!state.EndTime.visibileCalendar,visibleClock:false},
                                                    StartTime:{...state.StartTime,visibileCalendar:false,visibleClock:false}
                                                    })
                                            }
                                        />
                                        <ion-icon 
                                            name="time-outline" 
                                            style={{fontSize:30,color:'gray'}}
                                            onClick={()=>
                                                setState({
                                                    ...state,
                                                    EndTime:{...state.EndTime,visibileCalendar:false,visibleClock:!state.EndTime.visibleClock},
                                                    StartTime:{...state.StartTime,visibileCalendar:false,visibleClock:false}
                                                    })
                                            }
                                        />
                                    </>
                                ):null}
                                {state.EndTime.visibileCalendar?(
                                <Calendar 
                                    className="calendar"
                                    minDate	={new Date()}
                                    onChange={(date)=>{
                                        setState({
                                            ...state,
                                            EndTime:{
                                                ...state.EndTime,name:new Date(date).toLocaleDateString(),visibileCalendar:false
                                            }
                                        })
                                    }}
                                />
                                ):null}
                                {state.EndTime.visibleClock?(
                                    <TimePicker 
                                        className="time-picker" 
                                        onClick={(value)=>{
                                            setState({
                                                ...state,
                                                EndTime:{...state.EndTime,name:state.EndTime.name.split(' ')[0]+" "+value,visibleClock:false}
                                            })
                                        }}

                                    />
                                ):null}
                            </div>
                        </div>
                    </div>
                    <label className="property">Phòng khám: <label>{props.data.Location}</label></label>
                    <label className="property">Nội dung: <label>{props.data.content}</label></label>
                </div>
                <div className="item-detail-box-bottom">
                    {props.data.status==="WATING"||props.data.status==="REQUESTING"?(
                        <>
                            <button className="btn-delete" onClick={()=>cancelAppointment()}>
                                Hủy lịch
                            </button>
                            {user.role==='ADMIN'&& props.data.status==="REQUESTING"?(
                                <button className="btn-accept" onClick={()=>acceptAppointment()}>
                                    Chấp nhận
                                </button>
                            ):null}
                            
                        </>
                    ):null}
                    {user.role==="ADMIN" && props.data.status==="WAITING"?(
                        <button className="btn-finish" onClick={()=>{
                            finishAppointment();
                        }}>
                            Hoàn tất
                        </button>
                    ):null}
                    <button className="btn-cancel" onClick={()=>props.onClick()}>
                        Đóng
                    </button>
                </div>
            </div>
            {state.visibleMessageBox?(
                <MessageBox isSuccess={state.isSuccess} messages={state.text} onClick={()=>state.isSuccess?window.location.reload(true):setState({...state,visibleMessageBox:false})}/>
            ):null}
        </div>
    )
}

export default ItemDetail
