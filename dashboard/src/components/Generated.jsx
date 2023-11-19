import React, { useEffect } from "react";
import Post from "../components/Post";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";
import { ABI, ADDRESS } from "../config";

function Generated() {
  const [abi_data, setAbiData] = useState([]);
  const [question, setQuestion] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const temp_func = async () => {
      await window.ethereum.enable();
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(ADDRESS, ABI, provider);
      let link_data = await contract.getLink(id);
      let url = `https://gateway.lighthouse.storage/ipfs/${link_data[1]}`;
      let response = await fetch(url);
      let data = await response.json();
      if (data.question) {
        setQuestion(data.question);
        return;
      }
      setAbiData(data.abi);
    };
    return temp_func;
  }, [abi_data]);

  return (
    <div className='w-full h-screen p-4 center bg-slate-700'>
      <div className='h-fit w-[450px] p-4'>
        <Post abiData={{ abi: abi_data }} question={question} />
      </div>
    </div>
  );
}

export default Generated;
