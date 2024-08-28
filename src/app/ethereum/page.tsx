"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Copy, Send, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { HDNodeWallet, Wallet } from "ethers";
import axios from "axios";
import { Web3 } from "web3";
import BigNumber from "bignumber.js";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const EthereumWallet = () => {
  const [wallets, setWallets] = useState(0);
  const [mnemonics, setMnemonics] = useState("");
  const [publicKey, setPublicKey] = useState<string[]>([]);
  const [selectedWallet, setSelectedWallet] = useState(1);
  const [ethBalence, setEthBalence] = useState(0.0);

  const ar = [];
  for (let i = 0; i < wallets; i++) {
    ar[i] = i + 1;
  }

  const handleSend = () => {};

  const fetchEth = async () => {
    try {
      const result = await axios.post(
        `https://eth-mainnet.g.alchemy.com/v2/xio_CgWy-_JQRHzbn2e3J2pw5nYesTGp`,
        {
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getBalance",
          params: [publicKey[selectedWallet - 1], "latest"],
        }
      );
      const hexAmount = result.data?.result;
      const web3 = new Web3();
      const decimalAmount = web3.utils.hexToNumberString(hexAmount);
      const eth_amount = new BigNumber(
        web3.utils.fromWei(decimalAmount, "ether")
      );
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum"
      );
      const exchangeRate = new BigNumber(res.data[0].current_price);
      // const eth_amount = new BigNumber(big_number);
      const amount = eth_amount.multipliedBy(exchangeRate);
      console.log(exchangeRate.toString());
      console.log(eth_amount.toString());
      console.log(amount.toString());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchEth();
  }, [selectedWallet]);

  const generateWallet = () => {
    if (wallets === 0) {
      const mnemonic = generateMnemonic();
      setMnemonics(mnemonic);
    }
    const seed = mnemonicToSeedSync(mnemonics);
    const path = `m/44'/60'/${wallets}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(path);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);
    setWallets(wallets + 1);
    setPublicKey([...publicKey, wallet.address]);
    toast("Wallet has been created", {
      description: "Ethereum",
    });
  };

  return (
    <div className="mt-20 ml-10">
      <div className="flex justify-between">
        <div>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Ethereum Wallet
          </h2>
        </div>
        <div>
          <h3 className="scroll-m-20 border-b text-1xl font-semibold tracking-tight first:mt-0">
            You can generate multiple wallets as well...
          </h3>
          <Button className="mt-2" onClick={generateWallet}>
            Generate Wallet
          </Button>
        </div>
      </div>
      <div className="m-10 flex justify-center">
        <Card className="w-[450px] p-4">
          <CardContent>
            {wallets === 0 ? (
              <div>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                  No wallets Created yet...
                </h2>
              </div>
            ) : (
              <div>
                <div className="flex justify-between my-6">
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button className="gap-2">
                          Wallet {selectedWallet}
                          <ChevronDown size={25} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Wallets</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {ar.map((ele) => {
                          if (selectedWallet !== ele) {
                            return (
                              <DropdownMenuCheckboxItem
                                key={ele}
                                onSelect={() => setSelectedWallet(ele)}
                              >
                                Wallet {ele}
                              </DropdownMenuCheckboxItem>
                            );
                          }
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size={"sm"}>Show Mnemonics</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
                            Your Mnemonics Phrase
                          </DialogTitle>
                          <p>{mnemonics}</p>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder={publicKey[selectedWallet - 1]}
                    readOnly
                    className="pr-10"
                  />
                  <Copy
                    size={15}
                    onClick={() => {
                      toast("Copied", {
                        description: "Address",
                      });
                      navigator.clipboard.writeText(
                        publicKey[selectedWallet - 1]
                      );
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  />
                </div>
                <div className="flex justify-center mt-10">
                  <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    $0.00
                  </h2>
                </div>
                <div className="flex justify-center mt-10">
                  <Send size={30} color="#00eeff" onClick={handleSend} />
                </div>
                <div className="flex justify-center mt-[1px]">
                  <p className="text-sm text-muted-foreground">Send</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EthereumWallet;
