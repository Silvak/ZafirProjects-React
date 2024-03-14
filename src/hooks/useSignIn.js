import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/User/UserContext";
import { useBoundStore } from "../stores/index";

const useSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { LoginMail } = useContext(UserContext);
  const { Authenticated, setUser, ChangeStateAlert,
    ChangeTitleAlert } = useBoundStore();

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    try {
      if (!email || !password) {
        throw new Error("Faltan completar campos");
      }
      await LoginMail({ email, password });
      ChangeTitleAlert(`La autenticación fue exitosa para ${email}`);
      ChangeStateAlert(true);
    } catch (error) {
      setUser(null);
      ChangeTitleAlert(`ERROR: ${error.message}`);
      ChangeStateAlert(true);
    }
  };

  useEffect(() => {
    if (Authenticated) {
      navigate("/");
    } else {
      navigate("/sign-in");
    }
  }, [Authenticated]);

  return {
    showPassword,
    handlePasswordVisibility,
    handleSubmit,
  };
};

export default useSignIn;
