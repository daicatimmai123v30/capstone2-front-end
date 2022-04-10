import React,{useEffect, useState} from 'react'
import './ContainerRight.css';
import axios from 'axios';
import {API_URL, TOKEN} from '../../actions/types'
import setAuthToken from '../../utils/setAuthToken';

const ContainerRight = () => {
    const [data,setData]= useState({
        appointments:[]
    });
    const loadAppointment =async()=>{
        try {
            setAuthToken(localStorage.getItem(TOKEN))
            const response = await axios.get(`${API_URL}/api/Appointment`);
            if(response.data.success)
            {
                const newAppointment = response?.data?.appointments.map((value=>{
                    var dayOfWeeks='';
                    switch(new Date(value.startDate).getDay()){
                        case 0:dayOfWeeks='Chủ nhật';break;
                        case 1:dayOfWeeks='Thứ hai';break;
                        case 2:dayOfWeeks='Thứ ba';break;
                        case 3:dayOfWeeks='Thứ tư';break;
                        case 4:dayOfWeeks='Thứ năm';break;
                        case 5:dayOfWeeks='Thứ sáu';break;
                        case 6:dayOfWeeks='Thứ bảy';break;
                        default:dayOfWeeks="";break;
                    }
                    return{
                        ...value,
                        dayOfWeeks,
                    }
                }));
                for(var i=0;i<newAppointment.length-1;i++)
                    for(var j=i+1;j<newAppointment.length;j++)
                        if(new Date(newAppointment[i].startDate)> new Date(newAppointment[j].startDate))
                        {
                            var temp = newAppointment[i];
                            newAppointment[i]=newAppointment[j];
                            newAppointment[j]=temp;

                        }
                setData({...data,appointments:newAppointment})
                // console.log(newAppointment)
            }
            else setData({...data,appointments:[]})
        } catch (error) {
            
        }

    }
    useEffect(()=>{
        loadAppointment();
    },[])
    return (
        <div className="container-right">
                    <div className="box">
                            <div className="box-header">
                                <label className="box-header-title">Lịch hẹn</label>
                            </div>
                            <div className="appointment">
                                <div className="appointment-box">
                                {data.appointments.length>0?(
                                    data.appointments.map((value,index)=>(
                                        <div
                                        key={index} 
                                        className ="appointment-data"
                                        style={{backgroundColor:value.status==="REQUESTING"?"#E7C7C0":value.status==="WAITING"||value.status==="FINISHED"?"#D3F0D3":"red"}}
                                        >
                                            <div className="appointment-date">
                                                <p>{value.dayOfWeeks},</p>
                                                <p>
                                                    {new Date(value.startDate).toLocaleString('default',{month:'short',day:'2-digit',year:'2-digit'})}
                                                </p>
                                            </div>
                                            <div className="appointment-time" >
                                                <p>
                                                    {
                                                        new Date(value.startDate).toLocaleDateString('fr-FR',{hour:'2-digit',minute:'2-digit'}).split(' ')[1]+" - "+
                                                        new Date(value.endDate).toLocaleDateString('fr-FR',{hour:'2-digit',minute:'2-digit'}).split(' ')[1]
                                                    }
                                                </p>
                                            </div>
                                            <div className="appointment-infor">
                                                <p>Thú cưng: {value.idPet?.namePet}</p>
                                                <p>Bác sĩ: {value?.idDoctor?.lastName+" "+ value?.idDoctor?.firstName}</p>
                                            </div>
                                        </div>   
                                    ))
                                ):(
                                    <div className ="appointment-empty">
                                        <p>Bạn chưa có cuộc hẹn</p>
                                    </div>   
                                )}
                                </div>
                                
                            </div>
                        </div>
                        <div className="box">
                            <div className="box-header">
                                <label className="box-header-title">Tin tức</label>
                            </div>
                            <div className="news">
                                <div className="news-form">
                                    <label className="news-data">
                                    2021, Oct 30: Tại Artemis quý khách có thể tìm được rất nhiều sản phẩm phục vụ cho nhu cầu của thú cưng. Đặc biệt khi quý khách mua các sản phẩm liên quan tới sức khỏe thú cưng (thực phẩm chức năng, thực phẩm dinh dưỡng, mỹ phẩm) sẽ được đội ngũ bác sỹ, chuyên viên tư vấn theo đặc tính và tình trạng sức khỏe của thú cưng quý khách.
                                    2021, Oct 30: Tại Artemis quý khách có thể tìm được rất nhiều sản phẩm phục vụ cho nhu cầu của thú cưng. Đặc biệt khi quý khách mua các sản phẩm liên quan tới sức khỏe thú cưng (thực phẩm chức năng, thực phẩm dinh dưỡng, mỹ phẩm) sẽ được đội ngũ bác sỹ, chuyên viên tư vấn theo đặc tính và tình trạng sức khỏe của thú cưng quý khách.
                                    2021, Oct 30: Tại Artemis quý khách có thể tìm được rất nhiều sản phẩm phục vụ cho nhu cầu của thú cưng. Đặc biệt khi quý khách mua các sản phẩm liên quan tới sức khỏe thú cưng (thực phẩm chức năng, thực phẩm dinh dưỡng, mỹ phẩm) sẽ được đội ngũ bác sỹ, chuyên viên tư vấn theo đặc tính và tình trạng sức khỏe của thú cưng quý khách.
                                    </label>
                                    <a href="">Xem thêm</a>
                                </div>
                                <div className="news-form">
                                    <label className="news-data">
                                    2021, Oct 30: Tại Artemis quý khách có thể tìm được rất nhiều sản phẩm phục vụ cho nhu cầu của thú cưng. Đặc biệt khi quý khách mua các sản phẩm liên quan tới sức khỏe thú cưng (thực phẩm chức năng, thực phẩm dinh dưỡng, mỹ phẩm) sẽ được đội ngũ bác sỹ, chuyên viên tư vấn theo đặc tính và tình trạng sức khỏe của thú cưng quý khách.
                                    2021, Oct 30: Tại Artemis quý khách có thể tìm được rất nhiều sản phẩm phục vụ cho nhu cầu của thú cưng. Đặc biệt khi quý khách mua các sản phẩm liên quan tới sức khỏe thú cưng (thực phẩm chức năng, thực phẩm dinh dưỡng, mỹ phẩm) sẽ được đội ngũ bác sỹ, chuyên viên tư vấn theo đặc tính và tình trạng sức khỏe của thú cưng quý khách.
                                    2021, Oct 30: Tại Artemis quý khách có thể tìm được rất nhiều sản phẩm phục vụ cho nhu cầu của thú cưng. Đặc biệt khi quý khách mua các sản phẩm liên quan tới sức khỏe thú cưng (thực phẩm chức năng, thực phẩm dinh dưỡng, mỹ phẩm) sẽ được đội ngũ bác sỹ, chuyên viên tư vấn theo đặc tính và tình trạng sức khỏe của thú cưng quý khách.
                                    </label>
                                    <a href="">Xem thêm</a>
                                </div>
                                <div className="news-form">
                                    <label className="news-data">
                                    2021, Oct 30: Tại Artemis quý khách có thể tìm được rất nhiều sản phẩm phục vụ cho nhu cầu của thú cưng. Đặc biệt khi quý khách mua các sản phẩm liên quan tới sức khỏe thú cưng (thực phẩm chức năng, thực phẩm dinh dưỡng, mỹ phẩm) sẽ được đội ngũ bác sỹ, chuyên viên tư vấn theo đặc tính và tình trạng sức khỏe của thú cưng quý khách.
                                    2021, Oct 30: Tại Artemis quý khách có thể tìm được rất nhiều sản phẩm phục vụ cho nhu cầu của thú cưng. Đặc biệt khi quý khách mua các sản phẩm liên quan tới sức khỏe thú cưng (thực phẩm chức năng, thực phẩm dinh dưỡng, mỹ phẩm) sẽ được đội ngũ bác sỹ, chuyên viên tư vấn theo đặc tính và tình trạng sức khỏe của thú cưng quý khách.
                                    2021, Oct 30: Tại Artemis quý khách có thể tìm được rất nhiều sản phẩm phục vụ cho nhu cầu của thú cưng. Đặc biệt khi quý khách mua các sản phẩm liên quan tới sức khỏe thú cưng (thực phẩm chức năng, thực phẩm dinh dưỡng, mỹ phẩm) sẽ được đội ngũ bác sỹ, chuyên viên tư vấn theo đặc tính và tình trạng sức khỏe của thú cưng quý khách.
                                    </label>
                                    <a href="">Xem thêm</a>
                                </div>
                            </div>
                        </div>
                        
                        <div className="box">
                            <div className="box-header">
                                <label className="box-header-title">Tài Liệu</label>
                            </div>
                        </div>
                    </div>
    )
}

export default ContainerRight
