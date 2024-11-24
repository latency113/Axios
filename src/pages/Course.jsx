import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Course = () => {
  const [data, setData] = useState([]);

  const callApi = async () => {
    const res = await axios.get("https://api.codingthailand.com/api/course");
    const data_format = await res.data.data;

    // เก็บข้อมูลทราอ่านได้ใส่ State
    setData(data_format);
  };

  //
  useEffect(() => {
    //call api เมื่อมีการเปิด component ครั้งแรก
    callApi();
  }, []);

  return (
    <div className="bg-gray-100 flex justify-center min-h-screen">
      <div className="">
          <h1 className="bg-blue-500 text-white rounded-xl mt-3 text-center p-5 text-4xl">หลักสูตรการสอนทั้งหมด</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-7 md:w-[880px] lg:w-[1280px] [400px]">
          {
            data.map((course) => (
              <CourseCard key={course.id} {...course}/>
            ))
          }
          </div>
      </div>
    </div>
  );
};

const CourseCard = (props) => {
  return (
    <div className="bg-white rounded-xl min-vh-screen shadow-lg">
      <div className="p-2">
        <div className="w-full h-30 sm:h-42 md:h-50 lg:h-60 overflow-hidden rounded-t-lg">
          <img src={props.picture} alt="" className="rounded-y-2xl w-full h-full object-cover"/>
        </div>
        <div className="text-xl py-2">{props.title}</div>
        <div className="text-md pb-2">{props.detail}</div>
      </div>

      
      <div className="flex justify-center items-end p-3 ">
        <button className="bg-blue-500 hover:bg-blue-700 text-white text-center p-2 text-lg rounded-lg w-1/2"><NavLink to={'/course/'+props.id}>เนื้อหาในหลักสูตร</NavLink></button>
      </div>


    </div>
  );
}
export default Course;
