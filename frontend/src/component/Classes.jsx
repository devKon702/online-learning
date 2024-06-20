import {  useState, useEffect } from 'react'
import { fetchData } from '../global'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Modal from 'react-modal'

const Classes = () => {

  const roles = JSON.parse(localStorage.getItem('roles'))


  const appElement = document.getElementById('root')
  Modal.setAppElement(appElement)
  const [isOpenCreateClass, setIsOpenCreateClass] = useState(false)

  const location = useLocation()


  const stylesModalCreateClass = {
    content: {
      width: '500px',
      height: '310px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      border: '0.5px solid #ccc',
      borderRadius: '8px',
      backgroundColor: 'while',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      outline: 'none',
      overflow: 'auto',
    },
  }



  async function handleCreateClass(event) {
    event.preventDefault()

    const subUrl = '/groups'
    const body = {
      name: nameClassCreate,
      description: decsClassCreate,
    }

    try {
      await fetchData(subUrl, 'POST', body)
    } catch (error) {
      console.log(error.message)
    }
  }


  useEffect(() => {
  }, [])

  return (
    <div>
      <div className='profile flex gap-x-3 items-center justify-end font-medium pb-2'>
        <div className='flex gap-x-8 items-center'>
          <button className=''>
            <img
              onClick={() => setIsOpenCreateClass(true)}
              src='/plus.png'
              className='w-9'
              alt=''
            />
          </button>
          <div className='max-w-md mx-auto'>
            <div className='relative'>
              <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                <svg
                  className='w-4 h-4 text-gray-500'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                  />
                </svg>
              </div>
              <input
              
                type='search'
                id='decks-search'
                className='block w-full  px-4 h-10 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
                placeholder='Tên, mô tả...'
              />
            </div>
          </div>
        </div>
      </div>

      <hr className='my-4'></hr>

      
        <div className=''>
          <div className='relative overflow-x-auto sm:rounded-lg'>
            <div>
              <div className=''>
                <ul className='flex gap-x-24'>
                  <li className='font-medium flex gap-x-2'>
                    <Link
                      className={
                        location.pathname.includes('classes/owner')
                          ? 'link-active'
                          : ''
                      }
                      to={'/classes/owner'}
                    >
                      <span>Lớp học của bạn</span>
                      {!roles.includes('TEACHER') && (
                        <i class='fa-solid fa-lock text-black ml-2'></i>
                      )}
                    </Link>
                  </li>

                  <li className='font-medium flex gap-x-2'>
                  <Link
                      className={
                        location.pathname.includes('classes/attendance')
                          ? 'link-active'
                          : ''
                      }
                      to={'/classes/attendance'}
                    >
                      Tham gia lớp học
                    </Link>
                  </li>
                </ul>

                <div className='py-12'>
                  <Outlet />
                </div>
              </div>
            </div>
          </div>

        </div>


      <Modal
          isOpen={isOpenCreateClass}
          onRequestClose={() => setIsOpenCreateClass(false)}
          contentLabel='Custom Modal'
          style={stylesModalCreateClass}
        >
          <form onSubmit={handleCreateClass} className=''>
            <div className='flex justify-end'>
              <button onClick={() => setIsOpenCreateClass(false)} type='button'>
                <img src='/close.png' className='w-5 h-5' alt='' />
              </button>
            </div>
            <h3 className='text-xl text-gray-800'>Tạo bài tập</h3>

            <div className='mt-6'>
              <div className='flex flex-col gap-y-2 w-full'>
                <label className='text-sm text-gray-600' htmlFor=''>
                  Tên
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type='text'
                  className='h-9 px-4'
                  required
                />
              </div>

              <div className='flex flex-col gap-y-2 w-full'>
                <label className='text-sm text-gray-600' htmlFor=''>
                  Mô tả
                </label>
                <input
                  onChange={(e) => setDesc(e.target.value)}
                  type='text'
                  className='h-9 px-4'
                  required
                />
              </div>
            </div>

          
            <div className='flex justify-end mt-4'>
              <button
                type='submit'
                className='h-10 flex items-center gap-x-2 px-8 text-sm text-center text-white font-bold rounded-md bg-primary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300'
              >
                Tạo
              </button>
              </div>
          </form>
        </Modal>

    </div>
  )
}
export default Classes
