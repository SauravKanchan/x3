import React from "react";
import Post from "../components/Post";
import Fields from "./Fields";
import { useParams } from "react-router-dom";

function Generated() {
  const { id } = useParams();
  console.log("id", id);
  return (
    <div className='w-full h-screen p-4 center bg-slate-700'>
      <div className='h-fit w-[450px] p-4'>
        <Post abiData={{ abi: [] }} />
      </div>
    </div>
  );
}

export default Generated;
