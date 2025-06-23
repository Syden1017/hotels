import { useState } from "react";

interface LoginRegisterFormProps {
  type: string;
}

const LoginRegisterForm: React.FC<LoginRegisterFormProps> = ({ type }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const validateField = (field: "username" | "password") => {
    if (field === "username" && !username) {
      setErrors((prev) => ({ ...prev, username: "Необходимо ввести логин" }));
    } else if (field === "password" && !password) {
      setErrors((prev) => ({ ...prev, password: "Необходимо ввести пароль" }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleBlur = (field: "username" | "password") => {
    validateField(field);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateFields();
    if (isValid) {
      console.log("Форма отправлена:", { username, password });
    }
  };

  const validateFields = () => {
    const newErrors = { username: "", password: "" };
    if (!username) {
      newErrors.username = "Введите логин";
    }
    if (!password) {
      newErrors.password = "Введите пароль";
    }
    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  return (
    <div>
      {type === "login" ? (
        <form className="flex flex-col gap-[14px]" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Введите логин"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => handleBlur("username")}
              className={`px-4 py-2 border-[1px] border-solid rounded-[4px] w-full text-[#8a92a6] placeholder:text-[#8a92a6] ${
                errors.username ? "border-red-500" : "border-custom"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
              className={`px-4 py-2 border-[1px] border-solid rounded-[4px] w-full text-[#8a92a6] placeholder:text-[#8a92a6] ${
                errors.password ? "border-red-500" : "border-custom"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <button className="self-start bg-[#5d73e1] py-2 px-6 text-white rounded-[4px] shadow-button cursor-pointer">
            Войти
          </button>
        </form>
      ) : (
        <form className="flex flex-col gap-[14px]" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Введите адрес электронной почты"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => handleBlur("username")}
              className={`px-4 py-2 border-[1px] border-solid rounded-[4px] w-full text-[#8a92a6] placeholder:text-[#8a92a6] ${
                errors.username ? "border-red-500" : "border-custom"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Введите имя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => handleBlur("username")}
              className={`px-4 py-2 border-[1px] border-solid rounded-[4px] w-full text-[#8a92a6] placeholder:text-[#8a92a6] ${
                errors.username ? "border-red-500" : "border-custom"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
              className={`px-4 py-2 border-[1px] border-solid rounded-[4px] w-full text-[#8a92a6] placeholder:text-[#8a92a6] ${
                errors.password ? "border-red-500" : "border-custom"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Введите роль на сайте"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
              className={`px-4 py-2 border-[1px] border-solid rounded-[4px] w-full text-[#8a92a6] placeholder:text-[#8a92a6] ${
                errors.password ? "border-red-500" : "border-custom"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <button className="self-start bg-[#5d73e1] py-2 px-6 text-white rounded-[4px] shadow-button cursor-pointer">
            Войти
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginRegisterForm;
