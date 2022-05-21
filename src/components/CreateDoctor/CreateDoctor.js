import React ,{useState,useEffect, useRef}from 'react'
import Chat from '../Chat/Chat'
import Header from '../Header/Header'
import ContainerLeft from '../Container/ContainerLeft';
import Footer from '../Footer/Footer';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import axios from 'axios';
import './CreateDoctor.css';
import {Breeds} from '../../actions/BreedPet';
import {Pets} from '../../actions/TypeOfPet'
import { API_URL,SHOW_LOADING,HIDE_LOADING, ADD_PET, TOKEN } from '../../actions/types';
import PageLoader from '../PageLoader/PageLoader';
import MessageBox from '../MessageBox/MessageBox';
import { Cities } from '../../actions/Cities';
import { Districts } from '../../actions/DistrictsModal';
import { Wards } from '../../actions/WardsModal';
import setAuthToken from '../../utils/setAuthToken';
const CreateDoctor = () => {
    const history = useHistory();
    const uploadImage =useRef(null);
    const chat = useSelector(state=>state.chat);
    const dispatch =useDispatch();
    const [visibleMessBox,setvisibleMessBox]=useState({
        loading:false,
        messages:'',
        success:false
    })
    const [doctorData,setDoctorData] =useState({
        account:'',
        username:'',
        idClinic:'',
        password:'',
        confirmPassword:'',
        role:'',
        lastName: '',
        firstName: '',
        dateOfBirth:'',
        phoneNumber:'',
        gender:'',
        street: '',
        cmnd:'',
        city: {
            code:'',
            name:''
        },
        district: {
            code:'',
            name:''
        },
        ward:{
            code:'',
            name:''
        },
        zipCode: '',
        image:{
            url:'',
            file:null,
        },
        isCreate:false,
    })
    const [clinics,setClinics]=useState([])





    const onChange=(event)=>{
        if(event.target.name==="city"||event.target.name==="ward"||event.target.name==="district")
        {
            const data= event.target.value.split('+')
            setDoctorData({...doctorData,[event.target.name]:{name:data[0],code:data[1]}})
        }
        else if(event.target.name==="image"){
            setDoctorData({
                ...doctorData,
                image:{
                    url:URL.createObjectURL(event.target.files[0]),
                    file:event.target.files[0]
                }
            })
            
        }
        else
            setDoctorData({...doctorData,[event.target.name]:event.target.value})
    }
    
    const onSubmit =async(event)=>{
        dispatch({type:SHOW_LOADING})
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('lastName',doctorData.lastName);
            formData.append('firstName',doctorData.firstName);
            formData.append('dateOfBirth',doctorData.dateOfBirth);
            formData.append('gender',doctorData.gender);
            formData.append('phoneNumber',doctorData.phoneNumber);
            formData.append('cmnd',doctorData.cmnd);
            formData.append('street',doctorData.street);
            formData.append('city',doctorData.city.name);
            formData.append('district',doctorData.district.name);
            formData.append('ward',doctorData.ward.name);
            formData.append('account',doctorData.account)
            formData.append('image',doctorData.image.file)
            const response = await axios.post(`${API_URL}/api/Account/information`,formData);
            if(response.data.success){
                
                setvisibleMessBox({
                    loading:true,
                    messages:response.data.messages,
                    success:true,
                })
            }
            else{
                setvisibleMessBox({
                    loading:true,
                    messages:response.data.messages,
                    success:false
                })
            }
            
        } catch (error) {
          
            setvisibleMessBox({
                loading:true,
                messages:'Thêm thông tin không thành công',
                success:false
            })
        }
        dispatch({type:HIDE_LOADING});
    }
    const onCreateAccount = async(event)=>{
        dispatch({type:SHOW_LOADING})
        event.preventDefault();
        if(doctorData.password!==doctorData.confirmPassword){
            setvisibleMessBox({
                ...visibleMessBox,
                loading:true,
                messages:'Mật khẩu xác nhận không trùng khớp',
                success:false
            })
        }
        else{
            try {
                const response = await axios.post(`${API_URL}/api/Account/registerByAccount`,{
                    username:doctorData.username,
                    password:doctorData.password,
                    role:doctorData.role,
                    idClinic:doctorData.idClinic,
                })
                console.log(response)
                if(response.data.success)
                {
                    const newAccount = response.data.newAccount;
                    setDoctorData({
                        ...doctorData,
                        username:newAccount.username,
                        password:newAccount.password,
                        role:newAccount.role,
                        idClinic:newAccount.idClinic._id,
                        account:newAccount._id,
                        isCreate:true
                    })
                }else{
                    setvisibleMessBox({
                        ...visibleMessBox,
                        loading:true,
                        messages:response.data.messages,
                        success:false
                    })
                }
                
            } catch (error) {
                setvisibleMessBox({
                    ...visibleMessBox,
                    loading:true,
                    messages:'ERROR',
                    success:false
                })
            }
        }
        dispatch({type:HIDE_LOADING})
    }
    const loadClinic =async()=>{
        try {
            setAuthToken(localStorage.getItem(TOKEN))
            const response = await axios.get(`${API_URL}/api/Clinic`);
            if(response.data.success)
                setClinics(response.data.clinics)
        } catch (error) {
            console.log(error.toString())
        }
    }
    useEffect(()=>{
        loadClinic();
    },[])
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
                                <label className="box-header-title">Thêm tài khoản</label>
                            </div>
                            <div className="create-doctor">
                                {doctorData.isCreate?(
                                    <form onSubmit={onSubmit}>
                                        <div style={{display:"flex",flexDirection:'row',width:'90%',justifyContent:'space-around',marginTop:50}}>
                                            {doctorData.image.url?
                                            (<img className="avatar-doctor" src={doctorData.image.url} onClick={()=>uploadImage.current.click()}/>):
                                            (<ion-icon name="image-outline" onClick={()=>uploadImage.current.click()}></ion-icon>)
                                            }
                                            
                                            <div style={{width:500}}>
                                                <div className="doctor-name">
                                                    <lable className="">Họ</lable>
                                                    <input type="text"  placeholder="Nhập họ" name="lastName" onChange={onChange}/>
                                                </div>
                                                <div className="doctor-name">
                                                    <lable className="">Tên</lable>
                                                    <input type="text"  placeholder="Nhập tên" name="firstName" onChange={onChange}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="doctor-dateOfBirth">
                                            <lable className="">Ngày sinh</lable>
                                            <input type="date" maxLength={11}  name="dateOfBirth" placeholder="Ngày sinh" onChange={onChange}/>
                                        </div>
                                        <div className="doctor-gender">
                                            <lable className="">Giới tính</lable>
                                            <select name="gender" onChange={onChange}>
                                                <option style={{display:'none'}}>Giới tính</option>
                                                <option value="Nam" >Nam</option>
                                                <option value="Nữ">Nữ</option>
                                            </select>
                                        </div>
                                        <div className="doctor-phoneNumber">
                                            <lable className="">Số điện thoại</lable>
                                            <input type="text" maxLength={11}  name="phoneNumber" placeholder="Số điện thoại" onChange={onChange}/>
                                        </div>
                                        <div className="doctor-cmnd">
                                            <lable className="">Chứng minh nhân dân</lable>
                                            <input type="text" maxLength={11}  name="cmnd" placeholder="Chứng minh nhân dân" onChange={onChange}/>
                                        </div>
                                        <div className="doctor-city">
                                            <lable className="">Thành Phố</lable>
                                            <select  name="city" onChange={onChange}>
                                                <option style={{display:'none'}}>Thành phố</option>
                                                {Cities.map((value,index)=>(
                                                    <option key={index} value={value.name+"+"+value.code}>{value.name}</option>
                                                ))}
                                                
                                            </select>
                                        </div>
                                        <div className="doctor-district">
                                            <lable className="">Quận/Huyện</lable>
                                            <select  name="district" onChange={onChange}>
                                                <option style={{display:'none'}}>
                                                    Quận/Huyện
                                                </option>
                                                {Districts.filter(value=>Number(doctorData.city.code)===Number(value.parent_code)?true:false)
                                                .map((value,index)=>(
                                                    <option key={index} value={value.name+"+"+value.code}>{value.name}</option>
                                                ))}  
                                            </select>
                                        </div>
                                        <div className="doctor-ward">
                                            <lable className="">Xã/Phường</lable>
                                            <select  name="ward" onChange={onChange}>
                                                <option style={{display:'none'}}>
                                                    Quận/Huyện
                                                </option>
                                                {Wards.filter(value=>Number(doctorData.district.code)===Number(value.parent_code)?true:false)
                                                .map((value,index)=>(
                                                    <option key={index} value={value.name+"+"+value.code}>{value.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="doctor-street">
                                            <lable className="">Địa chỉ</lable>
                                            <input type="text"  name="street" placeholder="Địa chỉ" onChange={onChange}/>
                                        </div>
                                        <input type="file" multiple accept="image/*" ref={uploadImage} name="image" style={{display:'none'}} onChange={onChange}/>
                                        <button type="submit">Hoàn thành</button>
                                    </form>
                                ):(
                                    <form onSubmit={onCreateAccount}>
                                        <div className="doctor-username">
                                            <lable className="">Tên tài khoản</lable>
                                            <input type="text"  name="username" placeholder="Tên tài khoản" onChange={onChange}/>
                                        </div>
                                        <div className="doctor-password">
                                            <lable className="">Mật khẩu</lable>
                                            <input type="password"  name="password" placeholder="Mật khẩu" onChange={onChange}/>
                                        </div>
                                        <div className="doctor-confirmPassword">
                                            <lable className="">Xác nhận mật khẩu</lable>
                                            <input type="password"  name="confirmPassword" placeholder="Xác nhận mật khẩu" onChange={onChange}/>
                                        </div>
                                        <div className="doctor-role">
                                            <lable className="">Vai trò</lable>
                                            <select name="role"  onChange={onChange}>
                                                <option style={{display:'none'}}>Vai trò</option>
                                                <option value="ADMIN">Quản lý</option>
                                                <option value="DOCTOR">Bác sĩ</option>
                                                <option value="NURSE">Y tá</option>
                                            </select>
                                        </div>
                                        <div className="doctor-clinic">
                                            <lable className="">Phòng khám</lable>
                                            <select name="idClinic" onChange={onChange}>
                                                <option style={{display:'none'}}>Phòng khám</option>
                                                {clinics.map((value,index)=>(
                                                    <option key={index} value={value._id}>{value.nameClinic}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <button type="submit">Xác nhận</button>
                                    </form>
                                )}
                                
                                
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
            <PageLoader/>
            {visibleMessBox.loading?(
                <MessageBox visible={visibleMessBox.loading} messages={visibleMessBox.messages} isSuccess={visibleMessBox.success}  onClick={()=>visibleMessBox.success?history.push('/list-doctor'):setvisibleMessBox({...visibleMessBox,loading:false})}/>
                ):null}
            <Footer></Footer>
        </div>
    )
}

export default CreateDoctor
