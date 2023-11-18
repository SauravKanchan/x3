import React from "react";

function Select(props) {
  return (
    <div className='w-full center gap-2'>
      <select
        id='countries'
        className='bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none'
        defaultValue=''
        onChange={props.onchange}
      >
        <option value='' disabled>
          {props.placeholder}
        </option>
        {props.data.map((item, index) => (
          <option key={index} value={item.chainId}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
