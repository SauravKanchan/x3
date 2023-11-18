import React from "react";
import Post from "../components/Post";
import Fields from "./Fields";

function Generated() {
  return (
    <div className='w-full h-screen p-4 center bg-slate-700'>
      <div className='h-fit w-[450px] p-4'>
        <Post
          last={
            <>
              <Fields placeholder='enter text' />
              <Fields placeholder='enter text' />
              <Fields submit='submit' />
            </>
          }
        />
      </div>
    </div>
  );
}

export default Generated;
