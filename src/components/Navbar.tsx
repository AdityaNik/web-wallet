import { Hexagon } from "lucide-react";
import { ModeButton } from "./ui/theme-button";

const Navbar = () => {
  return (
    <div className="mt-10 flex justify-between">
      <div className="flex gap-2">
        <Hexagon size={40} />
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
          Crypto Wallet
        </h1>
      </div>
      <ModeButton></ModeButton>
    </div>
  );
};

export default Navbar;
