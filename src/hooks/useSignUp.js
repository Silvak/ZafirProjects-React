import { useBoundStore } from "@/stores/index";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/User/UserContext";

function useSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const { Register } = useContext(UserContext);
  const { ChangeStateAlert, ChangeTitleAlert } = useBoundStore(
    (state) => state
  );

  const navigate = useNavigate();

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
      email,
      password,
    };

    Register(user)
      .then((response) => {
        if (response.status === 201) {
          ChangeTitleAlert(response.data.message);
          ChangeStateAlert(true);
          setTimeout(() => {
            ChangeTitleAlert("");
            ChangeStateAlert(false);
            navigate("/sign-in");
          }, 1500);
        }
      })
      .catch((error) => {
        ChangeTitleAlert(error.message);
        ChangeStateAlert(true);
      });
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
