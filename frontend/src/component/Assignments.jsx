import { useEffect, useState } from "react";
import { baseUrl, version, fetchData, showToastMessage } from "../global";
import { Link, useParams, useLocation, useNavigate} from "react-router-dom";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";

export default function Assignments() {
  const params = useParams();
  const navigate = useNavigate()
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const location = useLocation();

  const [isOpenCreateAsm, setIsOpenCreateAsm] = useState();

  const [assignments, setAssignments] = useState();

  const accessToken = localStorage.getItem("accessToken");

  async function getAssignments() {
    const subUrl = `/student/assignments?id-group=${params.id}`;
    const responsse = await fetchData(subUrl, "GET");
    console.log(responsse.data);
    setAssignments(responsse.data);
  }
  async function handleCreateAsm(e) {
    e.preventDefault();

    const url = `${baseUrl + version}/teacher/assignments`;

    const elFiles = document.getElementById("file");
    const file = elFiles.files[0];
    const deadline = date + " " + time;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", desc);
    formData.append("idGroup", params.id);
    formData.append("deadline", deadline);
    formData.append("file", file);

    try {
      const jsonRp = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const response = await jsonRp.json();
      await getAssignments();

      if (!jsonRp.ok) {
        throw new Error(response.message);
      }
      setIsOpenCreateAsm(false);
      showToastMessage("Tạo bài tập thành công");
    } catch (error) {
      console.log(error.message);
    }
  }

//   <Link
//   to={`/teacher/classes/${params.id}/assignments/${assignment.id}`}
//   key={index}
  
// >
  
// </Link>

  function getDetailAsm(id) { 
    // chuyển hướng tới .
    if (location.pathname.includes('owner')) { 
      navigate(`/teacher/classes/${params.id}/assignments/${id}`)
    }
    else {
       navigate(`/student/classes/${params.id}/assignments/${id}`)
    }
  } 

  

  useEffect(() => {
    getAssignments();
  }, []);

  const customStyles = {
    content: {
      width: "700px",
      height: "350px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "20px 42px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      outline: "none",
      overflow: "auto",
    },
  };

  return (
    assignments && (
      <div>
        <div className="flex justify-end">
          {location.pathname.includes("owner") && (
            <button
              onClick={() => setIsOpenCreateAsm(true)}
              type="submit"
              className="p-6"
            >
              <img src="/plus.png" className="w-8 h-8" alt="" />
            </button>
          )}
        </div>

        {assignments.map((assignment, index) => {
          return (
            <div
              key={index}
              onClick={() => getDetailAsm(assignment.id)}
              className="cursor-pointer mb-8 shadow-md px-8 py-3 bg-gray-100 flex items-center justify-between"
            >
              <div className="flex items-center gap-x-3">
                <i className="fa-solid fa-file text-xl font-light"></i>
                <span className="opacity-90">{assignment.name}</span>
                <span>({assignment.quantitySubmit} nộp)</span>
              </div>

              <span className="text-xs text-[#6D6E6E]">
                Đã đăng vào {assignment.deadline}
              </span>
            </div>
          );
        })}

        <Modal
          isOpen={isOpenCreateAsm}
          onRequestClose={() => setIsOpenCreateAsm(false)}
          contentLabel="Custom Modal"
          style={customStyles}
        >
          <form onSubmit={handleCreateAsm} className="">
            <div className="flex justify-end">
              <button onClick={() => setIsOpenCreateAsm(false)} type="button">
                <img src="/close.png" className="w-5 h-5" alt="" />
              </button>
            </div>
            <h3 className="text-xl text-gray-800">Tạo bài tập</h3>

            <div className="mt-6 flex gap-x-3 justify-between">
              <div className="flex flex-col gap-y-2 w-full">
                <label className="text-sm text-gray-600" htmlFor="">
                  Tên
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="h-9 px-4"
                  required
                />
              </div>

              <div className="flex flex-col gap-y-2 w-full">
                <label className="text-sm text-gray-600" htmlFor="">
                  Mô tả
                </label>
                <input
                  onChange={(e) => setDesc(e.target.value)}
                  type="text"
                  className="h-9 px-4"
                  required
                />
              </div>
            </div>

            <div className="mt-5 flex gap-x-3 justify-between">
              <div className="flex flex-col gap-y-2 w-full">
                <label className="text-sm text-gray-600" htmlFor="">
                  Ngày
                </label>
                <input
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  className="h-9 px-4"
                  required
                />
              </div>

              <div className="flex flex-col gap-y-2 w-full">
                <label className="text-sm text-gray-600" htmlFor="">
                  Giờ
                </label>
                <input
                  onChange={(e) => setTime(e.target.value)}
                  type="time"
                  className="h-9 px-4"
                  required
                />
              </div>
            </div>
            <div className="mt-6 flex gap-x-3 justify-between items-center">
              <div className="w-full">
                {/* ẩn đi với role student */}
                <button
                  type="submit"
                  className="h-10 flex items-center gap-x-2 px-8 text-sm text-center text-white font-bold rounded-md bg-primary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
                >
                  Tạo
                </button>
              </div>

              <input type="file" name="file" id="file" accept=".pdf" required />
            </div>
          </form>
        </Modal>
        <ToastContainer />
      </div>
    )
  );
}
