import React,{useEffect}from 'react'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ContainerLeft from '../Container/ContainerLeft'
import './Support.css'

const Support = () =>{
    
    return (
        <div className="main">
                <Header></Header>
            <div className="body">
                <div className="body-container">
                    <ContainerLeft></ContainerLeft>
                    <div className="container-right">
                        <div className="box1">
                             <h1>Hỗ Trợ</h1>
                            <div className='contact'>
                                <h2>Liên Hệ</h2>
                                <p className='contact1'>Tên Nhân Viên tư vấn:</p>
                                <p className='contact1'>Email:</p>
                                <p className='contact1'>số điện thoại:</p>
                            </div>

                            <div className='contact'>
                    
                                <p className='contact1'>Tên Nhân Viên tư vấn:</p>
                                <p className='contact1'>Email:</p>
                                <p className='contact1'>số điện thoại:</p>
                            </div>
                            <div className='FQA'>
                                <h1 >FQA</h1>
                                <div className='question'>
                                    <div className='qtion1'>
                                        <h1>Câu Hỏi</h1>
                                        <p className='qtion2' >Câu trả lời:</p>
                                        </div>
                                        <div className='qtion1'>
                                        <h1>Câu Hỏi</h1>
                                        <p className='qtion2'>Câu trả lời:</p>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Support;