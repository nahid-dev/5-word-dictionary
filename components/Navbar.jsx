import { BookA, Menu } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-gray-100 ">
      <div className="flex items-center justify-between py-3 container px-2 md:px-4 mx-auto">
        <div>
          <BookA />
        </div>
        <div>
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
