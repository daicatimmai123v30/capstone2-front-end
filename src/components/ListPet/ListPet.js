import React ,{useEffect,useState} from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer';
import ContainerLeft from '../Container/ContainerLeft';
import './ListPet.css'
import axios from 'axios';
import { API_URL, TOKEN } from '../../actions/types';
import setAuthToken from '../../utils/setAuthToken';
import Add from '../../assets/icons/add.png'
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import Chat from '../Chat/Chat';
const ListPet = (props) => {
    
    const history = useHistory();
    const [doctors,setDoctors] = useState([])
    const chat = useSelector(state=>state.chat);
    const {pets}=useSelector(state=>state.user);

    const loadDoctors =async()=>{
        try {
            setAuthToken(localStorage.getItem(TOKEN))
            const response = await axios.get(`${API_URL}/api/Doctor/list-doctor`);
            if(response.data.success)
                setDoctors(response.data.doctors)
        } catch (error) {
            alert('Lỗi Internet');
        }
    }
    useEffect(()=>{
        loadDoctors();
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
                                <label className="box-header-title">Thú Cưng</label>
                            </div>
                            <div className="pets">
                                {pets.map((pet,index)=>(
                                <div key={index}className="pets-form">
                                    <img src={pet.avatar} className="pet-avatar" alt="pet-avatar"/>
                                    <div style={{paddingLeft:15,display:'flex',flexDirection:'column'}}>
                                        <a onClick={()=>history.push(`/Pet/${pet._id}`)}>{pet.namePet}</a>
                                        <label>
                                            {pet.breed}
                                        </label>
                                    </div>
                                </div>
                                ))}
                                <img src={Add} style={{width:200,height:200,cursor:'pointer'}} onClick={()=>history.push('create-pet')}/>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
            <Footer></Footer>
        </div>
    )
}

export default ListPet
