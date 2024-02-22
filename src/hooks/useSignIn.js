import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBoundStore } from "@/stores/index";

const useSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { setDataPerfilUser, setUser, setAuthenticated } = useBoundStore(
    (state) => state
  );

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    const user = {
      email,
      password,
    };

    if (!email.length || !password.length) return alert("Empty fields!");
    setDataPerfilUser(user);
    setUser(user);
    setAuthenticated(true);
    navigate("/sign-up");
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    showPassword,
    handlePasswordVisibility,
    handleSubmit,
  };
};

export default useSignIn;
