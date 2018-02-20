///<reference path="../../node_modules/web3-typescript-typings/index.d.ts"/>
import Web3 from "web3";

export default function getWeb3(): Promise<Web3> {
  return new Promise<Web3>((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", () => {
      let web3: Web3 = window["web3"];

      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof web3 !== "undefined") {
        // Use Mist/MetaMask's provider.
        web3 = new Web3(web3.currentProvider);
        console.log("Injected web3 detected.");
      } else {
        // Fallback to localhost if no web3 injection. We've configured this to
        // use the development console's port by default.
        var provider = new Web3.providers.HttpProvider("http://127.0.0.1:9545");

        web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
      }
      resolve(web3);
    });
  });
}
