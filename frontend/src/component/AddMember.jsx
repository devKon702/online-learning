import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { fetchData, showToastError, showToastMessage } from "../global" 
import { useParams } from "react-router-dom"


export default function AddMember() {
  
  const params = useParams()

  const [email, setEmail] = useState('')

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  };



  const handleInvite = async (event) => {
    event.preventDefault()

    // chuẩn bị data.
    const subUrl = '/groups/invite-users'
    const body = { 
      email, 
      groupId: params.id
    } 
    try {
      await fetchData(subUrl, 'POST', body)
      // nếu không quăng ra lỗi.
      showToastMessage('Gửi lời mời thành công')
    }
    catch (error) {   
      showToastMessage(error.message)
    }
  }

  return (
    <form onSubmit={handleInvite}>
      <label htmlFor="email">
        <p className="font-medium text-slate-700 pb-2">Địa chỉ email</p>
        <input onChange={handleChangeEmail} id="email" name="email" type="email" className="w-full py-2 rounded-lg px-3" placeholder="Enter email address" />
      </label>
      <div className='flex justify-end mt-4'>
        <button type="submit" className='flex items-center gap-x-2 h-10 px-5 text-sm text-center text-white rounded-md bg-blue-500 sm:w-fit hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300'>
          <span className='text-sm'>Gửi lời mời</span>
        </button>
      </div>
      <ToastContainer />
    </form>
  )

}

// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { baseUrl, version } from "../global";
// import {
//   Dialog,
//   DialogPanel,
//   DialogTitle,
//   Transition,
//   TransitionChild,
// } from "@headlessui/react";
// import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
// import { useDispatch, useSelector } from "react-redux";

// const AddMember = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { infoGroup } = useSelector((state) => state.InfoGroupReducer);
//   const [open, setOpen] = useState(false);
//   let [stateDialog, setStateDialog] = useState({
//     title: "",
//     content: "",
//     type: "",
//   });
//   let [stateAddUser, setStateAddUser] = useState({
//     values: {
//       email: "",
//     },
//     errors: {
//       email: "",
//     },
//   });

//   const getInfoGroupById = async () => {
//     console.log(123);
//     try {
//       let token = localStorage.getItem("accessToken");
//       let emailUser = localStorage.getItem("email");

//       const url = baseUrl + "/api/v1/group/detail/" + id;

//       let jsonRp = await fetch(url, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const response = await jsonRp.json();
//       if (!jsonRp.ok) {
//         console.log("vào lỗi");
//         throw new Error(response.message);
//       }
//       console.log(response.data);
//       console.log(456);
//       dispatch({
//         type: GET_INFO_GROUP_ID,
//         payload: response.data,
//       });
//       console.log(456);
//       // setStateGroup(response.data);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
//   // let callBackGetInfoGroup = useCallback(getInfoGroupById, [])
//   useEffect(() => {
//     getInfoGroupById();
//     return () => {};
//   }, []);

//   const handleChangeInputGroup = (e) => {
//     let { value, name } = e.target;
//     console.log(name + ": " + value);

//     let newValue = {
//       ...stateAddUser.values,
//       [name]: value,
//     };

//     let newError = { ...stateAddUser.errors };
//     switch (name) {
//       case "email":
//         // let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//         let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (value.trim() === "") {
//           newError = {
//             ...stateAddUser.errors,
//             [name]: "Tên lớp không được để trống",
//           };
//         } else if (!re.test(value)) {
//           newError = {
//             ...stateAddUser.errors,
//             [name]: "Email không hợp lệ",
//           };
//         } else {
//           newError = {
//             ...stateAddUser.errors,
//             [name]: "",
//           };
//         }
//         break;
//     }
//     setStateAddUser({
//       ...stateAddUser,
//       values: newValue,
//       errors: newError,
//     });
//   };

//   const handleCreateGroup = async () => {
//     let isValid = true;
//     let { values, errors } = stateAddUser;

//     htmlFor (let key in errors) {
//       if (errors[key] !== "") {
//         isValid = false;
//         break;
//       }
//     }
//     console.log(isValid);
//     if (isValid) {
//       let token = localStorage.getItem("accessToken");
//       // let emailUser = localStorage.getItem("email");
//       let data = {
//         email: values.email,
//         groupId: id,
//       };
//       // console.log(values.)
//       console.log(JSON.stringify(data));

//       const url = baseUrl + "/api/v1/group/addUser";
//       let jsonRp = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(data),
//       });

//       const response = await jsonRp.json();
//       if (!jsonRp.ok) {
//         console.log("vào lỗi");
//         //   throw new Error(response.message);
//         setStateDialog({
//           title: "Thông báo lỗi",
//           content: "Người dùng không tồn tại trong hệ thống",
//           type: "ERROR",
//         });
//         setOpen(true);
//       } else {
//         setStateDialog({
//           title: "Thông báo",
//           content:
//             "Đã thêm thành công, đang đợi người dùng xác thực mail để tham gia",
//           type: "SUCCESS",
//         });
//         setOpen(true);
//       }
//     }
//   };

//   return (
//     <div>
//       <label htmlFor="email">
//         <p className="font-medium text-slate-700 pb-2">Địa chỉ email</p>
//         <input
//           id="email"
//           onChange={handleChangeInputGroup}
//           value={stateAddUser.values.email}
//           name="email"
//           type="email"
//           className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
//           placeholder="Enter email address"
//         />
//       </label>
//       {stateAddUser.errors.email === "" ? (
//         ""
//       ) : (
//         <p className="text-ctred">{stateAddUser.errors.email}</p>
//       )}
//       <div className="flex justify-end mt-4">
//         <button
//           className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
//           onClick={() => {
//             handleCreateGroup();
//           }}
//         >
//           Gửi lời mời
//         </button>
//       </div>
//       {/* Dialog */}
//       <Transition show={open}>
//         <Dialog className="relative z-10" onClose={setOpen}>
//           <TransitionChild
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//           </TransitionChild>

//           <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//             <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//               <TransitionChild
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                 enterTo="opacity-100 translate-y-0 sm:scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                 leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//               >
//                 <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
//                   <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
//                     <div className="sm:flex sm:items-start">
//                       {stateDialog.type === "ERROR" ? (
//                         <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
//                           <ExclamationTriangleIcon
//                             className="h-6 w-6 text-red-600"
//                             aria-hidden="true"
//                           />
//                         </div>
//                       ) : (
//                         <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
//                           <ExclamationTriangleIcon
//                             className="h-6 w-6 text-green-600"
//                             aria-hidden="true"
//                           />
//                         </div>
//                       )}
//                       <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
//                         <DialogTitle
//                           as="h3"
//                           className="text-base font-semibold leading-6 text-gray-900"
//                         >
//                           {stateDialog.title}
//                         </DialogTitle>
//                         <div className="mt-2">
//                           <p className="text-sm text-gray-500">
//                             {stateDialog.content}
//                           </p>
//                         </div>
//                       </div>
//                       {/*  */}

//                       {/*  */}
//                     </div>
//                   </div>
//                   <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
//                     {/* <button
//                         type="button"
//                         className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
//                         onClick={() => setOpen(false)}
//                       >
//                         Deactivate
//                       </button> */}
//                     <button
//                       type="button"
//                       className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
//                       onClick={() => setOpen(false)}
//                       data-autofocus
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </DialogPanel>
//               </TransitionChild>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </div>
//   );
// };

// export default AddMember;
