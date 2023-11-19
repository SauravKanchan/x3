const ethers = require("ethers");
let tweets = new Set();
let profile_page_url = new Set();
let others_profile_url = new Set();
import {
  ABI,
  ADDRESS,
  EAS_CONTRACT_ADDRESS,
  EAS_UID,
  UMA_CONTRACT_ABI,
  UMA_CONTRACT_ADDRESS,
  UMA_ERC20_CONTRACT_ADDRESS,
} from "../config";
import form from "./components/form.html";
import button from "./components/button.html";
import input from "./components/input.html";
import attest from "./components/attest.html";
import green_tick from "./components/green_tick.html";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";

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
          if (!selectedABI.marketId) {
            selectedABI.marketId =
              "0xf3e56c1350bec09b9c887e667efea27b19c36c05fa817e4b3172fbd1e77455da";
          }
          let formcontent = "";
          if (selectedABI.question) {
            tweet_div.innerHTML = `<p>${selectedABI.question}</p>`;
            formcontent += input
              .replaceAll("$$name$$", "Value")
              .replaceAll("$$function$$", "bet")
              .replaceAll("$$address$$", selectedABI.contract_address);
            formcontent += button
              .replaceAll("$$name$$", "For")
              .replaceAll("$$address$$", selectedABI.contract_address);
            formcontent += button
              .replaceAll("$$name$$", "Against")
              .replaceAll("$$address$$", selectedABI.contract_address);
            tweet_div.innerHTML = tweet_div.innerHTML + formcontent;
            const temp_func = async (bet_value) => {
              let value = document.getElementById(
                "x3-Value-bet-undefined"
              ).value;
              const uma = new ethers.Contract(
                UMA_CONTRACT_ADDRESS,
                UMA_CONTRACT_ABI,
                provider.getSigner()
              );
              let erc_20_abi = [
                "function approve(address spender, uint256 amount) public returns (bool)",
              ];
              let erc20 = new ethers.Contract(
                UMA_ERC20_CONTRACT_ADDRESS,
                erc_20_abi,
                provider.getSigner()
              );
              let tx = await erc20.approve(
                UMA_CONTRACT_ADDRESS,
                ethers.utils.parseEther(value)
              );
              await tx.wait();
              console.log(selectedABI, value);
              let uma_bet = await uma.placeBet(
                selectedABI.marketId,
                ethers.utils.parseEther(value),
                bet_value
              );
              await uma_bet.wait();
              alert("Bet placed");
            };
            let for_button = document.getElementById("x3-For-undefined");
            for_button.onclick = async () => {
              await temp_func(1);
            };

            let Against_button = document.getElementById(
              "x3-Against-undefined"
            );
            Against_button.onclick = async () => {
              await temp_func(2);
            };
            return;
          }
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

  let others_profile_selector = [
    "#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-kemksi.r-1kqtdi0.r-1ljd8xs.r-13l2t4g.r-1phboty.r-16y2uox.r-1jgb5lz.r-11wrixw.r-61z16t.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div:nth-child(3) > div > div > div > div > div.css-1dbjc4n.r-1habvwh.r-18u37iz.r-1w6e6rj.r-1wtj0ep > div.css-1dbjc4n.r-obd0qt.r-18u37iz.r-1w6e6rj.r-1h0z5md.r-dnmrzs > div:nth-child(4) > div.css-1dbjc4n.r-6gpygo > div > div > span > span",
    "#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-kemksi.r-1kqtdi0.r-1ljd8xs.r-13l2t4g.r-1phboty.r-16y2uox.r-1jgb5lz.r-11wrixw.r-61z16t.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div:nth-child(3) > div > div > div > div > div.css-1dbjc4n.r-1habvwh.r-18u37iz.r-1w6e6rj.r-1wtj0ep > div.css-1dbjc4n.r-obd0qt.r-18u37iz.r-1w6e6rj.r-1h0z5md.r-dnmrzs > div:nth-child(2) > div.css-1dbjc4n.r-6gpygo > div > div > span > span",
    "#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-kemksi.r-1kqtdi0.r-1ljd8xs.r-13l2t4g.r-1phboty.r-16y2uox.r-1jgb5lz.r-11wrixw.r-61z16t.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div:nth-child(3) > div > div > div > div > div.css-1dbjc4n.r-1habvwh.r-18u37iz.r-1w6e6rj.r-1wtj0ep > div.css-1dbjc4n.r-obd0qt.r-18u37iz.r-1w6e6rj.r-1h0z5md.r-dnmrzs > div:nth-child(3) > div.css-1dbjc4n.r-6gpygo > div > div > span > span",
  ];
  let others_profile;
  for (let i = 0; i < others_profile_selector.length; i++) {
    let ele = document.querySelector(others_profile_selector[i]);
    if (ele) {
      others_profile = ele;
      break;
    }
  }

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
      let follow_div = document.querySelector(
        "#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-kemksi.r-1kqtdi0.r-1ljd8xs.r-13l2t4g.r-1phboty.r-16y2uox.r-1jgb5lz.r-11wrixw.r-61z16t.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div:nth-child(3) > div > div > div > div > div.css-1dbjc4n.r-1habvwh.r-18u37iz.r-1w6e6rj.r-1wtj0ep > div.css-1dbjc4n.r-obd0qt.r-18u37iz.r-1w6e6rj.r-1h0z5md.r-dnmrzs"
      );
      const username = document.querySelector(
        "#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-kemksi.r-1kqtdi0.r-1ljd8xs.r-13l2t4g.r-1phboty.r-16y2uox.r-1jgb5lz.r-11wrixw.r-61z16t.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div:nth-child(3) > div > div > div > div > div.css-1dbjc4n.r-6gpygo.r-14gqq1x > div > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1wbh5a2 > div > div > div > span"
      ).innerText;
      let verified = await contract.verifiedUser(username);
      if (verified) {
        let element = document.querySelector(
          "#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-kemksi.r-1kqtdi0.r-1ljd8xs.r-13l2t4g.r-1phboty.r-16y2uox.r-1jgb5lz.r-11wrixw.r-61z16t.r-1ye8kvj.r-13qz1uu.r-184en5c > div > div:nth-child(3) > div > div > div > div > div.css-1dbjc4n.r-6gpygo.r-14gqq1x > div > div > div.css-1dbjc4n.r-1wbh5a2.r-dnmrzs.r-1ny4l3l > div > div > span > span.css-901oao.css-16my406.r-poiln3.r-bcqeeo.r-1pos5eu.r-qvutc0"
        );
        if (!element.innerHTML.includes(green_tick)) {
          element.innerHTML = element.innerHTML + green_tick;
        }

        follow_div.innerHTML = follow_div.innerHTML.replace(attest, "");
        return;
      }
      others_profile_url.add(window.location.href);
      if (!follow_div.innerHTML.includes(attest)) {
        follow_div.innerHTML = follow_div.innerHTML + attest;
      }
      document.getElementById("x3-attest").onclick = async () => {
        console.log(EAS_CONTRACT_ADDRESS);
        const eas = new EAS(EAS_CONTRACT_ADDRESS);
        eas.connect(await provider.getSigner());
        window.eas = eas;
        const schemaEncoder = new SchemaEncoder("string twitter_username");

        const encodedData = schemaEncoder.encodeData([
          { name: "twitter_username", value: username, type: "string" },
        ]);
        const schemaUID = EAS_UID;
        const tx = await eas.attest({
          schema: schemaUID,
          data: {
            recipient: "0x1207F3dc546Cea8122a4fd4e0208FCb69d8debF4",
            expirationTime: 0,
            revocable: false, // Be aware that if your schema is not revocable, this MUST be false
            data: encodedData,
          },
        });

        const newAttestationUID = await tx.wait();
        console.log("New attestation UID:", username, newAttestationUID);
        alert("Attestion completed!");
      };
    }
  }
}
checkIfReactRendered();
window.addEventListener("scroll", function () {
  checkIfReactRendered();
});
