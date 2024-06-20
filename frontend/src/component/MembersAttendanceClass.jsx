import { useEffect, useState } from "react"
import { useParams, Link  } from "react-router-dom"
import { fetchData } from "../global"





export default function MembersAttendanceClass () { 

  
  const [members, setMembers] = useState()
  const [ower, setOwer] = useState()
  
  const params = useParams()

  async function getMembers() { 
    
    const subUrl = `/groups/${params.id}/members`

    try { 
      const response = await fetchData(subUrl, 'GET')
      setMembers(response.data)
    }
    catch(error) { 
      console.log(error.message)
    }
  }

  useEffect(() => {
    getMembers()
  }, [])
  
  
  return (members && <div>
    {members.length != 0 ?
    (<table className="w-full text-sm text-left rtl:text-right text-gray-500 pb-8 border-separate border-spacing-0 border-spacing-y-4">
       
       {/* <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                vai trò
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Xóa
                            </th>
                      

                           
                        </tr>
                    </thead> */}
        <tbody>

        <tr className= "mt-4 bg-[#F0F6F6]">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap rounded-tl-lg rounded-bl-lg">
                      {localStorage.getItem('email')}
                    </td>
                    <td className="px-6 py-4">
                      <span>Giáo viên</span>
                      <i className="fa-solid fa-key ml-2"></i>
                    </td>
                

                    <td className='px-6 py-4 text-center rounded-tr-lg rounded-br-lg'>
                   

                    </td>
  


                </tr>


            {members.map(member => (
                <tr key={member.id} className= "mt-4 bg-[#EDEFFF]">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap rounded-tl-lg rounded-bl-lg">
                        {member.email}
                    </td>
                    <td className="px-6 py-4">
                        Học sinh
                    </td>
                

                    <td className='px-6 py-4 text-center rounded-tr-lg rounded-br-lg'>
                     <Link className="underline text-red-500"><i className="fa-regular fa-trash-can text-xl"></i></Link>

                    </td>
                    {/* <td className="px-6 py-4 text-center">
                        <i className="fa-solid fa-share text-xl"></i>
                    </td>

                    <td className="px-6 py-4 text-center">
                        <button onClick={() => handleEditDeck(deck.id)} ><i className="fa-regular fa-pen-to-square text-xl"></i>
                        </button>
                    </td>
                    <td onClick={(event) => showPopupDeleteDeck(event, deck.id)} className="px-6 py-4 text-center">
                        <i className="fa-regular fa-trash-can text-xl"></i>
                    </td> */}


                </tr>
            ))}

        </tbody>
    </table>) : (<div>
        <span className='text-sm'>Không có thành viên</span>
    </div>)
    
}

</div>)
}