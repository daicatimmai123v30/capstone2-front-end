import React ,{useState,useEffect, useRef}from 'react'
import Chat from '../Chat/Chat'
import Header from '../Header/Header'
import ContainerLeft from '../Container/ContainerLeft';
import Footer from '../Footer/Footer';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import axios from 'axios';
import './CreateFacility.css';
import {Breeds} from '../../actions/BreedPet';
import {Pets} from '../../actions/TypeOfPet'
import { API_URL,SHOW_LOADING,HIDE_LOADING, ADD_PET } from '../../actions/types';
import PageLoader from '../PageLoader/PageLoader';
import MessageBox from '../MessageBox/MessageBox';
import { Cities } from '../../actions/Cities';
import { Districts } from '../../actions/DistrictsModal';
import { Wards } from '../../actions/WardsModal';
const CreateFacility = () => {
    const history = useHistory();
    const uploadImage =useRef(null);
    const chat = useSelector(state=>state.chat);
    const dispatch =useDispatch();
    const [visibleMessBox,setvisibleMessBox]=useState({
        loading:false,
        messages:'',
        success:false
    })
    const [facilityData,setFacilityData] =useState({
        nameClinic: '',
        landLine: '',
        street: '',
        city: {
            code:'',
            name:''
        },
        district: {
            code:'',
            name:''
        },
        province:{
            code:'',
            name:''
        },
        zipCode: '',
        avatar:{
            url:'',
            file:null,
        },

    })
    const onChange=(event)=>{
        if(event.target.name==="city"||event.target.name==="province"||event.target.name==="district")
        {
            const data= event.target.value.split('+')
            setFacilityData({...facilityData,[event.target.name]:{name:data[0],code:data[1]}})
        }
        else if(event.target.name==="avatar"){
            setFacilityData({
                ...facilityData,
                avatar:{
                    url:URL.createObjectURL(event.target.files[0]),
                    file:event.target.files[0]
                }
            })
            
        }
        else
            setFacilityData({...facilityData,[event.target.name]:event.target.value})
    }
    
    const onSubmit =async(event)=>{
        dispatch({type:SHOW_LOADING})
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('nameClinic',facilityData.nameClinic);
            formData.append('landLine',facilityData.landLine);
            formData.append('street',facilityData.street);
            formData.append('city',facilityData.city.name);
            formData.append('district',facilityData.district.name);
            formData.append('province',facilityData.province.name);
            formData.append('images',facilityData.avatar.file)
            const response = await axios.post(`${API_URL}/api/Clinic`,formData);
            if(response.data.success){
                dispatch({type:HIDE_LOADING});
                setvisibleMessBox({
                    loading:true,
                    messages:response.data.messages,
                    success:true,
                })
            }
            else{
                dispatch({type:HIDE_LOADING})
                setvisibleMessBox({
                    loading:true,
                    messages:response.data.messages,
                    success:false
                })
            }
            
        } catch (error) {
            dispatch({type:HIDE_LOADING})
            setvisibleMessBox({
                loading:true,
                messages:'Tạo Cơ sở không thành công',
                success:false
            })
        }
    }
    useEffect(()=>{
    },[])
    console.log(facilityData)
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
                                <label className="box-header-title">Thêm cơ sở </label>
                            </div>
                            <div className="create-facility">
                                <form onSubmit={onSubmit}>
                                    <div style={{display:"flex",flexDirection:'row',width:'90%',justifyContent:'space-around',marginTop:50}}>
                                        {facilityData.avatar.url?
                                        (<img className="avatar-facility" src={facilityData.avatar.url} onClick={()=>uploadImage.current.click()}/>):
                                        (<ion-icon name="image-outline" onClick={()=>uploadImage.current.click()}></ion-icon>)
                                        }
                                        
                                        <div style={{width:500}}>
                                            <div className="facility-name">
                                                <lable className="">Tên cơ sở</lable>
                                                <input type="text"  placeholder="Tên cơ sở" name="nameClinic" min="0" max="100" onChange={onChange}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="facility-landLine">
                                        <lable className="">Số điện thoại</lable>
                                        <input type="text" maxLength={11}  name="landLine" placeholder="Số điện thoại" onChange={onChange}/>
                                    </div>
                                    <div className="facility-city">
                                        <lable className="">Thành Phố</lable>
                                        <select  name="city" onChange={onChange}>
                                            <option style={{display:'none'}}>Thành phố</option>
                                            {Cities.map((value,index)=>(
                                                <option key={index} value={value.name+"+"+value.code}>{value.name}</option>
                                            ))}
                                            
                                        </select>
                                    </div>
                                    <div className="facility-district">
                                        <lable className="">Quận/Huyện</lable>
                                        <select  name="district" onChange={onChange}>
                                            <option style={{display:'none'}}>
                                                Quận/Huyện
                                            </option>
                                            {Districts.filter(value=>Number(facilityData.city.code)===Number(value.parent_code)?true:false)
                                            .map((value,index)=>(
                                                <option key={index} value={value.name+"+"+value.code}>{value.name}</option>
                                            ))}  
                                        </select>
                                    </div>
                                    <div className="facility-province">
                                        <lable className="">Xã/Phường</lable>
                                        <select  name="province" onChange={onChange}>
                                            <option style={{display:'none'}}>
                                                Quận/Huyện
                                            </option>
                                            {Wards.filter(value=>Number(facilityData.district.code)===Number(value.parent_code)?true:false)
                                            .map((value,index)=>(
                                                <option key={index} value={value.name+"+"+value.code}>{value.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="facility-street">
                                        <lable className="">Địa chỉ</lable>
                                        <input type="text"  name="street" placeholder="Địa chỉ" onChange={onChange}/>
                                    </div>
                                    <input type="file" multiple accept="image/*" ref={uploadImage} name="avatar" style={{display:'none'}} onChange={onChange}/>
                                    <button type="submit">Thêm cơ sở</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
            <PageLoader/>
            {visibleMessBox.loading?(
                <MessageBox visible={visibleMessBox.loading} messages={visibleMessBox.messages} isSuccess={visibleMessBox.success}  onClick={()=>visibleMessBox.success?history.push('/Facility'):setvisibleMessBox({...visibleMessBox,loading:false})}/>
                ):null}
            <Footer></Footer>
        </div>
    )
}

export default CreateFacility
