import React, { useEffect, useRef, useState } from "react";
import { baseUrl, version } from "../global";
import Fail from "./Fail";
import Success from "./Success";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { data } from "autoprefixer";
import { useParams } from 'react-router-dom';
// import React from "react";

const EditClass = () => {
  const { id } = useParams();
	let [stateGroup, setStateGroup] = useState({
		values: {
			nameGroup: '',
			descGroup: ''
		},
		errors: {
			nameGroup: '',
			descGroup: ''
		}
	});

    const getInfoGroupById = async (groupId) => {
        try {
            let token = localStorage.getItem("accessToken");
            let emailUser = localStorage.getItem("email");

            const url = baseUrl + '/api/v1/group/' + groupId;
            
            let jsonRp = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            const response = await jsonRp.json()
            if (!jsonRp.ok) {
                console.log("vào lỗi")
                throw new Error(response.message)
            }
            console.log(response.data);
            let {name, description} = response.data;
            console.log(description);
            setStateGroup({
                ...stateGroup,
                values: {
                    nameGroup: name,
                    descGroup: description
                }
            })

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getInfoGroupById(id)
        return () => {
            
        };
    }, []);

	const navigate = useNavigate();

	const handleChangeInputGroup = (e)=> {
		let {value, name} = e.target;
		console.log(name + ": " + value);

		let newValue = {
			...stateGroup.values, [name]: value
		}

		let newError = {...stateGroup.errors}
		switch (name){
			case 'nameGroup':
				if (value.trim() === '') {
					newError = {
						...stateGroup.errors, [name]: 'Tên lớp không được để trống'
					}
				} else {
					newError = {
						...stateGroup.errors, [name]: ''
					}
				}
		}


		setStateGroup({
			...stateGroup,
			values: newValue,
			errors: newError
		});
	}

	const handleCreateGroup = async ()=>{
		let isValid = true;
		let {values, errors} = stateGroup;
		console.log('---')
		console.log(errors)
		for(let key in errors) {
			if (errors[key] !== '') {
				isValid = false;
				break;
			}
		}
		console.log(isValid)
		if (isValid) {
			let token = localStorage.getItem("accessToken");
			let emailUser = localStorage.getItem("email");
			let data = {
                id: id,
				name: values.nameGroup,
				description: values.descGroup,
				email: emailUser,
			}

			console.log(JSON.stringify(data))

			const url = baseUrl + '/api/v1/group';
			let jsonRp = await fetch(url, {
        method: "PUT",
        headers: {
					"Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
				body: JSON.stringify(data)
      });

      const response = await jsonRp.json();
      if (!jsonRp.ok) {
        console.log("vào lỗi");
        throw new Error(response.message);
      }
			navigate('/classes')

		}
	}

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex items-center justify-between p-4 w-full max-w-2xl max-h-full">
        <Link
          to={"/classes"}
          className="flex items-center justify-between gap-x-3 cursor-pointer text-blue-600 underline"
        >
          <img className="w-5 h-5" src="../../public/back.png" alt="" />
          <span>Danh sách lớp</span>
        </Link>
        <h3 className="font-medium text-gray-900">Chỉnh sửa lớp</h3>
      </div>

      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="p-4 md:p-5 space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Tên lớp <span className="text-ctred">*</span>
              </label>
              <input
								value={stateGroup.values.nameGroup}
								onChange={handleChangeInputGroup}
								name="nameGroup"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="English"
                required
              />
							{stateGroup.errors.nameGroup === '' ? '' : <p className="text-ctred">{stateGroup.errors.nameGroup}</p>}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Mô tả lớp
              </label>
              <input
								value={stateGroup.values.descGroup}
								onChange={handleChangeInputGroup}
								name="descGroup"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
          </div>
          <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
            <button
              type="button"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
							onClick={()=> {handleCreateGroup()}}
						>
              Chỉnh sửa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditClass;

// function CreateClass() {

//     return <div className='flex justify-center items-center flex-col'>
// <div className='flex items-center justify-between p-4 w-full max-w-2xl max-h-full'>
//             <Link to={"/classes"} className='flex items-center justify-between gap-x-3 cursor-pointer text-blue-600 underline'>
//                 <img className='w-5 h-5' src="../../public/back.png" alt="" />
//                 <span>Danh sách lớp</span>
//             </Link>
//             <h3 className="font-medium text-gray-900">
//                 Tạo lớp
//             </h3>
//         </div>

//         <div className="relative p-4 w-full max-w-2xl max-h-full">
//             <div className="relative bg-white rounded-lg shadow">

//                 <div className="p-4 md:p-5 space-y-4">
//                     <div>
//                         <label className="block mb-2 text-sm font-medium text-gray-900">Tên lớp <span className='text-ctred'>*</span></label>
//                         <input type="text"className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="English" required />
//                     </div>
//                     <div>
//                         <label className="block mb-2 text-sm font-medium text-gray-900">Mô tả lớp</label>
//                         <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
//                     </div>
//                 </div>
//                 <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
//                     <button  type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Tạo</button>
//                 </div>
//             </div>
//         </div>
//     </div>
// }

// export default CreateClass
