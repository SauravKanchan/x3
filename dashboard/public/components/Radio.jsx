import React from "react";

function Radio(props) {
  return (
    <div className='flex items-center min-w-fit'>
      <input
        type='radio'
        value={props.value || ""}
        onChange={props.onchange}
        name={props.name || ""}
        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600'
        checked={props.checked}
        index={props.index}
      />
      <label className='ml-2 text-l font-medium text-gray-900 dark:text-gray-300 p-1'>
        {props.content}
      </label>
    </div>
  );
}

export default Radio;
