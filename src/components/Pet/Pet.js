import React ,{useEffect,useState} from 'react';
import { useHistory } from 'react-router';
import { useSelector,useDispatch } from 'react-redux';

import Header from '../Header/Header'
import Footer from '../Footer/Footer';
import ContainerLeft from '../Container/ContainerLeft';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import Mess from '../../assets/icons/mess.png'
import Chat from '../Chat/Chat';
import ViewFullImage from '../ViewFullImage/ViewFullImage';
import MessageBox from '../MessageBox/MessageBox'

import { API_URL, HIDE_LOADING, SHOW_LOADING, TOKEN } from '../../actions/types';
import './Pet.css'

const Pet = (props) => {
    const [pet,setPet]=useState({});
    const [isPet,setIsPet]=useState(false);
    const chat =useSelector(state=>state.chat);
    const {pets}= useSelector(state=>state.user);
    const [urlImageFullView,setUrlImageFullView]=useState('')
    const {location} = useHistory();
    const history =useHistory();
    const  dispatch = useDispatch();
    const [messageBox,setMessageBox]=useState({
        visible:false,
        text:'',
        isSuccess:false,
    })
    const loadPet =async ()=>{
            for(var value of pets)
                if(value._id===location.pathname.split('/')[2])
                {
                    setIsPet(true);
                    setPet({...value,createdAt:new Date(value.createdAt).toISOString().split('T')[0]})
                }
        
    }
    const deletePet =async()=>{
        dispatch({type:SHOW_LOADING})
        try {
            const response =await axios.delete(`${API_URL}/api/Pet/${pet._id}`);
            if(response.data.success)
            {
                setMessageBox({
                    ...messageBox,
                    visible:true,
                    text:response.data.messages,
                    isSuccess:true
                })
            }
            else
                setMessageBox({
                    ...messageBox,
                    visible:true,
                    text:response.data.messages,
                    isSuccess:false
                })
        } catch (error) {
            setMessageBox({
                ...messageBox,
                visible:true,
                text:'L???i server',
                isSuccess:false
            })
        }
        dispatch({type:HIDE_LOADING})
    }
    useEffect(()=>{
        loadPet();
    },[])
    return (
        <div className="main">
            {chat.visibleChat?(<Chat></Chat>):null}
            <Header></Header>
            <div className="body">
                <div className="body-container">
                    <ContainerLeft/>
                    <div className="container-right container-pet">
                        <div className="box box-pet">
                            <div className="pet">
                                <div className="pet-avatar">
                                    <img  src={pet.avatar} alt="pet-avatar" className="pet-image"/>
                                    <div className="container-images">
                                        {pet?.imagePet?.map((image,index)=>(
                                            <img className="images" key={index} src={image.image} onClick={()=>setUrlImageFullView(image.image)}/>
                                        ))}
                                    </div>
                                    <div style={{width:'100%',height:150,marginTop:20,alignItems:'center',justifyContent:'space-between',display:'flex',flexDirection:'column'}}>
                                        <div className="btn-edit">
                                            <img style={{width:40,height:40}} src={Mess}/>
                                            <label>Ch???nh s???a</label>
                                        </div>
                                        <div className="btn-delete" onClick={()=>deletePet()}>
                                            <label>X??a</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="pet-information">
                                    <label className="fullName">{pet.namePet}</label>
                                    <div className="createdAt-pet">
                                        <label>Th??m v??o ng??y {pet.createdAt}</label>
                                    </div>
                                    <label className="property">Lo??i: <label>{pet.breed}</label></label>
                                    <label className="property">Gi???ng: <label>{pet.species}</label></label>
                                    <label className="property">Gi???i T??nh: <label>{pet.gender}</label></label>
                                    <label className="property">Tu???i Th???: <label>{pet.age}</label></label>
                                    <label className="property">C??n n???ng: <label>{pet.weight}</label></label>
                                    <label className="property">T??nh Tr???ng: <label>{123}</label></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
            {messageBox.visible?(
                <MessageBox isSuccess={messageBox.isSuccess} messages={messageBox.text} onClick={()=>{
                    if(messageBox.isSuccess)
                    {
                        setMessageBox({...messageBox,visible:false});
                        history.push('/list-pet');
                        window.location.reload(true)
                    }
                    else
                        setMessageBox({...messageBox,visible:false})
                }}/>
            ):null}
            <Footer></Footer>
            {urlImageFullView?(
                <ViewFullImage uri={urlImageFullView} onClick={()=>setUrlImageFullView('')}/>
            ):null}
        </div>
    )
}

export default Pet
