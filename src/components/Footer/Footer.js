import React from 'react'
import './Footer.css'
import Logo from '../../assets/icons/Logo@2x.png'
import Fb from '../../assets/icons/Fb.png'
import Other from '../../assets/icons/Other.png'
import Instagram from '../../assets/icons/Instagram.png'
import Twitter from '../../assets/icons/Twitter.png'
 const Footer = () => {
    return (
        <footer>
            <img className="footer-logo" src={Logo}/>
            <div className="footer-list">
                <label className="list-title">Bắt Đầu</label>
                <a className="list-link" href="">Trang chủ</a>
                <a className="list-link" href="">Giới thiệu</a>
            </div>
            <div className="footer-list">
                <label className="list-title">Khám phá</label>
                <a className="list-link" href="">Tài liệu</a>
                <a className="list-link" href="">Phòng khám</a>
                <a className="list-link" href="">Bác sĩ</a>
            </div>
            <div className="footer-list">
                <label className="list-title">Mạng xã hội</label>
                <div style={{width:'50%',height:'100px'}}>
                    <img className="logo" src={Fb}/>
                    <img className="logo" src={Instagram}/>
                    <img className="logo" src={Other}/>
                    <img className="logo" src={Twitter}/>
                </div>
            </div>
            <div className="footer-list">
                <label className="list-title">Ứng dụng</label>
                <a className="list-link" href="">Đội ngũ phát triển</a>
            </div>
        </footer>
    )
}
export default Footer;
