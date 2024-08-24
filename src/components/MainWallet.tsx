"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const MainWallet = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex mt-28 justify-center lg:justify-start">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          We let users create walletes for more than one Blockchain.
        </h2>
      </div>
      <div className="flex gap-2 mt-10">
        <Button size={"lg"} onClick={() => router.push("/solana")}>
          Solana
        </Button>
        <Button size={"lg"} onClick={() => router.push("/ethereum")}>
          Ethereum
        </Button>
      </div>
    </div>
  );
};
