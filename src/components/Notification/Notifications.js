import React from 'react'
import './Notifications.css'
import Appointment from '../../assets/icons/appointment.png'

const Notifications = () => {
    return (
        <div className='main1'>
            <div className='notification center'>
                <input type='checkbox' name='' id=''/>
                <div className='num'>3</div>
                    <div className='box'>
                        <div className='heading'>
                            <p><i>Thông Báo</i></p>
                        </div>
                        <div className='notification_box'>
                            <a href='' className="header_notify-link">
                                <img src={Appointment} alt='' className='header_notify-img'/>
                                <div className='header_notify-info'>
                                    <span className='header_notify-name'>Nhắc Nhở</span>
                                    <span className='header_notify-descriotion'>Bạn có lịch hẹn Khám lúc 00:00 ,dd/mm/yyyy</span>
                                </div>
                        
                            </a>
                            <a href='' className="header_notify-link">
                                <img src={Appointment} alt='' className='header_notify-img'/>
                                <div className='header_notify-info'>
                                    <span className='header_notify-name'>dd/mm/yyyy</span>
                                    <span className='header_notify-descriotion'>phòng khám xin thông báo.....</span>
                                </div>
                            </a>
                            <a href='' className="header_notify-link">
                                <img src={Appointment} alt='' className='header_notify-img'/>
                                <div className='header_notify-info'>
                                    <span className='header_notify-name'>Nhắc Nhở</span>
                                    <span className='header_notify-descriotion'>Bạn có lịch hẹn Khám lúc 00:00 ,dd/mm/yyyy</span>
                                </div>
                            </a>
                            
                        </div>
                    </div>
                </div>
       </div>
    )
}

export default Notifications
