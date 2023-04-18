import React, { useEffect } from "react";
import ChatAPI from "../../utils/chat";
import { getToken } from "../../utils/authenticate";
import {
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

function ListUser({ filterChat, chatName }) {
  const [listChat, setListChat] = React.useState();
  const [chat, setChat] = React.useState();

  React.useEffect(() => {
    const getListChat = async () => {
      try {
        // const token = getToken();
        const response = await ChatAPI.getListChat();
        setListChat(response);
        // setTotalPage(response.total)
      } catch (error) {
        console.log("Error:", error);
      }
    };
    getListChat();
  }, [chat]);

  return (
    <div className="border-b border-gray-200 xl:border-b-2 xl:flex-shrink xl:w-64 xl:border-r xl:border-gray-200 bg-gray-50">
      <div className="font-semibold text-center px-2 py-2 bg-[#F8E000]">
        Danh sách chat
      </div>
      <div className="h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
        <div className="h-full relative ">
          <FormControl>
            <List
              // aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="all"
              // name="radio-buttons-group"
            >
              {listChat?.map((data) => (
                <div
                  className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 
focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#F8E000] focus-within:bg-[#F8E000] mb-4 border-b-2 hover:bg-gray-200 "
                >
                  <ListItemButton
                    key={data.id}
                    value={data.id}
                    onClick={() => {
                      filterChat(data.id);
                      setChat(data.id);
                      chatName(data.name);
                    }}
                    label={data.name}
                  >
                    <ListItemText primary={data.name} />
                  </ListItemButton>
                </div>
              ))}
            </List>
          </FormControl>
        </div>
      </div>
    </div>
  );
}

export default ListUser;
