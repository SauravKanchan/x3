import React from "react";

function Fields(props) {
  return (
    <form className='flex justify-center gap-2 mb-2'>
      {props.placeholder && (
        <>
          <div className='w-full'>
            <input
              type='text'
              id='voice-search'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder={props.placeholder}
            />
          </div>
        </>
      )}
      {props.submit && (
        <>
          <button
            type='submit'
            className={`w-full items-center py-1.5 px-2 text-sm font-medium text-white bg-${
              props.color ? props.color : "red"
            }-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          >
            {props.submit}
          </button>
        </>
      )}
    </form>
  );
}

export default Fields;
