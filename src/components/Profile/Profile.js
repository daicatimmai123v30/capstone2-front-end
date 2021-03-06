import React,{useEffect,useState}from 'react';
import './Profile.css'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ContainerLeft from '../Container/ContainerLeft';
import axios from 'axios';
import { API_URL, TOKEN } from '../../actions/types';
import {Cities} from '../../actions/Cities'
import {Districts} from '../../actions/DistrictsModal'
import {Wards} from '../../actions/WardsModal';
import setAuthToken from '../../utils/setAuthToken';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Profile = () => {
    const [userProfile,setUserProfile]=useState(null);
    const {user} =  useSelector(state => state.user)
    const [dataUser,setDataUser]= useState({
        dateOfBirth:'',
        cmnd:'',
        gender:'',
        street:'',
        city:{
            name:'',
            code:''
        },
        district:{
            name:'',
            code:''
        },
        ward:{
            name:'',
            code:''
        }
    })
    const [isEdit,setIsEdit]=useState(false);
    const history =useHistory();
    const loadUser=async()=>{
        try {
            setAuthToken(localStorage.getItem(TOKEN))
            const response = await axios.get(`${API_URL}/api/Account/${window.location.pathname.split('/')[2]}`);
            if(response.data.success)
                setUserProfile(response.data.user)
        } catch (error) {
            
        }
    }
    const onSubmit =async(event)=>{
        event.preventDefault();
        try {
            const {phoneNumber,password,lastName,firstName}= history.location.state
            const response = await axios.post(`${API_URL}/api/Authentication/register`,
            {
                ...dataUser,
                city:dataUser.city.name,
                district:dataUser.district.name,
                ward:dataUser.ward.name,
                phoneNumber,
                password,lastName,
                firstName
            });
            if(response.data.success)
                history.push('/Signin');
            else
                alert(response.data.message)
        } catch (error) {
            alert("L???i m???ng")
        }
    }
    const handleChange = e =>{
        
        if(e.target.name==="city"||e.target.name==="ward"||e.target.name==="district")
        {
            const data= e.target.value.split('+')
            setDataUser({...dataUser,[e.target.name]:{name:data[0],code:data[1]}})
        }
        else
            setDataUser({...dataUser,[e.target.name]:e.target.value});
        
    };
    useEffect(()=>{
        loadUser();
    },[])
    console.log(userProfile)
    return (
        <div className="main">
                <Header></Header>
            <div className="body">
                <div className="body-container">
                    <ContainerLeft></ContainerLeft>
                    <div className="container-right">
                        {userProfile?(
                            <div className="box box-user">
                                <div className="user">
                                    <div className="user-avatar">
                                        <img  src={userProfile.image} alt="user-avatar" className="user-image"/>
                                        <div style={{width:'100%',height:150,marginTop:20,alignItems:'center',justifyContent:'space-between',display:'flex',flexDirection:'column'}}>
                                            {user._id===userProfile._id?(
                                                <div className="btn-edit" onClick={()=>setIsEdit(true)}>
                                                    <ion-icon name="create-outline" style={{fontSize:'40px',color:'#888e86'}}></ion-icon>
                                                    <label>Ch???nh s???a</label>
                                                </div>
                                            ):null}
                                        </div>
                                    </div>
                                    <div className="user-information">
                                        {isEdit?(
                                            <form className='formEdit'  onSubmit={onSubmit} noValidate>
                                                <div style={{display:'flex',width:'50%',flexDirection:'column',alignItems:'center' }}>
                                                    <div className='lastName'>
                                                        <lable htmlFor="">H???</lable>
                                                        <input type='text' className="" placeholder="H???" name='lastName' onChange={handleChange} value={userProfile.lastName}  noValidate />
                                                    </div>
                                                    <div className='dateOfBirth'>
                                                        <lable htmlFor="dateOfBirth">Ng??y sinh</lable>
                                                        <input type='date' min="1900-01-01" max={new Date().toISOString().split('T')[0]} className="" placeholder="Ng??y Sinh" name="dateOfBirth" onChange={handleChange} noValidate />
                                                    </div>
                                                    <div className='gender'>
                                                        <lable htmlFor="">Gi???i t??nh</lable>
                                                        <select id="gender" name="gender" onChange={handleChange} value={userProfile.gender}>
                                                            <option style={{display:'none'}}>
                                                                Ch???n gi???i t??nh
                                                            </option>
                                                            <option value="Nam">Nam</option>
                                                            <option value="N???">N???</option>
                                                            <option value="Kh??c">Kh??c</option>
                                                        </select>
                                                    </div>
                                                   
                                                    <div className='cmnd'>
                                                        <lable >Ch???ng minh th??</lable>
                                                        <input type='text' className="" placeholder="Ch???ng minh th??" name='cmnd' onChange={handleChange} value={userProfile.cnmd}  noValidate />
                                                    </div>
                                                </div>
                                                <div style={{display:'flex',width:'50%',flexDirection:'column',alignItems:'center' }}>
                                                    <div className='firstName'>
                                                        <lable >T??n</lable>
                                                        <input type='text' className="" placeholder="T??n" name='firstName' onChange={handleChange} value={userProfile.firstName}  noValidate />
                                                    </div>
                                                    <div className='city'>
                                                        <lable htmlFor="city">Th??nh ph???</lable>
                                                        <select id="city" name="city" onChange={handleChange}>
                                                            <option style={{display:'none'}}>
                                                                Th??nh ph???
                                                            </option>
                                                            {Cities.map(value=>(
                                                                <option value={value.name+"+"+value.code}>{value.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className='district'>
                                                        <lable htmlFor="district">Qu???n/Huy???n</lable>
                                                        <select id="district" name="district" onChange={handleChange}>
                                                            <option style={{display:'none'}}>
                                                                Qu???n/Huy???n
                                                            </option>
                                                            {Districts.filter(value=>Number(dataUser.city.code)===Number(value.parent_code)?true:false)
                                                            .map(value=>(
                                                                <option value={value.name+"+"+value.code}>{value.name}</option>
                                                            ))}
                                                            
                                                        </select>
                                                    </div>
                                                    <div className='ward'>
                                                        <lable htmlFor="ward">X?? ph?????ng</lable>
                                                        <select id="ward" name="ward" onChange={handleChange}>
                                                            <option style={{display:'none'}}>
                                                                X??/Ph?????ng
                                                            </option>
                                                            {Wards.filter(value=>Number(dataUser.district.code)===Number(value.parent_code)?true:false)
                                                            .map(value=>(
                                                                <option value={value.name+"+"+value.code}>{value.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                
                                                <div className='street'>
                                                    <lable htmlFor="street">?????a ch??? nh??</lable>
                                                    <input type='text' className="" placeholder="?????a ch??? nh??" name='street' onChange={handleChange} value={userProfile.street} noValidate />
                                                </div>
                                                <div className="create">
                                                    <button type='submit' >X??c nh???n</button>
                                                </div>
                                            </form>
                                        ):(
                                            <>
                                                <label className="fullName">{userProfile.lastName +' '+ userProfile.firstName}</label>
                                                {/* <div className="role-user">
                                                    <label >Y T??</label>
                                                    <input type="radio" name="role-doctor" value="Y T??" checked disabled />
                                                    <label >B??c S??</label>
                                                    <input type="radio" id="css" name="role-doctor" value="B??c S??" disabled/>
                                                    <label>Kh??c</label>
                                                    <input type="radio" id="javascript" name="role-doctor" value="Kh??c" disabled/>
                                                </div> */}
                                                <label className="property">Gi???i T??nh: <label>{userProfile.gender}</label></label>
                                                <label className="property">Ng??y Sinh: <label>{userProfile.dateOfBirth}</label></label>
                                                <label className="property">S??? ??i???n Tho???i: <label>{userProfile.phoneNumber}</label></label>
                                                <label className="property">T???nh/Th??nh Ph???: <label>{userProfile.city}</label></label>
                                                <label className="property">Qu???n/Huy???n: <label>{userProfile.district}</label></label>
                                                <label className="property">X??/Ph?????ng: <label>{userProfile.ward}</label></label>
                                                {/* <label className="property">B???ng C???p:</label> */}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ):(
                            <div className='empty-user'>
                                <p>Th??ng tin kh??ng t???n t???i</p>
                            </div>
                        )}
                    </div>  
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Profile
