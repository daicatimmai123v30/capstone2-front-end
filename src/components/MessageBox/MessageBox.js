import React from 'react'
import './MessageBox.css';
const MessageBox = (props) => {
    return (
        <div className="container-message-box">
            <div className="message-box">
                {props.isSuccess?(
                    <ion-icon  name="checkmark-outline"></ion-icon>
                ):(
                    <ion-icon style={{borderColor:'red', color:'red'}} name="close-outline"></ion-icon>
                )}
                <label>
                    {props.messages}
                </label>
                <button onClick={props.onClick}>
                    Xác nhận
                </button>
            </div>
        </div>
    )
}

export default MessageBox
