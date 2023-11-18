import React, { useEffect } from "react";
import side from "../assets/images/login_img.jpg";
import { Outlet, Link } from "react-router-dom";
import { useWeb3Modal } from "@web3modal/ethers5/react";
import { useWeb3ModalSigner } from "@web3modal/ethers5/react";

function Login() {
  const { open } = useWeb3Modal();
  const { signer } = useWeb3ModalSigner();

  useEffect(() => {
    if (signer) {
      window.signer = signer;
      document.location.href = document.location.origin + "/user/dashboard";
    }
  }, [signer]);
  return (
    <div className='w-full h-screen center'>
      <div className='w-1/2 p-11 h-full center'>
        <div className='center gap-5  flex-col text-center'>
          <div className='mb-7 center flex-col gap-3'>
            <div className='font-bold text-4xl'>
              <span className='bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 inline-block text-transparent bg-clip-text'>
                X3
              </span>{" "}
              Supercharge your Twitter Post
            </div>
            {/* <div className='text-2xl'>
              <span className='bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 inline-block text-transparent bg-clip-text'>
                Super-Charge
              </span>
              <span>🚀 your Twitter Post</span>
            </div> */}
          </div>
          <div className='center gap-3 justify-evenly w-full'>
            <button
              type='button'
              className='text-white text-lg bg-blue-700 hover:bg-blue-800 font-medium rounded-lg px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700'
            >
              Install on Chrome
            </button>
            <button
              type='button'
              className='text-white text-lg bg-black-700 hover:bg-black-800 font-medium rounded-lg px-5 py-2 dark:bg-black dark:hover:bg-black-700'
              onClick={() => open()}
            >
              <Link>Log in with Wallet</Link>
            </button>
          </div>
        </div>
      </div>
      <div className='w-1/2 h-full'>
        <img src={side} alt='Demo Image' className='h-full w-full block' />
      </div>
      <Outlet />
    </div>
  );
}

export default Login;
