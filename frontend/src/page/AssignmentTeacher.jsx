import { useEffect, useState } from "react"
import { Outlet, useParams } from "react-router-dom"
import {fetchData} from "../global"
import { Link, useLocation } from "react-router-dom"

export default function AssignmentTeacher() {

    const params = useParams()
    const location = useLocation()

    return <div className='mx-4 md:mx-24 mt-28'>
    { 
        location.pathname.includes('teacher') &&   <nav className="font-medium flex gap-x-3">
        <Link to={`/teacher/classes/${params.idClass}/assignments/${params.idAssignment}`}>Bài tập</Link>|
        <Link to={`/teacher/classes/${params.idClass}/assignments/${params.idAssignment}/submits`}>Nộp bài</Link>
    </nav>
    }
      
        <div className="mt-6">
        <Outlet></Outlet>
        </div>
        
    </div> 
}