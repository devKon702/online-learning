import { useEffect, useState } from "react";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { fetchData } from "../global";

export default function DetailOwnerClass() {
  const params = useParams();
  const location = useLocation();

  const [detailClass, setDetailClass] = useState();

  async function getDetailClass(id) {
    const subUrl = `/groups/detail/${id}`;
    try {
      const response = await fetchData(subUrl, "GET");
      setDetailClass(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getDetailClass(params.id);
  }, []);

  return (
    detailClass && (
      <div>
        <div className="flex items-center gap-x-3">
          <img className="w-12 h-12" src="/group.png" alt="" />
          <span className="text-xl font-medium">{detailClass.name}</span>
        </div>

        <div className="mt-4">
          <div className="flex gap-x-24">


            {location.pathname.includes("owner") ? (
              <Link
                to={`/classes/detail-owner/${params.id}/members`}
                className="font-medium flex gap-x-2"
              >
                <img src="/group.png" className="w-6" alt="" />
                <span>Thành viên</span>
              </Link>
            ) : (
              <Link
                to={`/classes/detail-attendance/${params.id}/members`}
                className="font-medium flex gap-x-2"
              >
                <img src="/group.png" className="w-6" alt="" />
                <span>Thành viên</span>
              </Link>
            )}

            {location.pathname.includes("owner") && (
              <Link
                to={`/classes/detail-owner/${params.id}/add-member`}
                className="font-medium flex gap-x-2"
              >
                <img src="/plus.png" className="w-6" alt="" />
                <span>Thêm học sinh</span>
              </Link>
            )}

            {location.pathname.includes("owner") ? (
              <Link
                to={`/classes/detail-owner/${params.id}/comments`}
                className="font-medium flex gap-x-2 "
              >
                <img src="/chat.png" className="w-6" alt="" />
                <span>Thảo luận</span>
              </Link>
            ) : (
              <Link
                to={`/classes/detail-attendance/${params.id}/comments`}
                className="font-medium flex gap-x-2"
              >
                <img src="/chat.png" alt="" />
                <span>Thảo luận</span>
              </Link>
            )}

            {location.pathname.includes("owner") ? (
              <Link
                to={`/classes/detail-owner/${params.id}/assignments`}
                className="font-medium flex gap-x-2"
              >
                <img src="/paper.png" className="w-6" alt="" />
                <span>Bài tập</span>
              </Link>
            ) : (
              <Link
                to={`/classes/detail-attendance/${params.id}/assignments`}
                className="font-medium flex gap-x-2"
              >
                <img src="/paper.png" className="w-6" alt="" />
                <span>Bài tập</span>
              </Link>
            )}
          </div>
          <hr className="mt-8" />
          <div className="flex gap-x-20 justify-between py-12">
            <div className="flex-1">
              <Outlet />
            </div>
            <div className="flex flex-col gap-y-3 pr-12 w-96">
              <span className="font-medium">Liên kết mời</span>
              <div className="flex gap-x-3 items-center">
                <span className="text-blue-600 bg-[#F0F6F6] rounded-lg px-2 py-2">
                  onlinelearning.com/invite/a2g2d
                </span>
                <img src="/copy.png" className="w-6 h-6" alt="" />
              </div>
              <span className="font-medium">Chi tiết lớp học</span>
              <div className="flex gap-x-3 items-center">
                <img src="/book.png" className="w-8 h-8" alt="" />
                <span>3 bài tập</span>
              </div>
              <div className="flex gap-x-3 items-center">
                <img src="/group.png" className="w-8 h-8" alt="" />
                <span>2 thành viên</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
