import React from 'react'
import Loader from '../../assets/image/loader.gif';
import './PageLoader.css'
import { useSelector } from 'react-redux';
const PageLoader = () => {
    const user = useSelector(state=>state.user)
    return ( 
        user.loading?(
            <div className="loader-container">
                <div className="loader">
                    <img src={Loader}/>
                </div>
            </div>
        ):<></> 
    ) 
}

export default PageLoader
