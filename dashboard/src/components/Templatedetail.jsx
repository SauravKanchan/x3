import React, { useEffect, useState } from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Abi_template from "./Abi_template";
import Normal_template from "./Normal_template";
import { useLocation, useNavigate } from "react-router-dom";
import Post from "../components/Post";
import Popup from "./Popup";
import lighthouse from "@lighthouse-web3/sdk";
import { ethers } from "ethers";
import { ABI, ADDRESS } from "../config";

function Templatedetail() {
  const navigate = useNavigate();
  const [finalData, setFinalData] = useState({});
  const [linkId, setLinkId] = useState("");
  const [question, setQuestion] = useState("");

  const handleBack = async () => {
    navigate("/user/templatelist");
  };

  const [popup, setPopup] = useState(false);

  const handleGenerate = async () => {
    const apiKey = "db9a94b1.e543051d14564794a0087b32fffd42c0";
    const name = "shikamaru"; //Optional
    const response = await lighthouse.uploadText(
      JSON.stringify(finalData),
      apiKey,
      name
    );
    const contract = new ethers.Contract(ADDRESS, ABI, window.signer);
    setLinkId(
      parseInt(await contract.callStatic.createLink(response.data.Hash)) - 1
    );
    const tx = await contract.createLink(response.data.Hash);
    await tx.wait();
    setPopup(!popup);
  };

  const handleABIData = (data) => {
    setFinalData(data);
    if (data.question) {
      setQuestion(data.question);
    }
    console.log("data", data);
  };

  let pathname = useLocation().pathname;

  return (
    <div className='w-full height flex flex-col'>
      <div className='flex w-full height-detail'>
        {pathname === "/user/templateabi" ? (
          <Abi_template onValueChange={handleABIData} />
        ) : (
          <Normal_template onValueChange={handleABIData} />
        )}
        <div
          className={popup ? "block" : "hidden"}
          onClick={() => setPopup(!popup)}
        >
          <Popup linkId={linkId} />
        </div>
        <div className='bg-slate-700 w-[30%] overflow-y-scroll'>
          <div className='font-medium text-white text-2xl text-center p-3 h-16 w-full'>
            Preview
          </div>
          <div className='w-full h-[calc(100vh - 4rem)] flex items-center justify-center'>
            <div className='w-[400px] h-[400px] rounded-lg'>
              <Post question={question} abiData={finalData} />
            </div>
          </div>
        </div>
      </div>
      <div className='bg-slate-500 w-full gap-3 h-20 flex items-center justify-end p-5'>
        <div
          className='button bg-blue-500 text-lg text-white flex items-center gap-2'
          onClick={handleBack}
        >
          <ArrowBackRoundedIcon />
          <div>Back</div>
        </div>
        <div
          className='button bg-red-500 text-lg text-white'
          onClick={handleGenerate}
        >
          Generate
        </div>
      </div>
    </div>
  );
}

export default Templatedetail;
