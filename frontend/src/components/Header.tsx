import { useState } from "react";
import arrowDown from "../assets/arrow_down.svg";
import user from "../assets/user.svg";
import LoginDialog from "./LoginDialog";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="p-0 ml-[195px] mt-[45px] mr-[245px] flex justify-between">
        <div className="bg-[#079aa2] text-[#dee2e6] pt-[22px] pb-[25px] px-[100px] text-center rounded-lg mr-[37px]">
          logo
        </div>
        <div className="flex items-center shadow-custom bg-white rounded-lg">
          <div className="flex gap-2.5 ml-[592px] mr-[20px]">
            <div
              className="text-[#8a92a6] flex items-center gap-1.5 cursor-pointer"
              onClick={handleOpen}
            >
              Войти
              <img src={arrowDown} alt="" className="w-[13px] h-[13px]" />
            </div>
            <div className="bg-[#d9d9d9] py-[5px] px-2 rounded-lg">
              <img src={user} alt="" className="w-4 h-6" />
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute right-[245px] mt-2">
          <LoginDialog />
        </div>
      )}
    </div>
  );
};

export default Header;
