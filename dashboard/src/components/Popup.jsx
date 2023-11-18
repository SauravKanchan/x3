import React from 'react'

function Popup() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 w-full backdrop-blur-sm center ">
      <div className="bg-white p-10 rounded w-fit text-lg center gap-4 flex-col">
        <div className=" font-semibold text-center text-2xl text-gray-700 w-full">Here is your supercharged twitter post :</div>
        <div className='w-full text-center text-lg text-blue-500 underline-offset-1' >https://www.example.org/</div>
        <div className='w-full text-center font-medium text-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 inline-block text-transparent bg-clip-text'>Just copy the above link and see the magic happens</div>
      </div>
    </div>
  )
}

export default Popup