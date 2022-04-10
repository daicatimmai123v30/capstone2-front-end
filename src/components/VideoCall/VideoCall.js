import "./VideoCall.css";
import io from "socket.io-client";
import React, { useEffect, useRef, useState  } from "react";
import { useHistory } from "react-router-dom";
import Peer from "simple-peer";

const socket = io.connect("http://localhost:4441");

export default function VideoCall(props) {
  const [stream, setStream] = useState(window.stream);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
				myVideo.current.srcObject = stream
		})
    // socket.on("callUser", (data) => {
    //   setReceivingCall(true);
    //   setCaller(data.from);
    //   setCallerSignal(data.signal);
    // });
    const peer = window?.peer
    peer?.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
      
    });
  }, []);

  // const callUser = (id) => {
  //   const peer = new Peer({
  //     initiator: true,
  //     trickle: false,
  //     stream: stream,
  //   });
  //   peer.on("signal", (data) => {
  //     socket.emit("callUser", {
  //       userToCall: id,
  //       signalData: data,
  //       from: me,
  //       name: name,
  //     });
  //   });
  //   peer.on("stream", (stream) => {
  //     userVideo.current.srcObject = stream;
  //   });
  //   socket.on("callAccepted", (signal) => {
  //     setCallAccepted(true);
  //     peer.signal(signal);
  //   });

  //   connectionRef.current = peer;
  // };

  // const answerCall = () => {
  //   setCallAccepted(true);
  //   const peer = new Peer({
  //     initiator: false,
  //     trickle: false,
  //     stream: stream,
  //   });
  //   peer.on("signal", (data) => {
  //     socket.emit("answerCall", { signal: data, to: caller });
  //   });
  //   peer.on("stream", (stream) => {
  //     userVideo.current.srcObject = stream;
  //   });
  //   peer.signal(callerSignal);
  //   connectionRef.current = peer;
  // };

  // const leaveCall = () => {
  //   console.log("endcall")
  //   setCallEnded(true);
  //   connectionRef.current.destroy();
  // };
  // console.log(window.destroy)
  return (
    <div className="container-video-call">
      <div id="videoCall">
        <div className="remote-stream">
        <video playsInline ref={userVideo} autoPlay />
          {/* {callAccepted && !callEnded ? (
            <video playsInline ref={userVideo} autoPlay />
          ) : null} */}
        </div>
        <div className="local-stream">
          {stream && <video playsInline muted ref={myVideo} autoPlay />}
        </div>
        <div className="controls">
          {/* <ion-icon name="call"></ion-icon> */}
          {/* {callAccepted && !callEnded ? (
            
          ) : (
            <ion-icon name="call" onClick={() => callUser(idToCall)}></ion-icon>
          )}
          {idToCall} */}
          <ion-icon name="call" onClick={()=>{window.destroy()}}></ion-icon>
        </div>
      </div>
    </div>
  );
}
