import { useState } from "react";

const useSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return {
    showPassword,
    handlePasswordVisibility,
    handleSubmit,
  };
};

export default useSignIn;
