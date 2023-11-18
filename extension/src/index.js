const ethers = require("ethers");
let tweets = new Set();
import { ABI, ADDRESS } from "../config";
import form from "./components/form.html";
import button from "./components/button.html";
import input from "./components/input.html";

async function checkIfReactRendered() {
  const tweet_divs = document.querySelectorAll('div[data-testid="tweetText"]');
  if (tweet_divs.length > 0) {
    tweet_divs.forEach(async (tweet_div) => {
      // check tweet_div exists in tweets
      if (!tweets.has(tweet_div)) {
        tweets.add(tweet_div);

        // add popup
        let popup_div = document.createElement("div");
        popup_div.innerHTML = popup;
        tweet_div.appendChild(popup_div);

        // check whether tweet_div.innerText has a https://x3.fyi/id/ link
        if (tweet_div.innerText.includes("https://x3.fyi/id/")) {
          let match = tweet_div.innerText.match(/(x3\.fyi\/id\/(\d+))/);
          let extractedNumber = match ? match[2] : null;

          await window.ethereum.enable();
          let provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(ADDRESS, ABI, provider);
          let data = await contract.getLink(extractedNumber);
          // make a get request to https://gateway.lighthouse.storage/ipfs/
          let response = await fetch(
            "https://gateway.lighthouse.storage/ipfs/" + data[1]
          );
          let selectedABI = await response.json();
          let formcontent = "";
          selectedABI.abi.map((func_abi) => {
            let inputs = ``;
            func_abi.inputs.map((i) => {
              inputs += input
                .replaceAll("$$name$$", i.name)
                .replaceAll("$$function$$", func_abi.name)
                .replaceAll("$$address$$", selectedABI.contract_address);
            });
            let but = button
              .replaceAll("$$name$$", func_abi.name)
              .replaceAll("$$address$$", selectedABI.contract_address);
            formcontent += form
              .replace("$$input$$", inputs)
              .replace("$$button$$", but);
          });
          tweet_div.innerHTML = tweet_div.innerHTML + formcontent;
          selectedABI.abi.map((func_abi) => {
            let button = document.getElementById(
              `x3-${func_abi.name}-${selectedABI.contract_address}`
            );
            button.onclick = async () => {
              let input_values = {};
              func_abi.inputs.map((i) => {
                let input_element = document.getElementById(
                  `x3-${i.name}-${func_abi.name}-${selectedABI.contract_address}`
                );
                input_values[i.name] = input_element.value;
              });

              let contract = new ethers.Contract(
                selectedABI.contract_address,
                selectedABI.abi,
                provider.getSigner()
              );
              window.contract = contract;
              window.func_abi = func_abi;
              window.input_values = input_values;
              window.provider = provider;
              let tx = await contract.functions[func_abi.name](input_values);
              await tx.wait();
              alert("Transaction mined!");
            };
          });
        }
      }
    });
  } else {
    setTimeout(checkIfReactRendered, 100);
  }
}
checkIfReactRendered();
window.addEventListener("scroll", function () {
  checkIfReactRendered();
});
