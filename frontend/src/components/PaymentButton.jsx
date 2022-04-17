import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import { ethers } from "ethers";

const PaymentButton = () => {
  const toast = useToast();

  const handleClick = async () => {
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

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());

    const tx = {
      to: "0x0000D44D16c1185C22d7Bc402600085d9b2efdD2",
      value: ethers.utils.parseEther("0.1"),
      //   nonce: window.ethersProvider.getTransactionCount(send_account, "latest"),
      //   gasLimit: ethers.utils.hexlify(gas_limit), // 100000
      //   gasPrice: gas_price,
    };
    signer.sendTransaction(tx).then(async (trans) => {
      console.log(trans);
      toast({
        title: "Transaction sent.",
        // description: "We've created your account for you.",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
      await trans.wait(1);
      toast({
        title: "Transaction succeeded!",
        // description: "We've created your account for you.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    });
  };
  return (
    <Button colorScheme="teal" variant="solid" onClick={handleClick}>
      Purchase Subscription (0.1 AVAX)
    </Button>
  );
};

export default PaymentButton;
