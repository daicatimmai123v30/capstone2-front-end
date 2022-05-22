import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CLOSE_CHAT,
  UNIQUE_CHAT,
  UNIQUE_ROOM_CHAT,
  socket,
  ACTIVE_ROOM,
  LOAD_MESSAGE,
  ADD_MESSAGE,
  CLEAR_MESSAGES,
} from "../../actions/types";
// import {useHistory} from 'react-dom';
import { useHistory } from "react-router-dom";
import "./Chat.css";
import { useState } from "react";

function Chat(props) {
  const history = useHistory();
  const chat = useSelector((state) => state.chat);
  const [textMessage, setTextMessage] = useState("");
  const scrollViewChat = useRef(null);

  // console.log(props.callUser)
  let interval;
  const onChangeText = (event) => {
    setTextMessage(event.target.value);
  };
  const uniqueChat = () => {
    if (chat.user) {
      const uniqueChatData = {
        senderId: chat.activeUser,
        recieverId: chat?.user?._id,
        recieverName: chat?.user?.firstName,
      };
      const unique_Chat = JSON.parse(localStorage.getItem(UNIQUE_CHAT));

      if (unique_Chat.length > 0) {
        const user = unique_Chat.filter(({ recieverId }) =>
          recieverId === chat?.user?._id ? true : false
        );
        if (user.length > 0) {
          onUniqueChat({
            senderId: uniqueChatData.senderId,
            recieverId: uniqueChatData.recieverId,
          });
        } else {
          unique_Chat.push(uniqueChatData);
          localStorage.setItem(UNIQUE_CHAT, JSON.stringify(unique_Chat));
          onUniqueChat({
            senderId: uniqueChatData.senderId,
            recieverId: uniqueChatData.recieverId,
          });
        }
      } else {
        unique_Chat.push(uniqueChatData);
        localStorage.setItem(UNIQUE_CHAT, JSON.stringify(unique_Chat));
        onUniqueChat({
          senderId: uniqueChatData.senderId,
          recieverId: uniqueChatData.recieverId,
        });
      }
    }
  };
  const onUniqueChat = ({ senderId, recieverId }) => {
    const uniqueRoomChat = JSON.parse(localStorage.getItem(UNIQUE_ROOM_CHAT));
    socket.emit("startUniqueChat", { senderId, recieverId });
    socket.on("openChat", async ({ recieverId, senderId, roomId }) => {
      const mobileRoom = {
        senderId,
        recieverId,
        roomId,
      };
      const mobileRoomExists = uniqueRoomChat?.filter(
        ({ roomId }) => mobileRoom.roomId === roomId
      );
      if (mobileRoomExists.length > 0)
        socket.emit("joinTwoUsers", { roomId }, ({ roomId }) => {
          dispatch({ type: ACTIVE_ROOM, payload: roomId });
        });
      else {
        uniqueRoomChat.push(mobileRoom);
        localStorage.setItem(UNIQUE_ROOM_CHAT, JSON.stringify(uniqueRoomChat));

        socket.emit("joinTwoUsers", { roomId }, ({ roomId }) => {
          dispatch({ type: ACTIVE_ROOM, payload: roomId });
        });
      }
    });
  };
  const loadMessages = () => {
    socket.emit(
      "loadMessages",
      { senderId: chat.activeUser, recieverId: chat.user._id },
      (data) => {
        dispatch({ type: LOAD_MESSAGE, payload: data });
      }
    );
  };
  const sendMessage = (event) => {
    event.preventDefault();
    const { activeRoom, activeUser, user } = chat;
    const composeMessage = {
      roomId: activeRoom,
      textMessage,
      recieverId: user._id,
      senderId: activeUser,
      time: `${new Date()}`,
      sender: true,
    };
    dispatch({ type: ADD_MESSAGE, payload: composeMessage });
    socket.emit("sendToUser", {
      roomId: activeRoom,
      senderId: activeUser,
      recieverId: user._id,
      composeMessage,
    });
    setTextMessage("");
  };
  const componentDidMount = () => {
    new Promise((res) => {
      uniqueChat();

      setTimeout(res, 2000);
    }).then(() => {});
  };
  const onCloseChat = () => {
    dispatch({ type: CLOSE_CHAT });
    dispatch({ type: CLEAR_MESSAGES });
    clearInterval(interval);
  };


  const onCallUser=async()=>{
    const stream =await navigator?.mediaDevices?.getUserMedia({ video: true, audio: true })
    const peer = props.callUser(stream);
    window.peer= peer;
    window.destroy = props.leaveCall;
    history.push("/Video-call");
  }

  useEffect(() => {
    componentDidMount();
    interval = setInterval(() => {
      loadMessages();
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);
  scrollViewChat.current?.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });

  const dispatch = useDispatch();
  return (
    <div
      className="fixed bottom-0 right-0 flex flex-col items-end ml-6 w-full"
      style={{ display: chat.visibleChat ? "block" : "none", zIndex: 1000 }}
    >
      <div className="chat-modal show  mr-5 flex flex-col mb-5 shadow-lg sm:w-1/2 md:w-1/3 lg:w-1/4 view-chat">
        {/* đóng chat */}
        <div
          className="close-chat bg-red-500 hover:bg-red-600 text-white mb-1 w-10 flex justify-center items-center px-2 py-1 rounded self-end cursor-pointer close"
          onClick={() => onCloseChat()}
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-x"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
            />
            <path
              fillRule="evenodd"
              d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
            />
          </svg>
        </div>
        {/* profile */}
        <div
          className="flex justify-between items-center text-white p-2 border shadow-lg mr-5 w-full"
          style={{ backgroundColor: "#E7C7C0", borderWidth: 1 }}
        >
          <div className="flex items-center">
            <img
              src={chat?.user?.image}
              alt="picture"
              className="rounded-full w-8 h-8 mr-1"
            />
            <h2
              className="font-semibold tracking-wider"
              style={{ fontFamily: "Times New Roman" }}
            >
              {chat?.user?.firstName}
            </h2>
          </div>
          <div className="video-call">
            <ion-icon
              name="videocam-outline"
              onClick={() => onCallUser()}
            ></ion-icon>
          </div>
          {/* chat */}
        </div>
        <div className="flex flex-col bg-gray-200 px-2 chat-services expand overflow-auto  content-chat">
          {chat.messages.map((message, index) =>
            message.senderId === chat.activeUser ? (
              <div
                key={index}
                className="message p-2 self-end my-2 rounded-md shadow ml-3"
                style={{
                  backgroundColor: "#E7C7C0",
                  borderWidth: 1,
                  color: "#6D5D5D",
                }}
              >
                {message.textMessage}
              </div>
            ) : (
              <div
                key={index}
                className="chat  p-2 self-start my-2 rounded-md shadow mr-3"
                style={{
                  backgroundColor: "#F5F3F5",
                  borderWidth: 1,
                  color: "#6D5D5D",
                }}
              >
                {message.textMessage}
              </div>
            )
          )}
          <div ref={scrollViewChat} />
        </div>
        {/* gửi tin nhắn */}
        <div className="relative bg-white">
          <form
            onSubmit={sendMessage}
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              type="text"
              placeholder="tin nhắn"
              className=" border border-green-500 focus:outline-none w-full"
              value={textMessage}
              onChange={onChangeText}
              style={{ width: "90%" }}
            />
            <ion-icon
              name="send"
              style={{ fontSize: 30, color: "gray" }}
              onClick={sendMessage}
            ></ion-icon>
          </form>
        </div>
      </div>
      <div className="show-chat hidden mx-10 mb-6 mt-4 text-green-500 hover:text-green-600 flex justify-center items-center cursor-pointer ">
        <svg
          width="4em"
          height="4em"
          viewBox="0 0 16 16"
          className="bi bi-chat-text-fill"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.5 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z"
          />
        </svg>
      </div>
    </div>
  );
}

export default Chat;
