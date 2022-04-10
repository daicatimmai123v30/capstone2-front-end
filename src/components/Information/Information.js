import React ,{useEffect,useState}from "react";
import './Information.css';
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Logo from '../../assets/icons/Logo.png'
import background from '../../assets/image/background@2x.png'
import {Cities} from '../../actions/Cities'
import {Districts} from '../../actions/DistrictsModal'
import {Wards} from '../../actions/WardsModal';
import axios from "axios";
import { API_URL } from "../../actions/types";

const Information = ()=>{
    const user = useSelector((state)=>state.user);
    const history = useHistory();
    const [dataUser,setUser]= useState({
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
    const loadUser=()=>{
        if(!history.location.state)
            history.push('/Signup');
        if(user.isAuthentication)
            history.push('/Home')
    }
    useEffect(()=>{
        loadUser()
    },[])
    const handleChange = e =>{
        
        e.preventDefault();
        if(e.target.name==="city"||e.target.name==="ward"||e.target.name==="district")
        {
            const data= e.target.value.split('+')
            setUser({...dataUser,[e.target.name]:{name:data[0],code:data[1]}})
        }
        else
            setUser({...dataUser,[e.target.name]:e.target.value});
        
    };
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
            alert("Lỗi mạng")
        }
    }
    return(
        <div className='information'>
            <div className='form-information'>
                <img src={background} style={{width:500, height:600}} />
                <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                    <h1>Thông Tin Cá Nhân</h1>
                    <form onSubmit={onSubmit} noValidate>
                        <div style={{display:'flex',width:'50%',flexDirection:'column',alignItems:'center' }}>
                            <div className='dateOfBirth'>
                                <lable htmlFor="dateOfBirth">Ngày sinh</lable>
                                <input type='date' min="1900-01-01" max={new Date().toISOString().split('T')[0]} className="" placeholder="Ngày Sinh" name="dateOfBirth" onChange={handleChange} noValidate />
                            </div>
                            <div className='gender'>
                                <lable htmlFor="">Giới tính</lable>
                                <select id="gender" name="gender" onChange={handleChange}>
                                    <option style={{display:'none'}}>
                                        Chọn giới tính
                                    </option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                    <option value="Khác">Khác</option>
                                </select>
                            </div>
                            <div className='cmnd'>
                                <lable htmlFor="cmnd">Chứng minh nhân dân</lable>
                                <input type='text' className="" placeholder="Chứng minh nhân dân" name='cmnd' onChange={handleChange} noValidate />
                            </div>
                            
                        </div>
                        <div style={{display:'flex',width:'50%',flexDirection:'column',alignItems:'center' }}>
                            <div className='city'>
                                <lable htmlFor="city">Thành phố</lable>
                                <select id="city" name="city" onChange={handleChange}>
                                    <option style={{display:'none'}}>
                                        Thành phố
                                    </option>
                                    {Cities.map(value=>(
                                        <option value={value.name+"+"+value.code}>{value.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='district'>
                                <lable htmlFor="district">Quận/Huyện</lable>
                                <select id="district" name="district" onChange={handleChange}>
                                    <option style={{display:'none'}}>
                                        Quận/Huyện
                                    </option>
                                    {Districts.filter(value=>Number(dataUser.city.code)===Number(value.parent_code)?true:false)
                                    .map(value=>(
                                        <option value={value.name+"+"+value.code}>{value.name}</option>
                                    ))}
                                    
                                </select>
                            </div>
                            <div className='ward'>
                                <lable htmlFor="ward">Xã phường</lable>
                                <select id="ward" name="ward" onChange={handleChange}>
                                    <option style={{display:'none'}}>
                                        Xã/Phường
                                    </option>
                                    {Wards.filter(value=>Number(dataUser.district.code)===Number(value.parent_code)?true:false)
                                    .map(value=>(
                                        <option value={value.name+"+"+value.code}>{value.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        <div className='street'>
                            <lable htmlFor="street">Địa chỉ nhà</lable>
                            <input type='text' className="" placeholder="Địa chỉ nhà" name='street' onChange={handleChange} noValidate />
                        </div>
                        <div className="create">
                            <button type='submit' >Xác nhận</button>
                            <small style={{cursor:'pointer',color:'black'}} onClick={()=>history.push('/Signin')}>Bạn đã có tài khoản?</small>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}
export default Information;