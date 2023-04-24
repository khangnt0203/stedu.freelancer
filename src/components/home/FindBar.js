import React, { useEffect, useState } from "react";
import CourseAPI from "../../utils/course";
import numeral from "numeral";

function FindBar(props) {
  const [data1, setData1] = useState();
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();
  useEffect(() => {
    const fetchDataListCourse = async () => {
      try {
        const response = await CourseAPI.getListCourse("", "", 1, 3);
        setData1(response.data[0]);
        setData2(response.data[1]);
        setData3(response.data[2]);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchDataListCourse();
  }, []);
  const handleClick = (idCourse) => {
    window.location.assign(`/course/${idCourse}`);
  };
  return (
    <section
      className="my-2 xl:py-16 py-8 md:px-8  bg-[#FFD32D] md:my-32 mt-8"
      data-aos="fade-up"
    >
      <div className="text-center font-bold text-2xl lg:text-4xl">
        KHOÁ HỌC NỔI BẬT
      </div>
      <div className="w-full py-[4rem] px-4 bg-[#FFD32D]">
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8">
          {data1 ? (
            <div className="bg-white w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
              <img
                className=" mx-auto mt-[-3rem] bg-white rounded-md"
                src={data1.image}
                alt="/"
              />
              <h2 className="text-2xl font-bold text-center py-8">
                {data1.name}
              </h2>
              <p className="text-center text-4xl font-bold">
                {numeral(data1.price).format("0,0")} VNĐ
              </p>
              <div className="text-center font-medium">
                <p className="py-2  mx-8 ">
                  Gia sư: {data1.teacherName}
                </p>
                {/* <p className="py-2 border-b  mx-8"> {data1.shortDescription}</p> */}
              </div>
              <button
                className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3"
                onClick={() => handleClick(data1.id)}
              >
                Chi tiết
              </button>
            </div>
          ) : null}
          {data2 ? (
            <div className="w-full shadow-xl bg-gray-100 flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300">
              <img
                className=" mx-auto mt-[-3rem] bg-transparent rounded-md"
                alt="/"
                src={data2.image}
              />
              <h2 className="text-2xl font-bold text-center py-8">
                {data2.name}
              </h2>
              <p className="text-center text-4xl font-bold">
                {numeral(data2.price).format("0,0")} VNĐ
              </p>
              <div className="text-center font-medium">
                <p className="py-2  mx-8 ">
                  Gia sư: {data2.teacherName}
                </p>
                {/* <p className="py-2 border-b mx-8">{data2.shortDescription}</p> */}
              </div>
              <button
                className="bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3"
                onClick={() => handleClick(data2.id)}
              >
                Chi tiết
              </button>
            </div>
          ) : null}
          {data3 ? (
            <div className="bg-white w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
              <img
                className=" mx-auto mt-[-3rem] bg-white rounded-md"
                alt="/"
                src={data3.image}
              />
              <h2 className="text-2xl font-bold text-center py-8">
                {data3.name}
              </h2>
              <p className="text-center text-4xl font-bold text-[#085E7D]">
                {numeral(data3.price).format("0,0")} VNĐ
              </p>
              {/* <div className="text-center font-medium">
                <p className="py-2 border-b mx-8 my-8">
                  Gia sư: {data3.teacherName}
                </p>
                <p className="py-2 border-b mx-8">{data3.shortDescription}</p>
              </div> */}
              <button
                className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3"
                onClick={() => handleClick(data3.id)}
              >
                Chi tiết
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default FindBar;
