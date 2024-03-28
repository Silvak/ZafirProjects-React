import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBoundStore } from "@/stores/index";
import axios from "axios";

function useSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);

  const { setDataPerfilUser, setUser, setAuthenticated, User } = useBoundStore(
    (state) => state
  );

  const navigate = useNavigate();

  const register = async (user) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/user/register",
        user
      );
      console.log(user);
      if (response.status === 201) {
        console.log(response.data.message);
        setAuthenticated(true);
        navigate("/");
      } else {
        throw new Error("Error al registrar usuario");
      }
      if (response.status === 400) {
        alert("El usuario ya existe");
        navigate("/sign-in");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = async (event) => {
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
    register(user);
    // setAuthenticated(true);
    // navigate("/sign-in");
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
