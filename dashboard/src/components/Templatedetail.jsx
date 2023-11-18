import React, { useState } from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Abi_template from "./Abi_template";
import Normal_template from "./Normal_template";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Post from "../components/Post";
import Popup from "./Popup";

function Templatedetail() {
  const navigate = useNavigate();
  
  const handleBack = async () => {
    console.log("Previous");
    navigate("/user/templatelist");
  };

  const [popup, setPopup] = useState(false);

  const handleGenerate = async () => {
    console.log("Generate");
    setPopup(!popup);
  };

  let pathname = useLocation().pathname;

  return (
    <div className="w-full height flex flex-col">
      <div className="flex w-full height-detail">
        {pathname === "/user/templateabi" ? (
          <Abi_template />
        ) : (
          <Normal_template />
        )}
        <div className={popup ? 'block' : 'hidden'} onClick={() => setPopup(!popup)}>
          <Popup />
        </div>
        <div className="bg-slate-700 w-[30%]">
          <div className="ffont-medium text-white text-2xl text-center p-3 h-16 w-full">
            Preview
          </div>
          <div className="w-full h-[calc(100vh - 4rem)] flex items-center justify-center">
            <div className="w-[400px] h-[400px] rounded-lg bg-white">
              <Post />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-500 w-full gap-3 h-20 flex items-center justify-end p-5">
        <div
          className="button bg-blue-500 text-lg text-white flex items-center gap-2"
          onClick={handleBack}
        >
          <ArrowBackRoundedIcon />
          <div>Back</div>
        </div>
        <div
          className="button bg-red-500 text-lg text-white"
          onClick={handleGenerate}
        >
          Generate
        </div>
      </div>
    </div>
  );
}

export default Templatedetail;
