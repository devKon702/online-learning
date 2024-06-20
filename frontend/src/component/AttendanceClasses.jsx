import { useState, useEffect  } from "react"
import { Link } from "react-router-dom"
import { fetchData } from "../global"
export default function AttendanceClass() { 
     const [attendanceClasses,  setAttendanceClasses] = useState() 


    
    async function getAttendanceClass() { 
        const subUrl = `/groups/attendance`
        try { 
            const response = await fetchData(subUrl, 'GET')
            console.log(response.data)
            setAttendanceClasses(response.data)
        }
        catch(error){ 
            console.log(error.code + ' ' + error.message)
        }
    }


    useEffect(() => {
        getAttendanceClass()
    }, [])



    
    return (attendanceClasses && <div>
        {attendanceClasses.length != 0 ?
        (<table className="w-full text-sm text-left rtl:text-right text-gray-500 pb-8 border-separate border-spacing-0 border-spacing-y-4">
           
           <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Tên
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Số thành viên
                                </th>
                                <th scope="col" className="px-6 py-3">
                                </th>                       
                            </tr>
                        </thead>
            <tbody>
                {attendanceClasses.map(attendanceClass => (
                    <tr key={attendanceClass.id} className= "mt-4 bg-[#EDEFFF]">
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap rounded-tl-lg rounded-bl-lg">
                            {attendanceClass.name}
                        </td>
                        <td className="px-6 py-4">
                            {attendanceClass.quantity} thành viên
                        </td>
                        <td className="px-6 py-4">
                            <Link to={'/classes/detail-attendance/' + attendanceClass.id + '/members'} className="underline text-blue-500">Chi tiết</Link>
                        </td>   
                    </tr>
                ))}

            </tbody>
        </table>) : (<div>
            <span className='text-sm'>Không có dữ liệu</span>
        </div>)
        
    }

    </div>)
}