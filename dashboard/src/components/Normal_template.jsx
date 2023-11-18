import React, { useState } from "react";

function Normal_template() {
  let input = [
    {
      name: "Name",
      placeholder: "Enter your name",
    },
    {
      name: "NFT Address",
      placeholder: "Enter your NFT Address",
    },
    {
      name: "Base Price",
      placeholder: "Enter your Base Price",
    },
  ];
  return (
    <div className="bg-slate-600 w-[70%] flex flex-col">
      <div className="font-medium text-2xl text-white text-center p-3 h-16 w-full">
        Normal Template
      </div>
      <div className="w-full h-full flex justify-start flex-col items-start gap-3 p-6">
        {input.map((item, index) => (
          <div key={index} className="center gap-3">
            <label
              htmlFor="first_name"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white w-[150px]"
            >
              {item.name} :
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border w-[400px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={item.placeholder}
              required
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Normal_template;
