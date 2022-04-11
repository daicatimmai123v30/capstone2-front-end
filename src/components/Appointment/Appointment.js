
import Header from "../Header/Header";
import ContainerLeft from "../Container/ContainerLeft";
import Footer from "../Footer/Footer";
import Chat from "../Chat/Chat";
import { useSelector } from "react-redux";
import React,{useState,useEffect} from "react";
import {ScheduleComponent,Inject,Week,WorkWeek,Month,Agenda,Day, ViewsDirective, ViewDirective,EventSettingsModel } from '@syncfusion/ej2-react-schedule';
import EventTemplate from "./EventTemplate/EventTemplate";
import Request from "./Popup/Request";
import axios from "axios";
import { API_URL, TOKEN } from "../../actions/types";
import setAuthToken from "../../utils/setAuthToken";
import ItemDetail from "./Popup/ItemDetail/ItemDetail";
import { useHistory } from "react-router";
const Appointment =()=>{
    
    // {
    //     Subject: 'Meeting - 1',
    //     StartTime: new Date(2021, 10, 25, 7, 0),
    //     EndTime: new Date(2021, 10, 25, 8, 30),
    //     IsAllDay: false,
    //     isBlock:true,
    //     Location:'Lê Đại',
    //     Description:'ashdgasjhahf'        
    // }
    const chat = useSelector(state=>state.chat);
    const history = useHistory()
    const {location} =history;
    const [state,setState]= useState({
        visibleRequest:location.pathname.split('/')[2]?true:false,
        visibleListRequest:false,
    })
    const [test,setTest] =useState('');
    const [dataSource,setDatasource]=useState([
        // {
        //     Subject: 'Meeting - 1',
        //     StartTime: new Date('2021-11-28 11:00 AM'),
        //     EndTime: new Date('2021-11-28 12:00 PM'),
        //     IsAllDay: false,
        //     isBlock:true,
        //     Location:'Lê Đại',
        //     Description:'ashdgasjhahf'        
        // }
    ])
    const [dateItem,setDataItem]=useState({
        visible:false
    })
    const loadAppointments=async()=>{
        try {
            setAuthToken(localStorage.getItem(TOKEN))
            const response = await axios.get(`${API_URL}/api/Appointment`);
            if(response.data.success){
                const appointments = response.data.appointments.map((appointment,index) =>{
                    return{
                        _id:appointment._id,
                        content:appointment.content,
                        StartTime:new Date(appointment.startDate),
                        EndTime:new Date(appointment.endDate),
                        isBlock:true,
                        Location:'',
                        status:appointment.status,
                        Subject:appointment?.idPet?.namePet,
                        doctor:appointment.idDoctor?._id
                    }
                })
                setDatasource(appointments)
            }
        } catch (error) {
            console.log(error.toString())
        }
    }
    useEffect(()=>{
        loadAppointments();
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
                                <label className="box-header-title">Lịch hẹn</label>
                            </div>
                            {/* eventSettings={{dataSource:dataSource,template:EventTemplate.bind(this)}} */}
                            <ScheduleComponent currentView="Week" 
                            eventSettings={{dataSource:dataSource,template:EventTemplate}} 
                            renderCell={EventTemplate.bind(this)}
                            popupOpen={(args)=>args.cancel=true}
                            enableAdaptiveUI={true}
                            eventClick={args=>setDataItem(Object.assign({visible:true},args.event))}
                            onClick={(args)=>{
                                setState({...state,visibleRequest:(args.target.className==="e-btn-icon e-icon-add e-icons e-icon-left")?true:false})
                                // console.log(args)
                            }}
                            >
                            
                                <ViewsDirective>
                                
                                    <ViewDirective option='Day' startHour="7:00" endHour="20:00" displayName="NGÀY" />
                                    <ViewDirective option='Week' startHour="7:00" endHour="20:00" displayName="TUẦN"/>
                                    {/* <ViewDirective option='WorkWeek' /> */}
                                    <ViewDirective option='Month'  showWeekNumber={true} showWeekend={false} displayName="THÁNG" />
                                    {/* <ViewDirective option='Agenda' /> */}
                                </ViewsDirective>
                                <Inject services={[Week,WorkWeek,Day,Month,Agenda]}/>
                            </ScheduleComponent>
                        </div>
                    </div>
                </div>  
            </div>
            <Footer></Footer>
            {dateItem.visible?(
                <ItemDetail data={dateItem} onClick={()=>setDataItem({...dateItem,visible:false})}/>
            ):null}
            {state.visibleRequest?(<Request idDoctor={location.pathname.split('/')[2]} onCancel={()=>{setState({...state,visibleRequest:false});history.push('/Appointment')}}/>):null}
        </div>
    )
}

export default Appointment;