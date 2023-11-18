const ethers = require("ethers");
let tweets = new Set();
import { ABI, ADDRESS } from "../config";
import form from "./components/form.html";

async function checkIfReactRendered() {
  const tweet_divs = document.querySelectorAll('div[data-testid="tweetText"]');
  if (tweet_divs.length > 0) {
    tweet_divs.forEach(async (tweet_div) => {
      // check tweet_div exists in tweets
      if (!tweets.has(tweet_div)) {
        tweets.add(tweet_div);
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
          // log the response body
          console.log("ver 3", await response.text());
          tweet_div.innerHTML = tweet_div.innerHTML + form;
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
