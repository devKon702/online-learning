import Modal from "react-modal";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../global";
import { useEffect } from "react";

export default function CommentClass() {
  const [isOpenReply, setIsOpenReply] = useState(false);
  const appElement = document.getElementById("root");
  Modal.setAppElement(appElement);
  const params = useParams();

  const [contentComment, setContentComment] = useState("");
  const [contentCommentReply, setContentCommentReply] = useState("");
  const [comments, setComments] = useState([]);

  const [idCommentReply, setIdCommentReply] = useState();

  function handleChangeComment(event) {
    setContentComment(event.target.value);
  }

  function handleChangeContentCommentReply(event) {
    setContentCommentReply(event.target.value);
  }

  async function handleCreateComment() {
    const subUrl = "/comments";
    const body = {
      groupId: params.id,
      parentId: null, // bình luận cấp 1
      content: contentComment,
    };

    try {
      const response = await fetchData(subUrl, "POST", body);
      getComments();
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleCreateCommentReply() {
    const subUrl = "/comments";
    const body = {
      groupId: params.id,
      parentId: idCommentReply,
      content: contentCommentReply,
    };

    try {
      const response = await fetchData(subUrl, "POST", body);
      getComments();
    } catch (error) {
      console.log(error.message);
    }
    setIsOpenReply(false);
  }

  async function getComments() {
    const subUrl = `/comments/groups/${params.id}`;
    try {
      const response = await fetchData(subUrl, "GET");
      setComments(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  function showReplyComment(id) {
    setIdCommentReply(id);
    setIsOpenReply(true);
  }

  useEffect(() => {
    getComments();
  }, []);

  const customStyles = {
    content: {
      width: "400px",
      height: "130px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      outline: "none",
      overflow: "auto",
    },
  };

  return (
    <div>
      <div>
        <textarea
          onChange={handleChangeComment}
          className="w-full p-4"
          name=""
          id=""
        ></textarea>
        <div className="flex justify-end mt-2">
          <button
            onClick={handleCreateComment}
            className="flex items-center gap-x-2 h-9 px-5 text-sm text-center text-white rounded-md bg-green-600 sm:w-fit hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300"
          >
            <span className="text-sm">Gửi</span>
          </button>
        </div>
      </div>

      {/* show comments */}

      {comments &&
        comments.map((comment) => (
          <div key={comment.id} className="flex gap-x-3 mt-4">
            <div className="dropdown-btn h-9 w-9 rounded-full overflow-hidden cursor-pointer">
              <img src="/avatar.avif" className="w-full h-full" alt="" />
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between">
                <div>
                  <span>{comment.user.email}</span>
                  {/* <span className="ml-2 text-sm rounded-lg bg-[#35B69F] text-white px-2 py-[2px]">
                    Giáo viên
                  </span> */}
                </div>
                {/* <span className="text-gray-500 text-sm">12h ago</span> */}
              </div>
              <div className="mt-1 text-gray-500">{comment.content}</div>
              <button
                onClick={() => showReplyComment(comment.id)}
                className="flex gap-x-2 items-center"
              >
                <span className="pb-1">Reply</span>
                <i className="fa-regular fa-message"></i>
              </button>
              {/* comment child */}
              {comment.commentsChild.map((commentChild) => (
                <div key={commentChild.id} className="flex gap-x-3 mt-4">
                  <div className="dropdown-btn h-9 w-9 rounded-full overflow-hidden cursor-pointer">
                    <img src="/avatar.avif" className="w-full h-full" alt="" />
                  </div>

                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <div>
                        <span>{commentChild.user.email}</span>
                        {/* <span className="ml-2 text-sm rounded-lg bg-[#35B69F] text-white px-2 py-[2px]">
                          Giáo viên
                        </span> */}
                      </div>
                      {/* <span className="text-gray-500 text-sm">12h ago</span> */}
                    </div>
                    <div className="mt-1 text-gray-500">
                      {commentChild.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          // comments Child
        ))}
      <Modal
        isOpen={isOpenReply}
        onRequestClose={() => setIsOpenReply(false)}
        contentLabel="Custom Modal"
        style={customStyles}
      >
        <input
          onChange={handleChangeContentCommentReply}
          type="text"
          className="w-full h-9 px-4"
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={handleCreateCommentReply}
            className="flex items-center gap-x-2 h-9 px-5 text-sm text-center text-white rounded-md bg-green-600 sm:w-fit hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300"
          >
            <span className="text-sm">Gửi</span>  
          </button>
        </div>
      </Modal>
    </div>
  );
}

