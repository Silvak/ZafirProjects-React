import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBoundStore } from "@/stores/index";

function useSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);

  const { setDataPerfilUser, setUser, setAuthenticated } = useBoundStore(
    (state) => state
  );

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const firstName = data.get("firstname");
    const lastName = data.get("lastname");
    const email = data.get("email");
    const password = data.get("password");
    const confirmPassword = data.get("confirmpassword");

    const user = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    };

    if (Object.values(user).includes("")) return alert("Empty fields!");

    setDataPerfilUser(user);
    setUser(user);
    setAuthenticated(true);
    navigate("/sign-in");
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setConfirmPassword(!showConfirmPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return {
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
    handleMouseDownPassword,
    handleSubmit,
  };
}

export default useSignUp;
