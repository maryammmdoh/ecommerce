import React from 'react'

export default function footer() {
    return (
        <>
            <div className='w-full mt-20 h-20 bg-purple-300 dark:bg-slate-800  flex flex-col justify-center items-center'>
                <div className='flex justify-center items-center mb-2'>
                    <ul className='flex gap-6 text-2xl text-white mr-6'>
                        <li><i className="fa-brands fa-facebook text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 cursor-pointer"></i></li>
                        <li><i className='fa-brands fa-instagram text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 cursor-pointer' ></i></li>
                        <li><i className='fa-brands fa-twitter text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 ' ></i></li>
                        <li><i className='fa-brands fa-linkedin text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 cursor-pointer' ></i></li>
                        <li><i className='fa-brands fa-github text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-300 cursor-pointer' ></i></li>
                    </ul>
                </div>
                <div>
                    <h1 className='text-gray-800 dark:text-white text-md'>&copy; 2025 E-commerce. All rights reserved.</h1>
                </div>



            </div>
        </>
    )
}
