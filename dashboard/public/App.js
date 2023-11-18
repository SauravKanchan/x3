import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Templatelist from "./components/Templatelist";
import Templatedetail from "./components/Templatedetail";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";

// 1. Get projectId
const projectId = "e278e09cf76fac699747444433336aed";

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

// 3. Create modal
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com",
  icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId,
});

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Login />
            </>
          }
        ></Route>
        <Route
          path='/user'
          element={
            <>
              <Navbar />
            </>
          }
        >
          <Route
            path='/user/dashboard'
            element={
              <>
                <Dashboard />
              </>
            }
          ></Route>
          <Route
            path='/user/templatelist'
            element={
              <>
                <Templatelist />
              </>
            }
          ></Route>
          <Route
            path='/user/templateabi'
            element={
              <>
                <Templatedetail />
              </>
            }
          ></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
