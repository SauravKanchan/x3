import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useWeb3ModalSigner } from "@web3modal/ethers5/react";
import lighthouse from "@lighthouse-web3/sdk";

function Navbar() {
  let pathname = useLocation().pathname;
  const { signer } = useWeb3ModalSigner();
  const [signerPrev, setSignerPrev] = useState(null);

  useEffect(() => {
    const upload = async () => {

    };
    return () => {
      upload();
    };
  }, []);

  useEffect(() => {
    if (signer != undefined) {
      window.signer = signer;
      setSignerPrev(true);
    } else if (signerPrev && !signer) {
      window.location.href = "/";
    }
  }, [signer]);

  return (
    <>
      <nav className='bg-white border-gray-200 dark:bg-gray-900 h-20'>
        <div className='max-w-screen-2xl center justify-between p-5'>
          <div className='flex items-center'>
            <Link to={"/user/dashboard"} className='text-white'>
              Home
            </Link>
          </div>
          <ul className='center w-fit gap-3'>
            {pathname === "/user/dashboard" ? (
              <Link to='/user/templatelist'>
                <li>
                  <button className='text-white text-lg bg-blue-700 hover:bg-blue-800  font-medium rounded-lg px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700'>
                    Create
                  </button>
                </li>
              </Link>
            ) : null}
            <w3m-button />
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
