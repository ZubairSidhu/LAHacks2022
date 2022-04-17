import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import PropTypes from "prop-types";

const CONTRACT_ADDR = "0x024d84a6a9830df1c4a518e5943d8b2E90e6d12c";
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
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0xA869",
            // rpcUrls: ["https://rpc.ankr.com/avalanche_fuji-c"],
            rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
            chainName: "Avalanche FUJI C-Chain",
            nativeCurrency: {
              name: "AVAX",
              symbol: "AVAX",
              decimals: 18,
            },
            blockExplorerUrls: ["https://testnet.snowtrace.io/"],
          },
        ],
      });
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: "0xA869",
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
    console.log(await signer.getAddress());

    const balance = ethers.utils.formatEther(await signer.getBalance());
    if (balance < 0.1) {
      return toast({
        title: "Transaction failed",
        description: "Reason: balance < 0.1",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }

    // const tx = {
    //   to: "0x0000D44D16c1185C22d7Bc402600085d9b2efdD2",
    //   value: ethers.utils.parseEther("0.1"),
    //   //   nonce: window.ethersProvider.getTransactionCount(send_account, "latest"),
    //   //   gasLimit: ethers.utils.hexlify(gas_limit), // 100000
    //   //   gasPrice: gas_price,
    // };
    const overrides = {
      value: ethers.utils.parseEther("0.1"),
      gasLimit: ethers.utils.hexlify(100000),
    };
    let unsignedTx;
    try {
      // Increment year because contract reverts if you resubscribe for same year
      unsignedTx = await contract.populateTransaction.subscribe(
        new Date().getFullYear() + 1,
        overrides
      );
      const trans = await signer.sendTransaction(unsignedTx);
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
      console.log("trans", trans);
      onSuccess(trans, await signer.getAddress());
    } catch (e) {
      console.log(e);
      if (e.message === "Internal JSON-RPC error.") {
        if (
          e.data.message ===
          "execution reverted: ALREADY SUBSCRIBED FOR THAT YEAR"
        ) {
          toast({
            title: "Transaction failed",
            description: "Reason: already subscribed",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        } else {
          console.log(e);
        }
      } else {
        console.log(e);
      }
    }
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
