import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User/UserContext';
import { useBoundStore } from '../stores/index';
import { shallow } from 'zustand/shallow';

const useSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { LoginMail } = useContext(UserContext);
  const {
    setAuthenticated,
    Authenticated,
    setUser,
    ChangeStateAlert,
    ChangeStateAlertError,
    ChangeTitleAlert,
    ChangeTitleAlertError,
  } = useBoundStore((state) => state, shallow);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    LoginMail({ email, password })
      .then((response) => {
        if (response.status === 200) {
          ChangeTitleAlert('Successful login');
          ChangeStateAlert(true);
          setTimeout(() => {
            const { data } = response;
            ChangeTitleAlert('');
            ChangeStateAlert(false);
            setUser({
              uid: data.user._id,
              name: data.user.name,
              email: data.user.email,
              rol: data.user.rol,
              colorbg: data.user.colorbg,
              colorText: data.user.colorText,
            });
            setAuthenticated(true);
          }, 1500);
        }
      })
      .catch((error) => {
        ChangeTitleAlertError(error.message);
        ChangeStateAlertError(true);
      });
  };

  return {
    showPassword,
    handlePasswordVisibility,
    handleSubmit,
  };
};

export default useSignIn;
