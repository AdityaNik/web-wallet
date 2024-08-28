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
import { Keypair, PublicKey } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Copy, Send, ArrowUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import nacl from "tweetnacl";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const SolanaWallet = () => {
  const [wallets, setWallets] = useState(0);
  const [mnemonics, setMnemonics] = useState("");
  const [publicKey, setPublicKey] = useState<PublicKey[]>([]);
  const [selectedWallet, setSelectedWallet] = useState(1);

  const ar = [];
  for (let i = 0; i < wallets; i++) {
    ar[i] = i + 1;
  }

  const generateWallet = () => {
    if (wallets === 0) {
      const mnemonic = generateMnemonic();
      setMnemonics(mnemonic);
    }
    const seed = mnemonicToSeedSync(mnemonics);
    const path = `m/44'/501'/${wallets}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keyPair = Keypair.fromSecretKey(secret);
    setWallets(wallets + 1);
    setPublicKey([...publicKey, keyPair.publicKey]);
    toast("Wallet has been created", {
      description: "solana",
    });
  };

  return (
    <div className="mt-20 ml-10">
      <div className="flex justify-between">
        <div>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Solana Wallet
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
                    placeholder={publicKey[selectedWallet - 1].toBase58()}
                    readOnly
                    className="pr-10"
                  />
                  <Copy
                    onClick={() => {
                      toast("Copied", {
                        description: "Address",
                      });
                      navigator.clipboard.writeText(
                        publicKey[selectedWallet - 1].toBase58()
                      );
                    }}
                    size={15}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  />
                </div>
                <div className="flex justify-center mt-10">
                  <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    $0.00
                  </h2>
                </div>
                <div className="flex justify-center mt-10">
                  <Send size={30} color="#00eeff" />
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

export default SolanaWallet;
