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
            setError('Kh??ng ???????c ????? tr???ng t???t c???')
    }
    return(
        <div className='signup'>
            <div id="sign-in-button"></div>
            <div className='form-signup'>
                <img src={background} style={{width:500, height:600}} />
                <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                    <img src={Logo} style={{width:200, height:200}}/>
                    <h1>T???o T??i kho???n</h1>
                    <form onSubmit={onSignInSubmit} noValidate>
                        <div className='firstName'>
                        <lable htmlFor="firstName">T??n</lable>
                        <input type='text' className="" placeholder="Nh???p t??n" name="firstName" onChange={handleChange} noValidate />
                        </div>
                        <div className='lastName'>
                        <lable htmlFor="lastName">H???</lable>
                        <input type='text' className="" placeholder="Nh???p h???" name='lastName' onChange={handleChange} noValidate />
                        </div>
                        <div className='phoneNumber'>
                        <lable htmlFor="">S???</lable>
                        <input type='phoneNumber' className="" placeholder="S??? ??i???n tho???i" name='phoneNumber' onChange={handleChange} noValidate />
                        </div>
                        <div className='password'>
                        <lable htmlFor="password">M???t kh???u</lable>
                        <input type='password' className="" placeholder="Nh???p m???t kh???u" name='password' onChange={handleChange} noValidate />
                        </div>
                        <div className="create">
                            <label style={{color:'red',fontWeight:'bold',fontSize:15}}>{error}</label>
                            <button type='submit' >T???O T??I KHO???N</button>
                            <small style={{cursor:'pointer',color:'black'}} onClick={()=>history.push('/Signin')}>B???n ???? c?? t??i kho???n?</small>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}
export default Signup;