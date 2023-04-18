import {
  Avatar,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../images/logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { getToken, removeToken, setExpired } from "../../utils/authenticate";
import jwtDecode from "jwt-decode";
import CartAPI from "../../utils/cart";
import UserAPI from "../../utils/user";
function NavBar(props) {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  const openCart = () => {
    window.location.assign("/cart");
  };
  const openChat = () => {
    window.location.assign("/chat");
  };
  const openProfile = () => {
    window.location.assign("/my-profile");
  };
  const openLogin = () => {
    window.location.assign("/login");
  };
  const openSignUpTeacher = () => {
    window.location.assign("/sign-up-tutor");
  };
  const openAdmin = () => {
    window.location.assign("/admin");
  };
  const openStudent = () => {
    window.location.assign("/student/my-course");
  };
  const openTutor = () => {
    window.location.assign("/tutor/my-course");
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const token = getToken();

  const handleLogout = () => {
    removeToken();
    window.location.reload();
  };
  const [quantity, setQuantity] = useState();
  useEffect(() => {
    const getCartQuantity = async () => {
      try {
        const response = await CartAPI.getCart();
        setQuantity(response.orderItems.length);
      } catch (error) {
        if (error.response.status === 401) {
          setExpired(true);
        }
        console.log("Error:", error);
      }
    };
    getCartQuantity();
  }, []);
  const [avatar, setAvatar] = useState();
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await UserAPI.getUser(
          token ? jwtDecode(token).id : ""
        );
        setAvatar(response.data[0].avatar);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    getUser();
  }, [token ? token : ""]);
  return (
    <div className="sticky top-0 shadow-sm bg-gray-900 z-50 md:z-40">
      <div className=" flex justify-between items-center h-24 max-w-[1440px] mix-w-[960px] mx-auto px-4 text-white">
        <h1 className=" font-bold  text-[#F8E000]">
          {" "}
          <a href="/">
            {" "}
            <img className="w-24 h-24" src={Logo} />
          </a>
        </h1>

        <ul className="md:flex justify-between font-semibold hidden ">
          <li className="p-4">
            <a href="/">Trang chủ</a>
          </li>
          <li className="p-4">
            <a href="/course">Khoá học</a>
          </li>
          <li className="p-4">
            <a href="/about-us">Giới thiệu</a>
          </li>
          {/* <li className="p-4">Liên hệ</li> */}
          {token === null ? (
            <>
              {" "}
              <button
                className="p-2 border-solid rounded-md border-[#F8E000] bg-[#F8E000] border-2 ml-2 text-gray-900"
                onClick={openLogin}
              >
                Đăng nhập
              </button>
              <button
                className="p-2 border-solid rounded-md border-[#F8E000]  border-2 ml-2 text-[#fff]"
                onClick={openSignUpTeacher}
              >
                Đăng ký Gia sư
              </button>
            </>
          ) : (
            <div>
              <IconButton onClick={handleClick} color="warning">
                <Avatar src={avatar} />
              </IconButton>

              <IconButton onClick={openChat} color="warning">
                <QuestionAnswerIcon />
              </IconButton>
            </div>
          )}

          {token ? (
            jwtDecode(token).role === "STUDENT" ? (
              <IconButton onClick={openCart} color="warning">
                <Badge badgeContent={quantity} color="success">
                  <LocalGroceryStoreIcon />
                </Badge>
              </IconButton>
            ) : null
          ) : null}
        </ul>
        <div className="md:hidden flex">
          <Button
            endIcon={<MenuIcon />}
            color={"warning"}
            onClick={handleNav}
          />
          {/* <IconButton onClick={handleClick}>
            <Avatar src="https://i.pravatar.cc" />
          </IconButton> */}
          <IconButton onClick={openChat} color="warning">
            <QuestionAnswerIcon />
          </IconButton>
          {token ? (
            jwtDecode(token).role === "STUDENT" ? (
              <IconButton onClick={openCart} color="warning">
                <Badge badgeContent={quantity} color="success">
                  <LocalGroceryStoreIcon />
                </Badge>
              </IconButton>
            ) : null
          ) : null}
        </div>
        {/* navbar mobile */}
        <div
          className={
            nav
              ? `fixed left-0 top-0 h-full bg-gray-900  border-r border-r-white w-[50%] ease-in-out duration-500 z-50`
              : "ease-in-out duration-500 fixed left-[-100%]"
          }
        >
          <div className="flex justify-between ">
            <h1 className=" text-xl font-bold text-[#F8E000] px-4">STEDU</h1>
            <div onClick={handleNav} className=" md:hidden ">
              <Button startIcon={<CloseIcon />} color={"warning"} />
            </div>
          </div>
          <ul className="uppercase p-4">
            {!token ? (
              <>
                {" "}
                <button
                  className="p-2 border-solid rounded-md border-[#F8E000] bg-[#F8E000] border-2 ml-2 text-gray-900"
                  onClick={openLogin}
                >
                  Đăng nhập
                </button>
                <button
                  className="p-2 border-solid rounded-md border-[#F8E000]  border-2 ml-2 text-[#fff]"
                  onClick={openSignUpTeacher}
                >
                  Đăng ký Gia sư
                </button>
              </>
            ) : (
              <div className="flex items-center">
                <IconButton color="warning">
                  <Avatar src={avatar} />
                </IconButton>
                <div onClick={handleClick}>{jwtDecode(token).fullName}</div>
              </div>
            )}
            <li className="p-4 border-b border-t border-white">
              <a href="/">Trang chủ</a>
            </li>
            <li className="p-4 border-b border-white">
              <a href="/course">Khoá học</a>
            </li>
            <li className="p-4 border-b border-white">
              {" "}
              <a href="/about-us">Giới thiệu</a>
            </li>
            {/* <li className="p-4 border-b border-white">Liên hệ</li> */}
          </ul>
        </div>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {token ? (
          <div className="ml-2">
            Xin chào, <br />
            <div className="text-[#ffae2d]"> {jwtDecode(token).fullName}</div>
          </div>
        ) : null}
        <MenuItem onClick={openProfile}>Thông tin tài khoản</MenuItem>
        {token
          ? jwtDecode(token).role === "TEACHER"
            ? ((<MenuItem onClick={handleClose}>Quản lý lớp học</MenuItem>),
              (<MenuItem onClick={openTutor}>Quản lý lớp học</MenuItem>))
            : null
          : null}
        {token ? (
          jwtDecode(token).role === "ADMIN" ? (
            <MenuItem onClick={openAdmin}>Quản lý hệ thống</MenuItem>
          ) : null
        ) : null}
        {token ? (
          jwtDecode(token).role === "STUDENT" ? (
            <MenuItem onClick={openStudent}>Khoá học của tôi</MenuItem>
          ) : null
        ) : null}

        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
      </Menu>
    </div>
  );
}

export default NavBar;
