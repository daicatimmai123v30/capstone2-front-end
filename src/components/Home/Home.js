import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Background from '../../assets/image/background@2x.png'
import Chat from '../Chat/Chat'
import ContainerLeft from '../Container/ContainerLeft'
import ContainerRight from '../Container/ContainerRight'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import './Home.css'
const Home = (props) =>{
    const chat = useSelector(state => state.chat)
    const user = useSelector(state =>state.user)
    const history = useHistory();
    const onAnswerCall=async()=>{
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const peer = props.answerCall(stream);
        window.peer = peer;
        window.destroy = props.leaveCall;
        history.push("/Video-call");
    }
    return (
        <div className="main">
            {chat.visibleChat?(<Chat callUser={props.callUser} leaveCall={props.leaveCall}></Chat>):null}
            <Header></Header>
            {user.isCalling?(
                <div className="caller">
                    <label>{props.nameCaller}</label>
                    <button className='btn-accept' variant="contained" color="primary" onClick={()=>onAnswerCall()}>
                        Answer
                    </button>
                </div>
            )
            :null}
            <div className="body">
                <div className="body-welcome">
                    <img src={Background} className="background"/>
                </div>
                <div className="body-container">
                    <ContainerLeft/>
                    <ContainerRight/>
                </div>  
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Home;