import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import PropTypes from "prop-types";

const CONTRACT_ADDR = "0x232Bb0779c008a73694051845f52FadCaE4B3AFC";
const CONTRACT_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [],
    name: "YEARLY_SUBSCRIPTION_PRICE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_currentYear", type: "uint256" },
      { internalType: "address", name: "_receiver", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "payOut",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_year", type: "uint256" }],
    name: "subscribe",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "subscriptions",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];

const PaymentButton = ({ onSuccess }) => {
  const toast = useToast();

  const handleClick = async () => {
    try {
      window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0xA869",
            rpcUrls: ["https://rpc.ankr.com/avalanche_fuji-c"],
            chainName: "Avalanche FUJI C-Chain (ANKR RPC)",
            nativeCurrency: {
              name: "AVAX",
              symbol: "AVAX",
              decimals: 18,
            },
            blockExplorerUrls: ["https://testnet.snowtrace.io/"],
          },
        ],
      });
      window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: "0xA869",
            rpcUrls: ["https://rpc.ankr.com/avalanche_fuji-c"],
            chainName: "Avalanche FUJI C-Chain (ANKR RPC)",
            nativeCurrency: {
              name: "AVAX",
              symbol: "AVAX",
              decimals: 18,
            },
            blockExplorerUrls: ["https://testnet.snowtrace.io/"],
          },
        ],
      });
    } catch (e) {
      console.log(e);
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(CONTRACT_ADDR, CONTRACT_ABI, provider);

    // const tx = {
    //   to: "0x0000D44D16c1185C22d7Bc402600085d9b2efdD2",
    //   value: ethers.utils.parseEther("0.1"),
    //   //   nonce: window.ethersProvider.getTransactionCount(send_account, "latest"),
    //   //   gasLimit: ethers.utils.hexlify(gas_limit), // 100000
    //   //   gasPrice: gas_price,
    // };
    const overrides = {
      value: ethers.utils.parseEther("0.1"),
    };
    const unsignedTx = await contract.populateTransaction.subscribe(
      new Date().getFullYear() + 1,
      overrides
    );
    signer.sendTransaction(unsignedTx).then(async (trans) => {
      console.log(trans);
      toast({
        title: "Transaction sent.",
        description: "Waiting for confirmation from the blockchain...",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
      await trans.wait(1);
      toast({
        title: "Transaction confirmed!",
        description: "Redirecting you shortly...",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onSuccess();
    });
  };
  return (
    <Button colorScheme="teal" variant="solid" onClick={handleClick}>
      Purchase Subscription (0.1 AVAX)
    </Button>
  );
};

PaymentButton.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default PaymentButton;