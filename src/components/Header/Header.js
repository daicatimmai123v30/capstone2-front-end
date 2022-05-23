import React,{Fragment, useState,useEffect} from 'react'
import './Header.css'
import Logo from '../../assets/icons/Logo.png'
import Search from '../../assets/icons/Search.png'
import {useSelector,useDispatch} from 'react-redux'
import { Redirect, useHistory } from 'react-router'
import axios from 'axios'
import {API_URL, OPEN_CHAT} from '../../actions/types'
const Header = () => {
    const user = useSelector(state => state.user);
    const [textSearch,setTextSearch] = useState('');
    const distpatch =useDispatch();
    const [listChat,setListChat]=useState([]);
    const [dropView,setDropView]=useState({
        visibleChat:false,
        visibleNoti:false,
    })
    let interval =null
    const history = useHistory();
    const onLogin = () =>{
        history.push('/Signin');
        clearInterval(interval)
    }
    useEffect(()=>{
        // interval=setInterval(()=>{
        //     loadMessages();
        // },1000);
        // return ()=>{
        //     clearInterval(interval)
        // }
    },[])
    const loadMessages=async()=>{
        try {
            const response = await axios.get(`${API_URL}/api/Messenger/list`);
            if(response.data.success)
            {
                const messages=response.data.messages.map(mess=>{
                    const time = Date.now() - new Date(mess.createdAt).getTime();
                    var timeString='';
                    if(Math.floor(time/(1000*60*60*24))>0)
                        timeString=Math.floor(time/(1000*60*60*24)) +' ngày trước'
                    else if(Math.floor(time/(1000*60*60))>0)
                        timeString=Math.floor(time/(1000*60*60))+' giờ trước'
                    else if(timeString=Math.floor(time/(1000*60)))
                        timeString=timeString=Math.floor(time/(1000*60))+' phút trước'
                    else if(timeString=Math.floor(time/(1000)))
                        timeString='vài giây trước'
                    return {...mess,createAt:timeString}
                })
                for(let i = 0; i<messages.length-1;i++){// i=0 <3
                    for(let j=i+1;j<messages.length;j++){// j=1 <2
                        if (new Date(messages[i].createdAt).getTime()<new Date(messages[j].createdAt).getTime())
                        {
                            var temp = messages[i];
                            messages[i]=messages[j];
                            messages[j]=temp
                        }
                    }
                }
                setListChat(messages)
            }
        } catch (error) {
            
        }
    }
    const onOpenListChat =async()=>{
        setDropView({visibleNoti:false,visibleChat:!dropView.visibleChat})
    }
    const onOpenChat=async(value)=>{
        try {
            if(value.recieverId===user.user._id)
            {
                const response = await axios.patch(`${API_URL}/api/Messenger/list/${value._id}`)
            }
            distpatch({type:OPEN_CHAT,payload:{_id:user.user._id===value.senderId?value.recieverId:value.senderId,firstName:value.firstName,image:value.image}});
            setDropView({...setDropView,dropView:false})
        } catch (error) {
            
        }
    }
    const openNoti =()=>{
        setDropView({visibleChat:false,visibleNoti:!dropView.visibleNoti})
    }
    return (
        <div className="header">
            <div className="view-header-home">
                <button className="btn-home" onClick={()=>{history.push('/Home')}}>
                    <img src={Logo} className="header-logo"/>
                    <label className="header-title">ARTEMIS</label>
                </button>
            </div>
            <div className="view-header-home">
                <input className="header-search" defaultValue={textSearch} onChange={(event)=>setTextSearch(event.target.value)} placeholder="Tìm thú cưng hoặc bác sĩ"/>
                <button className="btn" onClick={()=>{
                    history.push(`/Search?query=${textSearch}`)
                    window.location.reload();
                }}>
                    <img className="header-icon-search" src={Search}/>
                </button>
            </div>
            <div className="view-header-user">
               {user.isAuthentication?
               (<Fragment>
                <div className="view-notifications">
                    <button className="btn" onClick={()=>openNoti()}>
                        <ion-icon name="notifications-outline" style={{fontSize:'40px'}}></ion-icon>
                        <div className="active">
                                <span>{listChat.filter(value=>user.user._id===value.recieverId&&value.isRead===false?true:false).length}</span>
                        </div>
                    </button>
                    {dropView.visibleNoti?(
                        <div className="notifications-informations">
                            <div className="notifications-informations-header">
                                Thông báo
                            </div>
                            <div className="notifications-informations-content">
                            {listChat.length>0?(
                                    listChat.map((value,index)=>(
                                        <div key={index} className="notifications-informations-user" onClick={()=>{}}>
                                            <img className="notifications-informations-user-avatar" src={value.image}/>
                                            <div style={{flex:1,height:80,display:'flex',flexDirection:'column'}}>
                                                <div className="notifications-informations-name">
                                                    <span>{value.firstName}</span>
                                                </div>
                                                <div className="notifications-informations-message">
                                                    <span>{value.textMessage}</span>
                                                    <span>{value.createAt}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ):(
                                    <div className="no-contract">
                                        <span>Bạn chưa nhắn tin với ai.</span>
                                    </div>
                                )}
                                
                            </div>
                        </div>
                    ):null}
                </div>
                <div className="view-chats">
                    <button className="btn" onClick={()=>onOpenListChat()}>
                        <ion-icon name="chatbubbles-outline" style={{fontSize:'40px'}}>
                            
                        </ion-icon>
                        <div className="active">
                                <span>{listChat.filter(value=>user.user._id===value.recieverId&&value.isRead===false?true:false).length}</span>
                        </div>
                    </button>
                    {dropView.visibleChat?(
                        <div className="chat-informations">
                            <div className="chat-informations-header">
                                Tin Nhắn
                            </div>
                            <div className="chat-informations-content">
                            {listChat.length>0?(
                                    listChat.map((value,index)=>(
                                        <div key={index} className="chat-informations-user" onClick={()=>onOpenChat(value)}>
                                            <img className="chat-informations-user-avatar" src={value.image}/>
                                            <div style={{flex:1,height:80,display:'flex',flexDirection:'column'}}>
                                                <div className="chat-informations-name">
                                                    <span>{value.firstName}</span>
                                                </div>
                                                <div className="chat-informations-message">
                                                    <span>{value.textMessage}</span>
                                                    <span>{value.createAt}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ):(
                                    <div className="no-contract">
                                        <span>Bạn chưa nhắn tin với ai.</span>
                                    </div>
                                )}
                                
                            </div>
                        </div>
                    ):null}
                    
                </div>
                <button className="btn">
                    <label className="user-title">{`Chào ${user.user.firstName}`}</label>
                </button>
                <button className="btn">
                    <ion-icon name="person-circle-outline" style={{fontSize:'40px'}}></ion-icon>
                </button>
               </Fragment>):
               (
                <Fragment>
                <button className="btn" onClick={()=>onLogin()}>
                    <label className="user-title">Đăng nhập</label>
                </button>
                <button className="btn">
                    <ion-icon name="person-circle-outline" style={{fontSize:'40px'}}></ion-icon>
                </button>
                </Fragment>
               )} 
            </div>
        </div>
    )
}
export default Header