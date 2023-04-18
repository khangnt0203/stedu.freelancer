import jwtDecode from "jwt-decode";
import React, { useEffect, useState, useRef } from "react";
import { getToken } from "../../utils/authenticate";
import "../../index.css";

function Message({ messages, sendChat, chatId, chatName }) {
  const userId = jwtDecode(getToken()).id;
  const [content, setContent] = useState("");
  const [listMessage, setListMessage] = useState([]);

  useEffect(() => {
    setListMessage(messages);
  }, [messages]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 p:2 sm:pb-6 justify-between flex flex-col h-screen  xl:flex border-r border-gray-200">
      <div className="flex sm:items-center justify-between py-3 border-b border-gray-200 p-3 shadow-lg bg-white">
        <div className="flex items-center space-x-4">
          {/* nút hiển thị có active hay ko */}
          <div className="flex flex-col leading-tight">
            <div className="text-xl mt-1 flex items-center">
              <span className="text-gray-700 mr-3 font-semibold">
                {chatName}
              </span>
              <span className="text-green-500">
                <svg width={10} height={10}>
                  <circle cx={5} cy={5} r={5} fill="currentColor" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Khung chat */}
      <div
        id="message"
        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-rounded scrollbar-track-blue-lighter scroll-w-2 scrolling-touch"
      >
        {listMessage.map((data) => (
          <div
            className={`chat-message ${
              data.senderId === userId ? "right" : "left"
            }`}
          >
            <div className="chat-message-sender">
              {data.senderId === userId ? "Tôi" : data.senderName}
            </div>
            <div className="chat-message-body">{data.content}</div>
            <div ref={messagesEndRef} />
          </div>
        ))}
      </div>

      {/* khung soạn tin nhắn */}
      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 ">
        <div className="relative flex">
          <input
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="focus:ring-[#F8E000] focus:border-[#F8E000] w-full focus:placeholder-gray-300 pl-12 bg-gray-100 py-3 border-gray-200 rounded-full"
            placeholder="Nhập tin nhắn..."
            value={content}
          />
          <span className="absolute inset-y-0 flex items-center">
            <button
              onClick={() => {
                sendChat(chatId, content);
                setContent("");
              }}
              className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out  bg-[#F8E000] "
            >
              Gửi
            </button>
          </span>
        </div>
      </div>
      <div className="bg-gray-50 pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0 hiddent xl:block"></div>
    </div>
  );
}

export default Message;
