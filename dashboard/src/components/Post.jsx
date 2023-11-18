import React, { useEffect } from "react";
import profile from "../assets/images/profile.jpg";
import bluetick from "../assets/images/blue_tick.png";
import menu from "../assets/images/three-dots.svg";
import post from "../assets/images/post_img.jpg";
import chat from "../assets/images/chat_icon.svg";
import repost from "../assets/images/repost_icon.svg";
import like from "../assets/images/heart_icon.svg";
import view from "../assets/images/view_icon.svg";
import bookmark from "../assets/images/bookmark_icon.svg";
import share from "../assets/images/share_icon.svg";
import Fields from "./Fields";

function App(props) {
  useEffect(() => {
    console.log("props", props,props.abiData.abi);
  }, [props.abiData]);
  const icon = [
    {
      img: chat,
      text: "9.9K",
      main_prop:
        "icon-menu flex gap-1 justify-center items-center text-[#65696e] hover:text-[#1d9bf0]",
      imgwrapper_prop:
        "icon w-7 p-1 h-7 rounded-full flex justify-center items-center",
      img_prop: "",
      text_prop: "icon-text text-xs font-normal ",
    },
    {
      img: repost,
      text: "15K",
      main_prop:
        "icon-menu flex gap-1 justify-center items-center text-[#65696e] hover:text-[#1d9bf0]",
      imgwrapper_prop:
        "icon w-7 p-1 h-7 rounded-full flex justify-center items-center",
      img_prop: "",
      text_prop: "icon-text text-xs font-normal ",
    },
    {
      img: like,
      text: "199K",
      main_prop:
        "icon-menu flex gap-1 justify-center items-center text-[#65696e] hover:text-[#1d9bf0]",
      imgwrapper_prop:
        "icon w-7 p-1 h-7 rounded-full flex justify-center items-center",
      img_prop: "",
      text_prop: "icon-text text-xs font-normal ",
    },
    {
      img: view,
      text: "25M",
      main_prop:
        "icon-menu flex gap-1 justify-center items-center text-[#65696e] hover:text-[#1d9bf0]",
      imgwrapper_prop:
        "icon w-7 p-1 h-7 rounded-full flex justify-center items-center",
      img_prop: "",
      text_prop: "icon-text text-xs font-normal ",
    },
  ];

  return (
    <div className='bg-black overflow-hidden rounded-lg min-w-min flex items-center justify-center'>
      <div className=' h-full cursor-pointer text-white w-full gap-3 flex items-start justify-center py-3 pr-4 pl-3'>
        <div className='w-[40px] flex items-center justify-center'>
          <img
            className='profile w-full h-full block rounded-full mt-2'
            src={profile}
          />
        </div>
        <div className='flex flex-col w-full items-center justify-start gap-2'>
          <div className='top flex justify-start items-start h-fit w-full gap-12'>
            <div className='flex items-center justify-center gap-2'>
              <div className='flex flex-col items-start '>
                <div className='name side flex justify-center items-center gap-0.5 '>
                  <div className='name font-semibold hover:underline text-xs'>
                    Elon Musk
                  </div>
                  <div className='blue tick w-4'>
                    <img src={bluetick} className='w-full' />
                  </div>
                  <div className='flex justify-center items-center gap-1 '>
                    <div className='@name text-[#65696e] text-xs'>
                      @elonmusk
                    </div>
                    <div className='bg-[#65696e] rounded-full w-[3px] h-[3px]'></div>
                    <div className='text-[#65696e] hover:underline'>20h</div>
                  </div>
                </div>
                <div className='text text-xs'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
              </div>
            </div>
            <div className='three dots p-2  rounded-full '>
              <img src={menu} className='w-10 h-full ' />
            </div>
          </div>
          <div className='main pic  w-full'>
            <img
              src={post}
              className='h-40 w-full border border-[#65696e] block rounded-xl'
            />
          </div>
          <div className='w-full'>
            <p>
              DogeCoin 🚀: The cryptocurrency that started as a meme and became
              a global sensation! With its friendly Shiba Inu mascot and a
              growing community of believers 🐕💰
            </p>
            {props.abiData?.abi && (
              <>
                {props.abiData.abi.map((func_abi) => (
                  <div className='w-full py-2'>
                    {func_abi.inputs.map((input) => (
                      <Fields placeholder={input.name} />
                    ))}
                    <Fields submit={func_abi.name} />
                  </div>
                ))}
              </>
            )}

            {props.last ? (
              <div className='w-full py-2'>{props.last}</div>
            ) : null}
          </div>
          <div className='bottom menu flex gap-1 justify-between items-center w-full'>
            {icon.map((iconItem, index) => (
              <div key={index} className={iconItem.main_prop}>
                <div className={iconItem.imgwrapper_prop}>
                  <img src={iconItem.img} />
                </div>
                <div className={iconItem.text_prop}>{iconItem.text}</div>
              </div>
            ))}
            <div className='icon-menu flex gap-1 justify-center items-center'>
              <div className='icon w-5 h-5 rounded flex justify-center items-center'>
                <img src={bookmark} className=' w-[90%]' />
              </div>
              <div className='icon w-5 h-5 rounded flex justify-center items-center'>
                <img src={share} className=' w-[90%]' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
