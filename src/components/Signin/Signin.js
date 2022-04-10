import React ,{useState,useEffect}from "react";
import axios from 'axios'
import './Signin.css'
import {useHistory} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import { API_URL, LOAD_PETS, TOKEN, USER_LOGIN,ACTIVE_USER } from "../../actions/types";
import setToken from "../../utils/setAuthToken";
import Logo from '../../assets/icons/Logo.png'
import background from '../../assets/image/background@2x.png'
const Signin  =()=>{
    const [account,setAccount] = useState({
        username:'',
        password:'',
    })
    const user = useSelector((state)=>state.user);
    const dispatch = useDispatch();
    const [error,setError] =useState('');
    const history = useHistory();
    const loadUser=()=>{
        
    }
    useEffect(()=>{

    },[])
    const onChangeAccount = (event) =>{
        setAccount({
            ...account,[event.target.name]:event.target.value
        })
    }
    const onSignin=async (event)=>{
        event.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/Api/Account/Login`,account);
            if(response.data.success)
            {
                localStorage.setItem(TOKEN,response.data.token);
                setToken(response.data.token)
                dispatch({type:USER_LOGIN,payload:response.data.user});
                dispatch({type:ACTIVE_USER,payload:response.data.user?._id})
                const newResponse = await axios.get(`${API_URL}/api/Pet/list-pet`);
                if(newResponse.data.success)
                    dispatch({type:LOAD_PETS,payload:newResponse.data.pets})
                history.push('/Home')
            }
            else
            {
                setError(response.data.message)
            }
        } catch (error) {
            return setError('Lỗi Mạng!')
        }
    }
    return(
        <div className='signin'>
            <div className='form-signin'>
                <img src={background} style={{width:500, height:600}} />
                <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                    <img src={Logo} style={{width:200,height:200}}/>
                    <h1>Đăng nhập</h1>
                    <form  onSubmit={(event)=>onSignin(event)} noValidate>
                        <div className='username'>
                            <lable className="">Tên tài khoản</lable>
                            <input type='text' className="username" name="username" placeholder="Nhập tài khoản" onChange={onChangeAccount}  noValidate />
                        </div>
                        <div className='password'>
                            <lable className="">Mật khẩu</lable>
                            <input type='password' className="password" name="password" placeholder="Nhập mật khẩu" onChange={onChangeAccount} noValidate />
                        </div>
                        <div className="log">
                            <label style={{color:'red',fontSize:'17px',fontWeight:'600'}}>{error}</label>
                            <button type='submit'>Đăng nhập</button>
                            <small style={{cursor:'pointer',color:'black'}} onClick={()=>history.push('/Signup')}>Bạn chưa có tài khoản?</small>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}
export default Signin;