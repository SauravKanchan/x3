import React, { useEffect, useState } from "react";

function Normal_template({ onValueChange }) {
  let [question, setQuestion] = useState("");
  let [expiry, setExpiry] = useState("");

  useEffect(() => {
    onValueChange({ question, expiry });
  }, [question, expiry]);

  return (
    <div className='bg-slate-600 w-[70%] flex flex-col'>
      <div className='font-medium text-2xl text-white text-center p-3 h-16 w-full'>
        Prediction Template
      </div>
      <div className='w-full h-full flex justify-start flex-col items-start gap-3 p-6'>
        <div className='center gap-3'>
          <label
            htmlFor='first_name'
            className='block mb-2 text-lg font-medium text-gray-900 dark:text-white w-[150px]'
          >
            Question
          </label>
          <input
            type='text'
            id='first_name'
            className='bg-gray-50 border w-[400px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Enter your Question'
            required
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className='center gap-3'>
          <label
            htmlFor='first_name'
            className='block mb-2 text-lg font-medium text-gray-900 dark:text-white w-[150px]'
          >
            Expiry
          </label>
          <input
            type='number'
            id='first_name'
            className='bg-gray-50 border w-[400px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Enter block timestamp in seconds'
            onChange={(e) => setExpiry(e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
}

export default Normal_template;
