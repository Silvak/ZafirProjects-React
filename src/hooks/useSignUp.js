import { useState } from "react";

function useSignUp(){
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false);
  
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowConfirmPassword = () =>
      setConfirmPassword(!showConfirmPassword);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleSubmit =(event)=>{
      event.preventDefault()
    }


    return {
        showPassword,
        showConfirmPassword,
        handleClickShowPassword,
        handleClickShowConfirmPassword,
        handleMouseDownPassword,
        handleSubmit
    }
}

export default useSignUp