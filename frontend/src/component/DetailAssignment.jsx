
import { useState, useEffect } from "react"
import {fetchData, showToastMessage, baseUrl, version} from '../global'
import { ToastContainer } from "react-toastify";
import { useParams, useLocation } from "react-router-dom";


export default function DetailAssignment() {
  const params = useParams();
  const location = useLocation()
  const [assignment, setAssignment] = useState()



  async function getTeacherDetailAssignment() {
    console.log(params.idAssignment)
    const subUrl = `/student/assignments/${params.idAssignment}`;

    try {
      const response = await fetchData(subUrl, "GET");
      console.log(response)
      setAssignment(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleSubmit() { 

    const url = `${baseUrl + version}/students/submits`;
    const formData = new FormData()

    const accessToken = localStorage.getItem('accessToken')

    const elFiles = document.getElementById("file");
    const file = elFiles.files[0];
    formData.append("idGroup", params.idClass)
    formData.append("idAssignment", params.idAssignment)
    formData.append("file", file)


    try {
      const jsonRp = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const response = await jsonRp.json();


      if (!jsonRp.ok) {
        throw new Error(response.message);
      }

      showToastMessage("Nộp bài thành công");
      
    } catch (error) {
      console.log(error.message);
    }
  
  }

  useEffect(() => {
    getTeacherDetailAssignment();
  }, []);

  return (
    assignment && (
      <div className="flex flex-col gap-y-6">
        <div className="flex justify-between items-center">
        <div>

        <h3 className="font-medium text-xl text-gray-600">{assignment.name}</h3>
        {
          location.pathname.includes('student') &&  <div className="mt-4">
          <button className="bg-blue-500 text-white font-bold px-2 rounded-md py-1" onClick={handleSubmit}>Nộp bài</button>
          <input className="ml-3" type="file" accept=".pdf" name="" id="file" />
          </div>
        }
       
       
        </div>
        <p className="text-sm">{assignment.deadline} (thời hạn)</p>
        
        </div>
        <p className="text-gray-600 text-sm">{assignment.description}</p>
        <div className="flex justify-center">

        <iframe className="w-[900px] h-screen" src="https://firebasestorage.googleapis.com/v0/b/learn-engl.appspot.com/o/assignment%2F1717510452882-CV%20H%E1%BB%93%20%C4%90%E1%BB%A9c%20Nguy%C3%AAn.pdf?alt=media" title="Iframe Example"></iframe>
        </div>

        {/* cho người dùng nộp bài. */}
        <ToastContainer/>

      </div>
    )
  );
}
