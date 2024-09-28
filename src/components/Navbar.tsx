import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            <Link href={"/"}>MOVIECRITIC</Link>
          </h1>
          <div className="space-x-2">
            <Button variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              <Link href={"/crud"}>Add new movie</Link>
            </Button>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              <Link href={"/crud"}>Add new review</Link>
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
