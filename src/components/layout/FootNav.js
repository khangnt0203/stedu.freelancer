import React from "react";
import Logo from "../../images/logo.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
function FootNav(props) {
  return (
    <div className="text-white bg-gray-900">
      <div className="max-w-[1440px] mx-auto py-16 px-4 grid lg:grid-cols-4 lg:gap-8 gap-2 ">
        <div className="col-span-4 lg:col-span-2">
          <h1 className="text-3xl font-bold text-[#F8E000] border-b">STEDU</h1>
          <p className="py-4">
            STEDU là đơn vị trực thuộc công ty TNHH TTA – là một nền tảng kết
            nối trực tuyến giữa sinh viên giỏi muốn trải nghiệm giảng dạy và
            sinh viên yếu kém có nhu cầu học kèm. Sinh viên có thể chủ động lựa
            chọn những gì muốn học, khám phá các khóa học chuyên sâu giúp họ
            vượt qua áp lực để đạt mục tiêu học tập, công việc.
          </p>
          <img src={Logo} className="w-32 h-32" />
          <div className="flex justify-between md:w-[75%] my-6">
            {/* <FaFacebookSquare size={30} />
              <FaInstagram size={30} />
              <FaTwitterSquare size={30} />
              <FaGithubSquare size={30} />
              <FaDribbbleSquare size={30} /> */}
          </div>
        </div>
        <div className="lg:col-span-2 col-span-4 lg:gap-4 flex justify-between mt-6">
          <div className="grid grid-cols-2 gap-8">
            {" "}
            <div>
              <h6 className="font-medium text-gray-400">Liên hệ</h6>
              <ul>
                <li className="py-2 text-sm">
                  Hotline: 0984989079 - 0926666563 - 0357724918{" "}
                </li>
                <li className="py-2 text-sm">
                  Email: studywithSTEDU@gmail.com{" "}
                </li>
                <div>
                  <h6 className="font-medium text-gray-400 mt-4 lg:mt-8">
                    Fanpage
                  </h6>
                  <iframe
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100091608865775%26mibextid%3DLQQJ4d&tabs=timeline&width=300&height=130&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=true&appId"
                    width="300"
                    height="130"
                   
                    scrolling="no"
                    frameborder="0"
                    allowfullscreen="true"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  ></iframe>
                </div>
              </ul>
            </div>
            <div>
              <h6 className="font-medium text-gray-400">Thông tin STK</h6>
              <ul>
                <li className="py-2 text-sm">Hồ Lê Anh Thư</li>
                <li className="py-2 text-sm">33888826266868</li>
                <li className="py-2 text-sm">Ngân hàng Quân đội (MB Bank)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t grid items-center justify-center text-center px-2 py-2  text-gray-400">
        <div>Một sản phẩm của HMK Team</div>
        <div>
          Liên hệ:{" "}
          <a
            className="hover:text-white"
            href="https://www.facebook.com/khang.nguyen.230/"
          >
            <FacebookIcon />
          </a>
          <a className="hover:text-white" href="mailto:khangnt020320@gmail.com">
            <EmailIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

export default FootNav;
