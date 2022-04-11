
import Header from "../Header/Header";
import ContainerLeft from "../Container/ContainerLeft";
import Footer from "../Footer/Footer";
import Chat from "../Chat/Chat";
import { useSelector } from "react-redux";
import React,{useState,useRef,useEffect} from "react";
import {ScheduleComponent,Inject,Week,WorkWeek,Month,Agenda,Day, ViewsDirective, ViewDirective,DragAndDrop,Resize } from '@syncfusion/ej2-react-schedule';
import {TreeViewComponent} from '@syncfusion/ej2-react-navigations';
import './Schedule.css'
import axios from 'axios'
import { API_URL, TOKEN } from "../../actions/types";
import setAuthToken from "../../utils/setAuthToken";
import EventTemplate from "./EventTemplate/EventTemplate";
import MessageBox from '../MessageBox/MessageBox';
import { useHistory } from "react-router-dom";
const Schedule =()=>{
    
    const chat = useSelector(state=>state.chat);
    const [isUpdate,setIsUpdate]=useState(false)
    const [count,setCount]=useState(1);
    const {user}=useSelector(state=>state.user)
    const [state,setState]=useState({
        visibleAdd:false,
    })
    const [dataSource,setDatasource]=useState([
    ])
    const [employees,setEmployees]=useState([]);
    const [messageBox,SetMessageBox]=useState({
            visible:false,
            isSuccess:false,
            text:'',
    })
    const scheduleObj = useRef(null);
    const history=useHistory();
    const onTreeDragStop=(args )=>{
        let cellData= scheduleObj?.current?.getCellDetails(args.target);
        if(cellData)
        {
            const eventData ={
                StartTime:cellData.startTime,
                EndTime:cellData.endTime,
                idDoctor:args.draggedNodeData.id,
                IsAllDay: false,
                isBlock:true,
                Id:count,
                Subject:args.draggedNodeData.text
            }
            const newCount = count+1;
            setCount(newCount)
            scheduleObj.current.addEvent(eventData)
            const newDataSource= dataSource;
            newDataSource.push(eventData)
            setDatasource(newDataSource)
        }
        
        
    }
    const loadDoctor =async()=>{
        try {
            setAuthToken(localStorage.getItem(TOKEN))
            const response = await axios.get(`${API_URL}/api/Doctor/list-doctor`);
            const newDoctors =await response.data.doctors.map((value)=>{
                return {
                    Id:value._id,
                    Name:value.lastName + " "+ value.firstName
                }
            })
            if(response.data.success)
                setEmployees(newDoctors);
        } catch (error) {
            console.log(error.toString())
        }
    }
    const loadSchedule =async()=>{
        try {
            setAuthToken(localStorage.getItem(TOKEN));
            const response = await axios.get(`${API_URL}/api/Schedule`);
            if(response.data.success)
            {
                const newSchedules= response.data.schedules.map((value,index)=>{
                    return{
                        ...value,
                        StartTime:new Date(value.startDate),
                        EndTime:new Date(value.endDate),
                        isBlock:true,
                        Id:index+1,
                        Subject:value.idDoctor.lastName+value.idDoctor.firstName
                    }
                })
                setDatasource(newSchedules);
                setCount(response.data.schedules.length+1);
            }
        } catch (error) {
            
        }
    }
    const updateSchedule=async()=>{
        try {
            const newDataSource = dataSource.map(value=>{
                return {
                    _id:value._id,
                    idDoctor:value.idDoctor,
                    startDate:new Date(value.StartTime.toString()).toLocaleDateString()+" "+ new Date(value.StartTime.toString()).toLocaleTimeString(),
                    endDate:new Date(value.EndTime.toString()).toLocaleDateString()+" "+new Date(value.EndTime.toString()).toLocaleTimeString()
                }
            })
            setAuthToken(localStorage.getItem(TOKEN))
            const response = await axios.post(`${API_URL}/api/Schedule`,{
                newDataSource
            })
            if(response.data.success){
                SetMessageBox({
                    visible:true,
                    text:response.data.messages,
                    isSuccess:true
                })
            }
            else{
                SetMessageBox({
                    visible:true,
                    text:response.data.messages,
                    isSuccess:false
                })
            }
        } catch (error) {
            SetMessageBox({
                visible:true,
                text:error.toString(),
                isSuccess:false
            })
        }
    }
    
    useEffect(() => {
        if(user.role!="ADMIN")
            document.getElementsByClassName('e-toolbar-item e-add e-overflow-show')[0].outerHTML=""
        loadDoctor();
        loadSchedule();
    }, [])
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
                                <label className="box-header-title">Lịch làm việc</label>
                            </div>
                            <div className="view-schedule">
                                <div className="schedule">
                                    <ScheduleComponent ref={scheduleObj}  
                                        currentView="Week" 
                                        eventSettings={{dataSource:dataSource}} 
                                        allowResizing={isUpdate?true:false} 
                                        allowDragAndDrop={isUpdate?true:false}
                                        renderCell={EventTemplate.bind(this)} 
                                        enableAdaptiveUI={true}
                                        onClick={(args)=>{
                                            if(user.role==="ADMIN"){
                                                if(args.target.className==="e-btn-icon e-icon-add e-icons e-icon-left"){
                                                    setState({...state,visibleAdd:!state.visibleAdd})
                                                    setIsUpdate(!isUpdate)
                                            }
                                            }
                                            // console.log(args)
                                        }}
                                        popupOpen={(args)=>args.cancel=true}
                                    >

                                        <ViewsDirective>
                                            <ViewDirective option='Day' startHour="6:00" endHour="22:00" displayName="NGÀY" />
                                            <ViewDirective option='Week' startHour="6:00" endHour="22:00" displayName="TUẦN"/>
                                            {/* <ViewDirective option='WorkWeek' /> */}
                                            <ViewDirective option='Month'  showWeekNumber={true} showWeekend={false} displayName="THÁNG" />
                                            {/* <ViewDirective option='Agenda' /> */}
                                        </ViewsDirective>
                                        <Inject services={[Week,WorkWeek,Day,Month,Agenda,DragAndDrop,Resize]}/>
                                    </ScheduleComponent>
                                </div>
                                {state.visibleAdd?(
                                    <div className="treeview-component">
                                        <div className="treeview-component-title">
                                            <span>Danh sách nhân viên</span>
                                        </div>
                                        <TreeViewComponent 
                                            fields={{dataSource:employees,id:'Id',text:'Name',test:'123'}} 
                                            allowMultiSelection={true}   
                                            allowDragAndDrop={true} 
                                            nodeDragStop={onTreeDragStop}
                                        />
                                        <div className="treeview-component-bottom">
                                            <button onClick={()=>updateSchedule()}>
                                                Cập nhập
                                            </button>
                                        </div>
                                    </div>
                                ):null}
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
            <Footer></Footer>
            {messageBox.visible?(
                <MessageBox isSuccess={messageBox.isSuccess} messages={messageBox.text}  onClick={()=>{
                    if(MessageBox.isSuccess)
                    {
                        history.push('/Schedule');
                        window.location.reload(true)
                    }else
                        SetMessageBox({...messageBox,text:'',isSuccess:false,visible:false})
                }}/>
            ):null}
        </div>
    )
}

export default Schedule;