import { useState } from "react";
import LoginRegisterForm from "./helpers/LoginRegisterForm";

const LoginDialog = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleChangeType = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="shadow-custom border-[1px] border-solid border-[rgba(0,0,0,0.1)] rounded-lg py-6 px-[3px] bg-white">
      <div className="mb-4 flex gap-4 py-2 px-9">
        <h2
          className="text-[#6e7fd0] text-[16px] leading-custom cursor-pointer"
          onClick={handleChangeType}
        >
          Войти
        </h2>
        <span className="text-[#8a92a6] text-[16px] leading-custom">или</span>
        <h2
          className="text-[#6e7fd0] text-[16px] leading-custom cursor-pointer"
          onClick={handleChangeType}
        >
          Зарегистрироваться
        </h2>
      </div>
      <div className="px-4">
        {isLogin ? (
          <LoginRegisterForm type="login" />
        ) : (
          <LoginRegisterForm type="register" />
        )}
      </div>
    </div>
  );
};

export default LoginDialog;
