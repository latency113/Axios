import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Chapter = () => {
  const params = useParams();
  const id = params.id;
  // ยิง api ไป get chapter ยังไง?
  const [data, setData] = useState([]);
  const callApi = async () => {
    const res = await axios.get(
      "https://api.codingthailand.com/api/course/" + id
    );
    console.log(res);
    const data_format = await res.data.data;
    // เก็บข้อมูลที่อ่านได้ใส่ State
    setData(data_format);
  };
  useEffect(() => {
    //call api เมื่อมีการเปิด component ครั้งแรก
    callApi();
    console.log(data);
  }, []);
  return (
    <>
    <h1>Chapter {id}</h1>
    <hr />
    {
      data.map((c) => (
        <CourseCard key={c.course_id} {...c}/>
      ))
    }
    </>
  );
};
const CourseCard = (props) => {
  return (
    <div>
      <div className="bg-red-500">{props.ch_title}</div>
      <iframe width="560" height="315" src={"https://www.youtube.com/embed/"+ props.ch_url}  ></iframe>
      <div>{props.ch_view}</div>
      <div>{props.ch_timetotal}</div>
    </div>
  );
}
export default Chapter;