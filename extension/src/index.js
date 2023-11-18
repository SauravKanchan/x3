const ethers = require("ethers");
let tweets = new Set();
import div from "./div.html";

function checkIfReactRendered() {
  const tweet_divs = document.querySelectorAll('div[data-testid="tweetText"]');
  console.log(div)
  if (tweet_divs.length > 0) {
    tweet_divs.forEach((tweet_div) => {
      // check tweet_div exists in tweets
      if (!tweets.has(tweet_div)) {
        // check whether tweet_div.innerText has a https://x3.fyi/id/ link
        if (tweet_div.innerText.includes("https://x3.fyi/id/")) {
          tweet_div.innerHTML =
            tweet_div.innerHTML +
            `<div style="width: 100%; display: flex;">
            <input type="text" style="flex: 1 !important; margin-right: 10px !important;     -webkit-text-size-adjust: 100%;
    tab-size: 4;
    box-sizing: border-box;
    border-style: solid;
    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-pan-x: ;
    --tw-pan-y: ;
    --tw-pinch-zoom: ;
    --tw-scroll-snap-strictness: proximity;
    --tw-gradient-from-position: ;
    --tw-gradient-via-position: ;
    --tw-gradient-to-position: ;
    --tw-ordinal: ;
    --tw-slashed-zero: ;
    --tw-numeric-figure: ;
    --tw-numeric-spacing: ;
    --tw-numeric-fraction: ;
    --tw-ring-inset: ;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgb(59 130 246 / 0.5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    --tw-blur: ;
    --tw-brightness: ;
    --tw-contrast: ;
    --tw-grayscale: ;
    --tw-hue-rotate: ;
    --tw-invert: ;
    --tw-saturate: ;
    --tw-sepia: ;
    --tw-drop-shadow: ;
    --tw-backdrop-blur: ;
    --tw-backdrop-brightness: ;
    --tw-backdrop-contrast: ;
    --tw-backdrop-grayscale: ;
    --tw-backdrop-hue-rotate: ;
    --tw-backdrop-invert: ;
    --tw-backdrop-opacity: ;
    --tw-backdrop-saturate: ;
    --tw-backdrop-sepia: ;
    font-family: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    font-weight: inherit;
    margin: 0;
    display: block;
    width: 100%;
    border-radius: 0.5rem;
    border-width: 1px;
    padding: 0.5rem;
    padding-left: 1rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    --tw-border-opacity: 1;
    border-color: rgb(75 85 99 / var(--tw-border-opacity));
    --tw-bg-opacity: 1;
    background-color: rgba(55 65 81 0));
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));">
            <a href="/i/verified-choose" role="link" class="css-4rbku5 css-18t94o4 css-1dbjc4n r-l5o3uw r-42olwf r-sdzlij r-1phboty r-rs99b7 r-1loqt21 r-2yi16 r-1qi8awa r-1ny4l3l r-ymttw5 r-o7ynqc r-6416eg r-lrvibr"><div dir="ltr" class="css-901oao r-1awozwy r-jwli3a r-6koalj r-18u37iz r-16y2uox r-37j5jr r-a023e6 r-b88u0q r-1777fci r-rjixqe r-bcqeeo r-q4m81j r-qvutc0" style="text-overflow: unset;"><span class="css-901oao css-16my406 css-1hf3ou5 r-poiln3 r-a023e6 r-rjixqe r-bcqeeo r-qvutc0" style="text-overflow: unset;"><span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0" style="text-overflow: unset;">Submit</span></span></div></a>
          </div>
          `;
        }

        tweets.add(tweet_div);
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
