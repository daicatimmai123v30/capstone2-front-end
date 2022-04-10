import React ,{useEffect,useState,useRef}from "react";
import './VerifyOTP.css';
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Logo from '../../assets/icons/Logo.png'
import background from '../../assets/image/background@2x.png';
const phoneNumberregex = RegExp(/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/)


const VerifyOTP = ()=>{
    const user = useSelector((state)=>state.user);
    const input = useRef(null)
    const history = useHistory();
    const [code,setCode]=useState('');
    const [error,setError]=useState();
    const [second,setSecond]=useState(80);
    let interval=null;
    const onChangeCode =(event)=>{
        setCode(event.target.value)
    }
    const loadUser=()=>{
        if(user.isAuthentication)
            history.push('/Home')
    }
    const decreamentClock =()=>{
        if(second===0)
        {
            setSecond(0);
            clearInterval(interval);
        }
        else
            setSecond(second-1);
        
    }
    useEffect(()=>{
        loadUser();
        input.current.focus();
        interval = setInterval(()=>{
            decreamentClock()
        },1000)
        return()=>{
            clearInterval(interval)
        }
    },[])
    const confirmation=(event)=>{
        if(window.confirmationResult)
            window.confirmationResult.confirm(code).then((result) => {
                history.push('/Information',history.location.state)
            }).catch((error) => {
                setError("Mã PIN không đúng. Mời nhập lại")
            });
        else
            setError("Bạn chưa nhập số điện thoại")
    }
    return(
        <div className='verify'>
            <div className='form-verify'>
                <img src={background} style={{width:500, height:600}} />
                <div className="container-verify">
                   <p>
                       Hệ thống đã gửi mã PIN đến số điện thoại đăng kí của bạn. Mời bạn nhập vào để tiếp tục.
                   </p>
                   <div style={{display:'flex', flexDirection:'row',marginTop:20,marginBottom:40}}>
                        {Array(6).fill().map((value,index)=>(
                            <div className="code" onClick={()=>input.current.focus()}>
                                {code.charAt(index)}
                            </div>
                        ))}
                   </div>
                   <p>Đổi số khác</p>
                   <p>Mã có hiệu lực trong {second}</p>
                   <input ref={input} type="text" maxLength={6} onChange={onChangeCode}/>
                   <button onClick={confirmation}>
                        Tiếp Theo
                   </button>
                   <p className="text-error">
                       {error}
                   </p>
                </div>
            </div>
        </div>

    );
}
export default VerifyOTP;