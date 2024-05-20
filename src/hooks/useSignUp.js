import { useBoundStore } from '@/stores/index';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User/UserContext';

function useSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const { Register } = useContext(UserContext);
  const {
    ChangeStateAlert,
    ChangeTitleAlertError,
    ChangeTitleAlert,
    ChangeStateAlertError,
  } = useBoundStore((state) => state);

  const navigate = useNavigate();

  const showToast = (show, msg, type) => {
    if (type === 'error') {
      ChangeTitleAlertError(msg);
      ChangeStateAlertError(show);
    } else {
      ChangeTitleAlert(msg);
      ChangeStateAlert(show);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const firstName = data.get('firstname');
    const lastName = data.get('lastname');
    const email = data.get('email');
    const password = data.get('password');
    const confirmPassword = data.get('confirmpassword');
    const terms = data.get('terms');

    const user = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    };

    if (Object.values(user).includes('')) {
      return showToast(true, 'Please complete all fields', 'error');
    }
    if (confirmPassword !== password) {
      return showToast(true, 'Passwords do not match', 'error');
    }
    if (terms === null) {
      return showToast(true, 'Please accept the terms', 'error');
    }

    Register(user)
      .then((response) => {
        // succes
        if (response.status === 201) {
          showToast(true, response.data.message, 'succes');
          setTimeout(() => {
            ChangeTitleAlert('');
            ChangeStateAlert(false);
            navigate('/sign-in');
          }, 1500);
        }
      })
      .catch((error) => {
        showToast(true, error.message, 'error');
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
