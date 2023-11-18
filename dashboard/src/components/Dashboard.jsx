import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

function Table() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setData([
          {
            id: 1,
            Name: "example.com",
            Created: "12-01-2004",
            Click: 10,
          },
          {
            id: 2,
            Name: "example.com",
            Created: "12-01-2004",
            Click: 9,
          },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  function handleCopy() {
    console.log("Copy Items");
  }
  function handleEdit() {
    console.log("Edit Items");
  }
  function handleDelete() {
    console.log("Delete Items");
  }

  return (
    <>
      <div className='w-full height p-5 bg-[#64748b]'>
        <div className='w-full'>
          <div className=' w-full h-full relative overflow-y-auto overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead className='h-16 text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 '>
                <tr className='p-3 text-[17px]'>
                  <th scope='col' className='px-6 py-3'>
                    Id
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Name
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Created At
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Click
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    className='bg-white border-b text-center text-lg dark:bg-gray-800 dark:border-gray-700'
                    key={index}
                  >
                    <td className='px-6 py-4'>{item.id}</td>
                    <td className='px-6 py-4 font-medium text-gray-900 whitespace-Editwrap dark:text-white'>
                      {item.Name}
                    </td>
                    <td className='px-6 py-4'>{item.Created}</td>
                    <td className='px-6 py-4'>{item.Click}</td>
                    <td className='px-6 py-4 flex items-center justify-center gap-3'>
                      <a
                        href='#'
                        className=' text-white dark:text-white'
                        onClick={handleCopy}
                      >
                        <ContentCopyIcon />
                      </a>
                      <a
                        href='#'
                        className=' text-blue-600 dark:text-blue-500'
                        onClick={handleEdit}
                      >
                        <EditNoteIcon />
                      </a>
                      <a
                        href='#'
                        className='text-red-600 dark:text-red-500'
                        onClick={handleDelete}
                      >
                        <DeleteOutlineIcon />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Table;
