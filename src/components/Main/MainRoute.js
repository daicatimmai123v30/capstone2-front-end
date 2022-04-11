import axios from "axios";
import React, { useEffect, useState,useRef} from "react";
import { Route, Switch, Redirect,useHistory } from "react-router-dom";
import {
  ACTIVE_USER,
  API_URL,
  LOAD_PETS,
  TOKEN,
  UNIQUE_CHAT,
  UNIQUE_ROOM_CHAT,
  USER_ERROR,
  USER_LOAD,
  ACCEPT_CALLING,
  REFUSE_CALLING,
  WAIT_CALLING
} from "../../actions/types";
import Home from "../Home/Home";
import ListDoctor from "../ListDoctor/ListDoctor";
import Doctor from "../Doctor/Doctor";
import ListPet from "../ListPet/ListPet";
import ListPetOwner from "../ListPetOwner/ListPetOwner";
import Signin from "../Signin/Signin";
import Signup from "../Signup/Signup";
import Schedule from "../Schedule/Schedule";
import VerifyOTP from "../VerifyOTP/VerifyOTP";
import Information from "../Information/Information";
import CreaterPet from "../CreatePet/CreaterPet";
import Pet from "../Pet/Pet";
import Appointment from "../Appointment/Appointment";
import Facility from "../Facility/Facility";
import ListFacility from "../ListFacility/ListFacility";
import Support from "../Support/Support";
import Profile from "../Profile/Profile";
import CreateFacility from "../CreateFacility/CreateFacility";
import CreateDoctor from "../CreateDoctor/CreateDoctor";
import Liquidation from "../Liquidation/Liquidation";
// import LiquidationDetails from "../LiquidationDetails/LiquidationDetails";
import Statistical from "../Statistical/Statistical";
// import Signup from "./users/Signup";

import setAuthToken from "../../utils/setAuthToken";
import { useDispatch, useSelector } from "react-redux";
import LiquidationDetails from "../LiquidationDetails/LiquidationDetails";
import VideoCall from "../VideoCall/VideoCall";
import Peer from "simple-peer";

import io from "socket.io-client";
const socket = io.connect("http://localhost:4441");
const Mainrouter = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const chat = useSelector(state =>state.chat);
  const [me, setMe] = useState("");
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const connectionRef= useRef();
  const history = useHistory();
  const [nameCaller,setNameCaller] = useState("");

  const checkToken = async () => {
    const token = localStorage.getItem(TOKEN);
    try {
      setAuthToken(token);
      const response = await axios.get(`${API_URL}/api/Account`);
      if (response.data.success) {
        dispatch({ type: USER_LOAD, payload: response.data.user });
        const newResponse = await axios.get(`${API_URL}/api/Pet/list-pet`);
        if (newResponse.data.success)
          dispatch({ type: LOAD_PETS, payload: newResponse.data.pets });
      } else {
        dispatch({ type: USER_ERROR });
        localStorage.removeItem(TOKEN);
        setAuthToken(null);
      }
    } catch (error) {
      dispatch({ type: USER_ERROR });
      localStorage.removeItem(TOKEN);
      setAuthToken(null);
    }
  };

  const chatUserList = () => {
    const unique_Chat = JSON.parse(localStorage.getItem(UNIQUE_CHAT));
    const unique_RoomChat = JSON.parse(localStorage.getItem(UNIQUE_ROOM_CHAT));
    if (!unique_Chat) localStorage.setItem(UNIQUE_CHAT, JSON.stringify([]));
    if (!unique_RoomChat)
      localStorage.setItem(UNIQUE_ROOM_CHAT, JSON.stringify([]));
    if (user.isAuthentication)
      dispatch({ type: ACTIVE_USER, payload: user?.user?._id });
  };
  const loadSocket = () => {
    socket.emit("me",user?.user?._id,function (socket){return setMe(socket)});
    window.addEventListener('beforeunload', function (e) {
      dispatch({type:REFUSE_CALLING})
      socket.emit("forceDisconnect",user?.user?._id);
      socket.emit("disconnect");
        e.preventDefault();
        e.returnValue = '';
    });

    socket.on("callUser", (data) => {
      // setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
      dispatch({type:WAIT_CALLING});
      setNameCaller(data.name)
      console.log(data)
    });

  };
  const callUser = (stream) => {
    const userVideo=null;
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: chat?.user?._id,
        signalData: data,
        from: me,
        name: user?.user?.lastName + " " + user?.user?.firstName
      });
    });
    // peer.on("stream", (stream) => {
    //   userVideo = stream;
    // });
    socket.on("callAccepted", (signal) => {
      // setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
    return peer;
  };
  
  const answerCall =(stream) =>  {
    dispatch({type:ACCEPT_CALLING})
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: caller })
		})
		// peer.on("stream", (stream) => {
		// 	// userVideo.current.srcObject = stream
		// })

		peer.signal(callerSignal)
		connectionRef.current = peer
    return peer
	}
	const leaveCall = () => {
		// setCallEnded(true)
		connectionRef.current.destroy()
    history.push("/Home");
    window.location.reload();
	}
  useEffect(() => {
    checkToken();
    chatUserList();
    loadSocket();
  }, []);

  return (
    <Switch>
      {user?.user?.role === "DOCTOR" || user?.user?.role === "ADMIN" ? (
        <Route path="/List-pet-owner" component={ListPetOwner} />
      ) : null}
      <Route path="/Signin" component={Signin} />
      <Route path="/Signup" component={Signup} />
      <Route path="/Home" >
        <Home callUser={callUser} answerCall={answerCall} leaveCall={leaveCall} nameCaller={nameCaller}></Home>
      </Route>
      <Route path="/Information" component={Information} />
      <Route path="/VerifyOTP" component={VerifyOTP} />
      {user.isAuthentication ? (
        <>
          <Route path="/List-doctor" component={ListDoctor} />
          <Route path="/Doctor/:slug" component={Doctor} />
          <Route path="/List-pet" component={ListPet} />
          <Route path="/Schedule" component={Schedule} />
          <Route path="/Create-pet" component={CreaterPet} />
          <Route path="/Pet/:slug" component={Pet} />
          <Route path="/Profile/:slug" component={Profile} />
          <Route path="/Appointment/:slug" component={Appointment} />
          <Route path="/Appointment" component={Appointment} />
          <Route path="/Facility/:slug" component={Facility} />
          <Route path="/List-facility" component={ListFacility} />
          <Route path="/Support" component={Support} />
          <Route path="/Liquidation" component={Liquidation} />
          <Route path="/Liquidation-details/:slug" component={LiquidationDetails} />
          <Route path="/Statistical" component={Statistical} />
          <Route path="/Video-call" component={VideoCall} />
          {user.user.role === "ADMIN" ? (
            <>
              <Route path="/Create-facility" component={CreateFacility} />
              <Route path="/Create-doctor" component={CreateDoctor} />
            </>
          ) : null}
        </>
      ) : null}
      <Redirect to="/Home" />
    </Switch>
  );
};
export default Mainrouter;
