const ethers = require("ethers");
let tweets = new Set();
let profile_page_url = new Set();
let others_profile_url = new Set();
import { ABI, ADDRESS } from "../config";
import form from "./components/form.html";
import button from "./components/button.html";
import input from "./components/input.html";
import attest from "./components/attest.html";

async function checkIfReactRendered() {
  const tweet_divs = document.querySelectorAll('div[data-testid="tweetText"]');
  await window.ethereum.enable();
  let provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(ADDRESS, ABI, provider);
  if (tweet_divs.length > 0) {
    tweet_divs.forEach(async (tweet_div) => {
      // check tweet_div exists in tweets
      if (!tweets.has(tweet_div)) {
        tweets.add(tweet_div);

        // check whether tweet_div.innerText has a https://x3.fyi/id/ link
        if (tweet_div.innerText.includes("http://localhost:3000/id/")) {
          let match = tweet_div.innerText.match(/(localhost:3000\/id\/(\d+))/);
          let extractedNumber = match ? match[2] : null;

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

  let profile_page = document.querySelector(
    "#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-kemksi.r-1kqtdi0.r-1ljd8xs.r-13l2t4g.r-1phboty.r-16y2uox.r-1jgb5lz.r-11wrixw.r-61z16t.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div:nth-child(3) > div > div > div > div > div.css-1dbjc4n.r-1habvwh.r-18u37iz.r-1w6e6rj.r-1wtj0ep > div.css-1dbjc4n.r-obd0qt.r-18u37iz.r-1w6e6rj.r-1h0z5md.r-dnmrzs > a"
  );

  let others_profile = document.querySelector(
    "#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-kemksi.r-1kqtdi0.r-1ljd8xs.r-13l2t4g.r-1phboty.r-16y2uox.r-1jgb5lz.r-11wrixw.r-61z16t.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div:nth-child(3) > div > div > div > div > div.css-1dbjc4n.r-1habvwh.r-18u37iz.r-1w6e6rj.r-1wtj0ep > div.css-1dbjc4n.r-obd0qt.r-18u37iz.r-1w6e6rj.r-1h0z5md.r-dnmrzs > div:nth-child(2) > div.css-1dbjc4n.r-6gpygo > div"
  );

  // check whether url has been visited before
  // if (!page.has(window.location.href)) {
  if (!profile_page_url.has(window.location.href)) {
    if (profile_page) {
      profile_page_url.add(window.location.href);
      console.log("profile page");
    }
  }
  if (!others_profile_url.has(window.location.href)) {
    if (others_profile) {
      others_profile_url.add(window.location.href);
      console.log("others profile page");
      let follow_div = document.querySelector(
        "#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-kemksi.r-1kqtdi0.r-1ljd8xs.r-13l2t4g.r-1phboty.r-16y2uox.r-1jgb5lz.r-11wrixw.r-61z16t.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div:nth-child(3) > div > div > div > div > div.css-1dbjc4n.r-1habvwh.r-18u37iz.r-1w6e6rj.r-1wtj0ep > div.css-1dbjc4n.r-obd0qt.r-18u37iz.r-1w6e6rj.r-1h0z5md.r-dnmrzs"
      );
      follow_div.innerHTML = follow_div.innerHTML + attest;
      document.getElementById("x3-attest").onclick = async () => {
        console.log("attest", contract);
      };
    }
  }
}
checkIfReactRendered();
window.addEventListener("scroll", function () {
  checkIfReactRendered();
});
