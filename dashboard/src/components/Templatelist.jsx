import React from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CloudDoneRoundedIcon from "@mui/icons-material/CloudDoneRounded";
import { Link } from "react-router-dom";

let data = [
  {
    icon: <CloudDoneRoundedIcon />,
    name: "ABI Parser",
    link: "/user/templateabi",
    description: "Parse any abi on twitter",
  },
  {
    icon: <CloudDoneRoundedIcon />,
    name: "Ticketing",
    link: "/user/templatenormal",
    description: "Lorem, ipsum dolor sit",
  },
];

function Templatelist() {
  return (
    <div className='max-h-full min-h-[calc(100vh-5rem)] w-full flex items-start p-5 flex-col gap-5 bg-slate-500'>
      <div className='center gap-3'>
        <Link to='/user/dashboard'>
          <div className='icon text-white rounded-full h-10 w-10 bg-blue-400 center'>
            <ArrowBackRoundedIcon color='white' />
          </div>
        </Link>
        <span className='font-medium text-2xl p-2 text-white'>
          Select templates
        </span>
      </div>
      <ul className='center gap-3 flex-wrap'>
        {data.map((item, index) => (
          <Link to={item.link} key={index}>
            <li className='flex gap-2 flex-col w-[300px] p-5 cursor-pointer card'>
              <div className='center gap-3 justify-start'>
                <div className='p-2 rounded-full bg-slate-400 w-fit'>
                  {item.icon}
                </div>
                <div className='p-2 font-medium text-lg tracking-wide'>
                  {item.name}
                </div>
              </div>
              <p>{item.description}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Templatelist;
