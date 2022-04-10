import React from 'react'
import './ViewFullImage.css'
const ViewFullImage = (props) => {
    return (
        <div className="container-view-images">
            <img src={props.uri}/>
            <ion-icon name="close-outline" onClick={props.onClick}></ion-icon>
        </div>
    )
}

export default ViewFullImage
