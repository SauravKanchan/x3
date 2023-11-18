import React, { useEffect, useState } from "react";
import Select from "./Select";
import Radio from "./Radio";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";

function Abi_template({ onValueChange }) {
  const [dt, setDropt] = useState(null);
  const [abi, setAbi] = useState([]);
  const [selectedABI, setSelectedABI] = useState({});

  const handleERC20Address = (event) => {
    let index = event.target.getAttribute("index");
    if (selectedABI[index] === undefined) {
      setSelectedABI({ ...selectedABI, [index]: {} });
    }
    let temp_abi = { ...selectedABI };
    temp_abi[index]["erc20"] = event.target.value === "erc20";
    setSelectedABI(temp_abi);
  };

  const handleCryptoValue = (event) => {
    let index = event.target.getAttribute("index");
    if (selectedABI[index] === undefined) {
      setSelectedABI({ ...selectedABI, [index]: {} });
    }
    let temp_abi = { ...selectedABI };
    temp_abi[index]["fixed"] = event.target.value === "fixed";
    setSelectedABI(temp_abi);
  };

  const handleTextInputs = (event) => {
    let index = event.target.getAttribute("index");
    // TODO: Most probably redundant code, to be removed afterwards
    if (selectedABI[index] === undefined) {
      setSelectedABI({ ...selectedABI, [index]: {} });
    }
    let temp_abi = { ...selectedABI };
    let text_type = event.target.getAttribute("text_type");
    temp_abi[index][text_type] = event.target.value;
  };

  useEffect(() => {
    let temp = { ...selectedABI };
    let data = {};
    console.log("incoming", temp);
    data["contract_address"] = temp["contract_address"];
    delete temp["contract_address"];
    data["network"] = temp["network"];
    delete temp["network"];
    window.temp = temp;
    data["abi"] = Object.values(temp).map((e) => e.abi);
    console.log("outgoing", data);
    onValueChange(data);
  }, [selectedABI]);

  const selectABI = (event) => {
    let temp_abi;
    if (event.target.checked) {
      temp_abi = {
        ...selectedABI,
        [event.target.id]: { abi: abi[event.target.id] },
      };
      setSelectedABI(temp_abi);
    } else {
      temp_abi = { ...selectedABI };
      delete temp_abi[event.target.id];
      setSelectedABI(temp_abi);
    }
  };

  const upadateABI = (event) => {
    try {
      const wholeABI = JSON.parse(event.target.value);
      // filter wholeABI to only include type: "function" and constant: false
      setAbi(
        wholeABI.filter((abi) => abi.type === "function" && !abi.constant)
      );
    } catch (e) {
      console.error(e);
    }
  };

  const dropdown = [
    {
      name: "Ethereum",
      chainId: 1,
    },
    {
      name: "Base",
      chainId: 84531,
    },
    {
      name: "Arbitrum One",
      chainId: 42161,
    },
    {
      name: "OP Mainnet",
      chainId: 10,
    },
    {
      name: "Scroll",
      chainId: 534352,
    },
    {
      name: "Binance",
      chainId: 56,
    },
    {
      name: "Polygon",
      chainId: 137,
    },
    {
      name: "Fantom",
      chainId: 250,
    },
    {
      name: "Neon EVM",
      chainId: 245022934,
    },
  ];

  return (
    <div className='bg-slate-600 w-[70%] flex flex-col'>
      <div className='font-medium text-2xl text-white text-center p-3 h-16 w-full'>
        ABI Template
      </div>
      <div className='w-full h-full flex p-3 gap-2'>
        <div className='flex flex-col h-full gap-3 w-[30%] px-2 py-0'>
          <div className='w-full h-fit'>
            <Select
              data={dropdown}
              placeholder={"Select a network"}
              onchange={(event) => {
                let temp_abi = { ...selectedABI };
                temp_abi["network"] = event.target.value;
                return setSelectedABI(temp_abi);
              }}
            />
          </div>
          <input
            className='rounded-lg w-full p-3 placeholder-font-medium placeholder-text-lg outline-none pl-2'
            placeholder='Contact address'
            onChange={(event) => {
              let temp_abi = { ...selectedABI };
              console.log(temp_abi);
              temp_abi["contract_address"] = event.target.value;
              return setSelectedABI(temp_abi);
            }}
          />
          <textarea
            className='rounded-lg w-full p-3 placeholder-font-medium placeholder-text-lg outline-none pl-2 h-full'
            placeholder='Paste ABI'
            onChange={upadateABI}
          ></textarea>
        </div>
        <div className='w-[70%] h-full bg-slate-400 rounded-lg flex flex-col gap-3 items-start p-2 overflow-y-auto'>
          {abi.map((item, index) => (
            <div
              key={index}
              className='w-full h-fit flex flex-col bg-slate-700 p-3 rounded-lg'
            >
              <div className='flex justify-between w-full'>
                <span className='text-xl center text-white'>{item.name}</span>
                <div className='w-50 center gap-2 hover:underline text-white'>
                  <div
                    onClick={() => {
                      if (dt == index) {
                        setDropt(null);
                      } else {
                        setDropt(index);
                      }
                    }}
                  >
                    {selectedABI[index] ? (
                      <>
                        <span className='text-white font-medium cursor-pointer'>
                          Advanced
                        </span>
                        <button className='text-white'>
                          {dt == index ? (
                            <ExpandMoreRoundedIcon />
                          ) : (
                            <ExpandLessRoundedIcon />
                          )}
                        </button>
                      </>
                    ) : null}
                  </div>
                  <input
                    id={index}
                    type='checkbox'
                    value=''
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded outline-none dark:bg-gray-700 dark:border-gray-600 pl-2'
                    onClick={selectABI}
                  ></input>
                </div>
              </div>
              {dt == index ? (
                <div className='flex flex-col w-full gap-3 py-2'>
                  <div className='center gap-3 justify-center w-full text-white'>
                    Send crypto along with transaction
                  </div>
                  <div className='center gap-3 justify-start w-full'>
                    <Radio
                      value={"native"}
                      name={"currency"}
                      content={"Native"}
                      onchange={handleERC20Address}
                      checked={
                        selectedABI[index] !== undefined
                          ? selectedABI[index]["erc20"] !== undefined
                            ? !selectedABI[index]["erc20"]
                            : false
                          : false
                      }
                      index={index}
                    />
                    <Radio
                      value={"erc20"}
                      name={"currency"}
                      content={"ERC20"}
                      onchange={handleERC20Address}
                      checked={
                        // selectedABI[index]?.["erc20"]
                        selectedABI[index]
                          ? selectedABI[index]["erc20"] !== undefined
                            ? selectedABI[index]["erc20"]
                            : false
                          : false
                      }
                      index={index}
                    />
                    {selectedABI[index]?.["erc20"] && (
                      <input
                        className='rounded-md w-full placeholder-font-medium placeholder-text-sm p-1 pl-2 outline-none'
                        placeholder='Contract Address'
                        text_type={"contract_address"}
                        onChange={handleTextInputs}
                        index={index}
                      />
                    )}
                  </div>
                  <div className='center gap-3 justify-start w-full'>
                    <Radio
                      value={"variable"}
                      name={"value"}
                      content={"Variable"}
                      onchange={handleCryptoValue}
                      checked={
                        selectedABI[index] !== undefined
                          ? selectedABI[index]["fixed"] !== undefined
                            ? !selectedABI[index]["fixed"]
                            : false
                          : false
                      }
                      index={index}
                    />
                    <Radio
                      value={"fixed"}
                      name={"value"}
                      content={"Fixed"}
                      onchange={handleCryptoValue}
                      checked={
                        selectedABI[index] !== undefined
                          ? selectedABI[index]["fixed"] !== undefined
                            ? selectedABI[index]["fixed"]
                            : false
                          : false
                      }
                      index={index}
                    />
                    {selectedABI[index]?.["fixed"] && (
                      <input
                        className='rounded-md w-full placeholder-font-medium placeholder-text-sm p-1 pl-2 outline-none'
                        placeholder='Value'
                        text_type={"crypto_value"}
                        onChange={handleTextInputs}
                        index={index}
                        type='number'
                      />
                    )}
                  </div>
                  <Select
                    data={item.inputs.filter(
                      (input) => input.type === "uint256"
                    )}
                    placeholder={"Map crypto value to a parameter"}
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Abi_template;
