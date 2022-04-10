import React ,{useEffect,useState}from "react";
import './Signup.css';
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Logo from '../../assets/icons/Logo.png'
import background from '../../assets/image/background@2x.png'
import { getAuth, RecaptchaVerifier,signInWithPhoneNumber  } from "firebase/auth";
import firebase from '../../actions/firebase'

const Signup = ()=>{
    const user = useSelector((state)=>state.user);
    const history = useHistory();
    const [dataUser,setUser]= useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        password: ""
    })
    const [error,setError] = useState('')
    const loadUser=()=>{
        if(user.isAuthentication)
            history.push('/Home')
    }
    useEffect(()=>{
        loadUser();
    },[])
    const handleChange = e =>{
        e.preventDefault();
        setUser({...dataUser,[e.target.name]:e.target.value});
        
    };
    const configureCaptcha =()=>{
        const auth = getAuth();
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignInSubmit();
        }
        }, auth);
    }
    const onSignInSubmit=(event)=>{
        event.preventDefault();
        if(dataUser.firstName || dataUser.lastName || dataUser.password || dataUser.phoneNumber){
            configureCaptcha();
            const appVerifier = window.recaptchaVerifier;

            const auth = getAuth();
            signInWithPhoneNumber(auth,"+84"+ dataUser.phoneNumber, appVerifier)
                .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                    history.push('/verifyOTP',dataUser)
                }).catch((error) => {
                    console.log(error.toString())
                });
        }
        else
            setError('Không được để trống tất cả')
    }
    return(
        <div className='signup'>
            <div id="sign-in-button"></div>
            <div className='form-signup'>
                <img src={background} style={{width:500, height:600}} />
                <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                    <img src={Logo} style={{width:200, height:200}}/>
                    <h1>Tạo Tài khoản</h1>
                    <form onSubmit={onSignInSubmit} noValidate>
                        <div className='firstName'>
                        <lable htmlFor="firstName">Tên</lable>
                        <input type='text' className="" placeholder="Nhập tên" name="firstName" onChange={handleChange} noValidate />
                        </div>
                        <div className='lastName'>
                        <lable htmlFor="lastName">Họ</lable>
                        <input type='text' className="" placeholder="Nhập họ" name='lastName' onChange={handleChange} noValidate />
                        </div>
                        <div className='phoneNumber'>
                        <lable htmlFor="">Số</lable>
                        <input type='phoneNumber' className="" placeholder="Số điện thoại" name='phoneNumber' onChange={handleChange} noValidate />
                        </div>
                        <div className='password'>
                        <lable htmlFor="password">Mật khẩu</lable>
                        <input type='password' className="" placeholder="Nhập mật khẩu" name='password' onChange={handleChange} noValidate />
                        </div>
                        <div className="create">
                            <label style={{color:'red',fontWeight:'bold',fontSize:15}}>{error}</label>
                            <button type='submit' >TẠO TÀI KHOẢN</button>
                            <small style={{cursor:'pointer',color:'black'}} onClick={()=>history.push('/Signin')}>Bạn đã có tài khoản?</small>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}
export default Signup;