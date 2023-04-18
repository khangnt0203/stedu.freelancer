import React from "react";

function FootNav(props) {
  return (
    <div className="text-white bg-gray-900">
      <div className="max-w-[1440px] mx-auto py-16 px-4 grid lg:grid-cols-4 lg:gap-8 gap-2 ">
        <div className="col-span-4 lg:col-span-2">
          <h1 className="  w-full text-3xl font-bold text-[#F8E000]">STEDU</h1>
          <p className="py-4">
            STEDU là đơn vị trực thuộc công ty TNHH TTA – là một nền tảng cung
            cấp nhiều lớp học nhỏ trực tuyến giữa sinh viên giỏi muốn trải
            nghiệm giảng dạy và học sinh yếu kém có nhu cầu học kèm.
          </p>
          <div className="flex justify-between md:w-[75%] my-6">
            {/* <FaFacebookSquare size={30} />
              <FaInstagram size={30} />
              <FaTwitterSquare size={30} />
              <FaGithubSquare size={30} />
              <FaDribbbleSquare size={30} /> */}
          </div>
        </div>
        <div className="lg:col-span-2 col-span-4 flex justify-between mt-6">
          <div>
            <h6 className="font-medium text-gray-400">Đăng ký</h6>
            <ul>
              <li className="py-2 text-sm">Học viên</li>
              <li className="py-2 text-sm">Gia sư</li>
            </ul>
          </div>
          <div>
            <h6 className="font-medium text-gray-400">Hổ trợ</h6>
            <ul>
              <li className="py-2 text-sm">Email</li>
              <li className="py-2 text-sm">Số điện thoại</li>
              <li className="py-2 text-sm">Địa chỉ</li>
            </ul>
          </div>
          <div>
            <h6 className="font-medium text-gray-400">Tìm kiếm</h6>
            <ul>
              <li className="py-2 text-sm">Thông tin</li>
              <li className="py-2 text-sm">Khoá học</li>
              <li className="py-2 text-sm">Giới thiệu</li>
            </ul>
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default FootNav;
