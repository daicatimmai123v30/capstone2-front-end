import React ,{useState,useEffect, useRef}from 'react'
import Chat from '../Chat/Chat'
import Header from '../Header/Header'
import ContainerLeft from '../Container/ContainerLeft';
import Footer from '../Footer/Footer';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import axios from 'axios';
import './CreatePet.css';
import {Breeds} from '../../actions/BreedPet';
import {Pets} from '../../actions/TypeOfPet'
import { API_URL,SHOW_LOADING,HIDE_LOADING, ADD_PET } from '../../actions/types';
import PageLoader from '../PageLoader/PageLoader';
import MessageBox from '../MessageBox/MessageBox';
const CreaterPet = () => {
    const history = useHistory();
    const uploadImage =useRef(null);
    const chat = useSelector(state=>state.chat);
    const dispatch =useDispatch();
    const [visibleMessBox,setvisibleMessBox]=useState({
        loading:false,
        messages:'',
        success:false
    })
    const [petData,setPetData] =useState({
        breed:{
            name:'',
            code:'',
        },
        species:{
            name:'',
            code:''
        },
        gender:'',
        age:0,
        namePet:'',
        weight:0,
        avatar:'',
        imagePet:[],
    })
    const [urlImages,setUrlImage]=useState([])
    const onChange=(event)=>{
        if(event.target.name==='breed')
        {

            const data= event.target.value.split('+')
            setPetData({
                ...petData,
                [event.target.name]:{name:data[0],
                code:data[1]},
                avatar:'',
                species:{
                    name:'',
                    code:''
                },
            })
        }
        else if(event.target.name==='species')
        {
           
            const data= event.target.value.split('+');
            setPetData({
                ...petData,
                [event.target.name]:{name:data[0]},
                avatar:data[1]
            
            })
        }
        else if(event.target.name==="image"){
            const arrayImage =petData.imagePet;
            for(var file of event.target.files){
                urlImages.push({uri:URL.createObjectURL(file)});
                arrayImage.push(file)
            }
            setPetData({
                ...petData,
                imagePet:arrayImage
            })
            
        }
        else
            setPetData({...petData,[event.target.name]:event.target.value})
    }
    const onSubmit =async(event)=>{
        console.log('123123')
        dispatch({type:SHOW_LOADING})
        
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('breed',petData.breed.name);
            formData.append('species',petData.species.name);
            formData.append('age',petData.age);
            formData.append('namePet',petData.namePet);
            formData.append('weight',petData.weight);
            formData.append('avatar',petData.avatar);
            formData.append('gender',petData.gender); 
            for (var image of petData.imagePet){
                formData.append('images',image)
            }
            
            const response = await axios.post(`${API_URL}/api/Pet`,formData);
            if(response.data.success){
                dispatch({type:HIDE_LOADING});
                dispatch({type:ADD_PET,payload:response.data.pet})
                setvisibleMessBox({
                    loading:true,
                    messages:'Tạo thú cưng thành công',
                    success:true,
                })
            }
            else{
                dispatch({type:HIDE_LOADING})
                setvisibleMessBox({
                    loading:true,
                    messages:'Tạo thú cưng không thành công',
                    success:false
                })
            }
            
        } catch (error) {
            dispatch({type:HIDE_LOADING})
            setvisibleMessBox({
                loading:true,
                messages:'Tạo thú cưng không thành công',
                success:false
            })
        }
    }
    useEffect(()=>{
       
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
                                <label className="box-header-title">Thêm thú cưng</label>
                            </div>
                            <div className="create-pet">
                                <form onSubmit={onSubmit}>
                                    <div style={{display:"flex",flexDirection:'row',width:'90%',justifyContent:'space-around',marginTop:50}}>
                                        {petData.avatar?
                                        (<img className="avatar-pet" src={petData.avatar} alt=''/>):
                                        (<ion-icon name="image-outline"></ion-icon>)
                                        }
                                        
                                        <div style={{width:500}}>
                                            <div className="pet-breed" >
                                                <lable className="">Loài</lable>
                                                <select  name="breed" onChange={onChange}>
                                                    <option style={{display:'none'}}>Loài</option>
                                                    {Pets.map((value,index)=>(
                                                        <option key={index} value={value.name+"+"+value.code}>{value.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="pet-species">
                                                <lable className="">Giống</lable>
                                                <select  name="species" onChange={onChange}>
                                                    <option style={{display:'none'}}>Giống</option>
                                                    {Breeds.filter((value)=>Number(value.parent_code)===Number(petData.breed.code))
                                                    .map((value,index)=>(
                                                        <option key={index} value={value.name+"+"+value.image}>{value.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pet-name">
                                        <lable className="">Tên thú cưng</lable>
                                        <input type="text"  name="namePet" placeholder="Tên thú cưng" onChange={onChange}/>
                                    </div>
                                    <div className="pet-gender">
                                        <lable className="">Giới tính</lable>
                                        <select  name="gender" onChange={onChange}>
                                            <option style={{display:'none'}}>Giới tính</option>
                                            <option value="Đực">Đực</option>
                                            <option value="Cái">Cái</option>
                                        </select>
                                    </div>
                                    <div className="pet-age">
                                        <lable className="">Tuổi</lable>
                                        <input type="number"  placeholder="Tuổi (có thể để trống)" name="age" min="0" max="100" onChange={onChange}/>
                                    </div>
                                    <div className="pet-weight">
                                        <lable className="">Cân nặng</lable>
                                        <input type="number"  placeholder="Cân nặng (có thể để trống)" name="weight" min="0" max="100" onChange={onChange}/>
                                    </div>
                                    <div className="view-media">
                                        <lable className="">Thêm ảnh</lable>
                                        {urlImages.length>0?(
                                            <div className="list-media">
                                                {urlImages.map((image,index)=>(
                                                    <div key={index} className="item">
                                                        <img alt='' src={image.uri} style={{width:'100%',height:'100%'}}/>
                                                    </div>
                                                ))}
                                                <div className="item-add" onClick={()=> uploadImage.current.click()}>
                                                    <p>Thêm ảnh khác</p>
                                                    <ion-icon name="add-circle"></ion-icon>
                                                </div>
                                            </div>
                                        ):(
                                            <div className="media" onClick={()=>uploadImage.current.click()}>
                                                <ion-icon name="arrow-up-circle"></ion-icon>
                                                <button onClick={()=>uploadImage.current.click()}>
                                                    Thêm ảnh
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <input type="file" multiple accept="image/*" ref={uploadImage} name="image" style={{display:'none'}} onChange={onChange}/>
                                    <button type="submit">Thêm thú cưng</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
            <PageLoader/>
            {visibleMessBox.loading?(
                <MessageBox visible={visibleMessBox.loading} messages={visibleMessBox.messages} isSuccess={visibleMessBox.success}  onClick={()=>visibleMessBox.success?history.push('/list-pet'):setvisibleMessBox({...visibleMessBox,loading:false})}/>
                ):null}
            <Footer></Footer>
        </div>
    )
}

export default CreaterPet
