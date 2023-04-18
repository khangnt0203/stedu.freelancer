import { useEffect, useState } from "react";
import ListUser from "./ListUser";
import Message from "./Message";
import { getToken } from "../../utils/authenticate";
import jwtDecode from "jwt-decode";
import ChatAPI from "../../utils/chat";
import { Stomp } from "@stomp/stompjs";

function ChatBox(props) {
  const [filterChat, setFilterChat] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [chatName, setChatName] = useState("");
  const handleFilterChat = (roomId) => {
    setFilterChat(roomId);
  };
  const handleFilterChatName = (chatName) => {
    setChatName(chatName);
  };
  const token = getToken();
  const userId = jwtDecode(token).id;

  const [listMessage, setListMessage] = useState([]);

  useEffect(() => {
    const getListChat = async () => {
      try {
        if (filterChat !== "" && typeof filterChat !== "undefined") {
          const response = await ChatAPI.getListMessage(filterChat);
          setListMessage(response.data);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    getListChat();

  }, [filterChat]);

  useEffect(() => {
    const socket = new WebSocket("wss://api.stedu.site/ws"); // Replace with your WebSocket endpoint
    const stomp = Stomp.over(socket);
    const decode = jwtDecode(getToken());

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    stomp.connect(headers, () => {
      setStompClient(stomp);
      stomp.subscribe(`/private/${decode.id}`, (message) => {
        let data = JSON.parse(message.body);
        if (filterChat === data.roomId) {
          const newList = [...listMessage, data];
          console.log(newList);
          setListMessage(newList);
        } else {
          // newMessages.set(data.roomId, data.content);
          // $('#userNameAppender_' + data.roomId).append('<span id="newMessage_' + data.roomId + '" style="color: red">+1</span>');
        }
      });
    });
    return () => {
      stomp.disconnect();
    };
  }, [filterChat, listMessage]);

  const sendMsg = (from, text) => {
    console.log(`from ${from}`);
    stompClient.send(
      "/app/send",
      {},
      JSON.stringify({
        roomId: from,
        senderId: userId,
        content: text,
      })
    );
    // const  data = {
    //     roomId: "485ca3c0-bea3-4c6d-a07c-f0c27883d935",
    //     senderId: "123",
    //     content: "123",
    //     createdAt: null,
    //     updatedAt: null,
    //   };
    // const newList = [...listMessage, data];
    //       console.log(newList);
    //       setListMessage(newList);
  };
  return (
    <div>
      <div className="flex-grow w-full max-w-[1440px] mx-auto lg:flex">
        <ListUser
          filterChat={handleFilterChat}
          chatName={handleFilterChatName}
        />
        {filterChat !== "" ? (
          <Message
            messages={listMessage}
            sendChat={sendMsg}
            chatId={filterChat}
            chatName={chatName}
          />
        ) : null}
      </div>
    </div>
  );
}

export default ChatBox;
