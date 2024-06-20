import { useEffect, useState } from "react"
import { fetchData, showToastMessage } from "../global"
import { Link } from "react-router-dom"


export default function OwnerClasses() {

    const [ownerClasses, setOwnerClasses] = useState()

    const roles = JSON.parse(localStorage.getItem("roles"))

    async function getOwnerClass() {
        const subUrl = `/groups/owner`
        try {
            const response = await fetchData(subUrl, 'GET')
            console.log(response.data)
            setOwnerClasses(response.data)
        }
        catch (error) {
            console.log(error.code + ' ' + error.message)
        }
    }

    async function handleDeleteClass(id) { 
        const subUrl = `/groups/${id}`
        await fetchData(subUrl, 'DELETE')
        getOwnerClass()
    }

    useEffect(() => {
        if (roles.includes('TEACHER')) {
            getOwnerClass()
        }
    }, [])

    function renderUnlockedUser() { 
        return <div className="flex items-center justify-center flex-col gap-y-3">
             <h1 className="text-3xl font-bold text-center">Online learning - Dành cho giáo viên</h1>

            <div className="flex justify-center">
            <button className='gap-x-2 flex items-center h-10 px-8 text-sm text-center rounded-md font-bold bg-yellow-400 sm:w-fit hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-200'>
                    
                    <span className='text-sm'>Mua</span>
                    <i className="fa-solid fa-unlock"></i>
                </button>
                </div>
  
        </div>
    }



    return ownerClasses ? (<div>
        {ownerClasses.length != 0 ?
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
                            Chi tiết
                        </th>
                        <th className='text-center'>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {ownerClasses.map((ownerClass, index) => (
                        <tr key={index} className="mt-4 bg-[#EDEFFF]">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap rounded-tl-lg rounded-bl-lg">
                                {ownerClass.name}
                            </td>
                            <td className="px-6 py-4">
                                {ownerClass.quantity} thành viên
                            </td>
                            <td className="px-6 py-4">
                                <Link to={'/classes/detail-owner/' + ownerClass.id + '/members'} className="underline text-blue-500">Chi tiết</Link>
                            </td>
                            <td className='px-6 py-4 text-center rounded-tr-lg rounded-br-lg'>
                                <button onClick={() => handleDeleteClass(ownerClass.id)} className="underline text-red-500"><i className="fa-regular fa-trash-can text-xl"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>) : (<div>
                <span className='text-sm'>Bạn chưa tạo lớp nào</span>
            </div>)
        }
    </div>) : (renderUnlockedUser())
}