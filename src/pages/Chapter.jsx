import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Chapter = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null); // State สำหรับตอนที่เลือก

  const callApi = async () => {
    const res = await axios.get("https://api.codingthailand.com/api/course/" + id);
    const data_format = await res.data.data;
    setData(data_format);
  };

  useEffect(() => {
    callApi();
  }, [id]);

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-700 flex justify-center min-h-screen gap-5">
      <div className="">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent text-center p-10">คลิปวิดิโอการสอน</h1>
        
  
        <div className="grid grid-cols-1 justify-center gap-1">
          {data.map((c) => (
            <button
              key={c.ch_id}
              onClick={() => setSelectedChapter(c)}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:to-indigo-500 hover:from-pink-500 text-white shadow-none transition-shadow duration-300 hover:shadow-lg hover:shadow-gray-400 rounded-full p-4"
            >
              {c.ch_title}
            </button>
          ))}
        </div>


      </div>
        <div className="flex justify-center mt-[120px]">        
          {selectedChapter && (
              <div className="mt-10">
                <CourseCard {...selectedChapter} />
                <NavLink to="/"><button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:to-indigo-500 hover:from-pink-400 px-5 p-2 mt-5 shadow-none transition-shadow duration-300 hover:shadow-lg hover:shadow-gray-400 text-white rounded-xl flex"><svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
                </svg>
                กลับไปหน้าแรก
                  </button>
                </NavLink>
              </div>
          )}
        </div>


    </div>
  );
};

const CourseCard = (props) => {
  return (
    <div className="bg-blue-500 rounded-lg p-5 text-white">

      <div className="text-xl">
        <div className="mb-2 text-2xl">{props.ch_title}</div>
        <iframe
          className="rounded-lg"
          width="720"
          height="450"
          src={"https://www.youtube.com/embed/" + props.ch_url}
        ></iframe>
        <div className="flex justify-between mt-2">
          <div>
            <p>{props.ch_view.toLocaleString()} View</p>
          </div>
          <div>
            <p>{props.ch_timetotal} Time</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Chapter;
