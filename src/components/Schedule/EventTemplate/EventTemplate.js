import React, { useState ,useEffect} from 'react'
import './EventTemplate.css';

const EventTemplate = (props) => {
    const StartTime =new Date(props.StartTime).toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
    const EndTime=new Date(props.EndTime).toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
    return (
        <div className="template-wrap" style={{backgroundColor:props.status==="REQUESTING"?"#E7C7C0":props.status==="WAITING"||props.status==="FINISHED"?"#D3F0D3":"red"}}>
            <p className="subject">{props.Subject}</p>
            <p className="time">{StartTime+" - "+EndTime}</p>
        </div>
    )
}

export default EventTemplate
