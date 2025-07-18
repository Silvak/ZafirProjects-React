import React, { createContext } from 'react';
import { useMoralis } from 'react-moralis';
import { Moralis } from 'moralis-v1';
import { useBoundStore } from '@/stores/index';
import { shallow } from 'zustand/shallow';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../fbconfig'; // Asegúrate de importar la configuración correcta
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { axiosInstance } from '@/config/apiConfig';
initializeApp(firebaseConfig);

type UserContextType = {
  Register: (values: any) => Promise<void>;
  LoginMail: (values: any) => Promise<void>;
  // SettingsUser: (userAddress: string) => Promise<void>;
  LogoutFunc: () => Promise<void>;
} | null;

export const UserContext = createContext<UserContextType>(null);

async function assignRoleToUser(userId: string, roleName: string) {
  try {
    // Llamar a la función de nube en Moralis
    const result = await Moralis.Cloud.run('assignRoleToUser', {
      userId,
      roleName,
    });

    console.log(result);
  } catch (error) {
    console.error('Error al asignar el rol:', error);
  }
}

async function checkUserRole(roleName: string, ethAddress: string) {
  try {
    // Llamar a la función de nube en Parse Server
    const result = await Moralis.Cloud.run('checkUserRoleFront', {
      roleName,
      ethAddress,
    });

    if (result && result.hasRole) {
      console.log(`El usuario actual tiene el rol '${roleName}'.`);
      return result.hasRole;
    } else {
      console.log(`El usuario actual NO tiene el rol '${roleName}'.`);
      return result.hasRole;
    }
  } catch (error) {
    console.error('Error al verificar el rol:', error);
  }
}

const UserState = (props: { children: any }) => {
  // const { logout, enableWeb3, authenticate } = useMoralis();
  // const { user } = useMoralis();

  // const userAddress = user!.get("ethAddress");

  const {
    DataPerfilUser,
    User,
    Authenticated,
    setDataPerfilUser,
    setUser,
    setAuthenticated,
    clearTasks,
    clearProjects,
  } = useBoundStore((state: any) => state, shallow);

  const Register = async (user: any): Promise<void> => {
    try {
      const response = await axiosInstance.post('/user/register', user);
      return response;
    } catch (error: any) {
      throw Error(error.response.data.message);
    }
  };

  const LoginMail = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> => {
    try {
      const response = await axiosInstance.post('/user/login', {
        email,
        password,
      });
      return response;
    } catch (error: any) {
      throw Error(error.response.data.message);
    }
  };

  // const SettingsUser = async (userAddress: string) => {
  //   try {
  //     const SetSettingsUser = await Moralis.Cloud.run('SetSettingsUser', {
  //       owner: userAddress,
  //     });
  //   } catch (error: any) {
  //     console.error('🚀 error de SettingsUser', error);
  //   }
  // };

  const LogoutFunc = async () => {
    try {
      // const auth = getAuth();
      // Cerrar sesión en Firebase
      // await auth.signOut();
      // Cerrar sesión en Moralis
      //await logout();
      // setAuthenticated(false)
      // setUser([])
      // location.reload();
      // setDataPerfilUser([]);
      clearTasks();
      clearProjects();
      setAuthenticated(false);
      setUser({});
      localStorage.clear();
    } catch (error: any) {
      console.error('🚀 error de logout', error.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        LoginMail,
        Register,
        LogoutFunc,
      }}
      // value={{
      //   LoginMail,
      //   Register,
      //   SettingsUser,
      //   LogoutFunc,
      // }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
