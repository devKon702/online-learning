import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { fetchData } from "../global";

export default function MembersClass() {
  const location = useLocation();

  const [group, setGroup] = useState()


  const params = useParams();

  async function getMembers() {
    const subUrl = `/groups/detail/${params.id}`

    // gọi xuống group
  

    try {
      const response = await fetchData(subUrl, "GET");
      setGroup(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getMembers();
  }, []);

  return (
    group && (
      <div>
        {group.userGroups.length != 0 ? (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 pb-8 border-separate border-spacing-0 border-spacing-y-4">
           
            <tbody>
              <tr className="mt-4 bg-[#F0F6F6]">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap rounded-tl-lg rounded-bl-lg"
                >
                  {group.owner.email}
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold">Giáo viên</span>
                  <i className="fa-solid fa-key ml-2"></i>
                </td>

                <td className="px-6 py-4 text-center rounded-tr-lg rounded-br-lg"></td>
              </tr>

              {group.userGroups.map((member, index) => (
                <tr key={index} className="mt-4 bg-[#EDEFFF]">
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap rounded-tl-lg rounded-bl-lg"
                  >
                    {member.email}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold">Học sinh</span>
                    <i class="fa-regular fa-user ml-3"></i>
                   </td>

                  {
                    location.pathname.includes('owner')  ? (<td className="px-6 py-4 text-center rounded-tr-lg rounded-br-lg">
                    <Link className="underline text-red-500">
                      <i className="fa-regular fa-trash-can text-xl"></i>
                    </Link>
                  </td>) : <td></td>
                  }
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <span className="text-sm">Bạn chưa thêm học sinh</span>
          </div>
        )}  
      </div>
    )
  );
}
