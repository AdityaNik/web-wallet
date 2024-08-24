"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Copy, Send, ArrowUp, Circle } from "lucide-react";
import { useState } from "react";
import nacl from "tweetnacl";

const SolanaWallet = () => {
  const [wallets, setWallets] = useState(0);
  const [mnemonics, setMnemonics] = useState("");
  const [publicKey, setPublicKey] = useState([]);

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
    console.log(keyPair);
    console.log(publicKey);
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
          <Button onClick={generateWallet}>Generate Wallet</Button>
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
                <div className="relative">
                  <Input
                    type="text"
                    placeholder={publicKey[0]}
                    readOnly
                    className="pr-10"
                  />
                  <Copy
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
