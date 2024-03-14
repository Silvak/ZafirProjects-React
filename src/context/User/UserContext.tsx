import React, { createContext } from "react";
import { useMoralis } from "react-moralis";
import { Moralis } from "moralis-v1";
import { useBoundStore } from "@/stores/index";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../fbconfig'; // Asegúrate de importar la configuración correcta
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

initializeApp(firebaseConfig);

type UserContextType = {
  LoginMail: (values: any) => Promise<void>;
  SettingsUser: (userAddress: string) => Promise<void>;
  LogoutFunc: () => Promise<void>;
} | null;

export const UserContext = createContext<UserContextType>(null)


async function assignRoleToUser(userId: string, roleName: string) {
  try {
      // Llamar a la función de nube en Moralis
      const result = await Moralis.Cloud.run('assignRoleToUser', { userId, roleName});

      console.log(result);
  } catch (error) {
    console.error('Error al asignar el rol:', error);
  }
}

async function checkUserRole(roleName: string, ethAddress: string) {
  try {
    // Llamar a la función de nube en Parse Server
    const result = await Moralis.Cloud.run('checkUserRoleFront', { roleName, ethAddress });

    if (result && result.hasRole) {
      console.log(`El usuario actual tiene el rol '${roleName}'.`);
      return result.hasRole
    } else {
      console.log(`El usuario actual NO tiene el rol '${roleName}'.`);
      return result.hasRole
    }
  } catch (error) {
    console.error('Error al verificar el rol:', error);
  }
}

const UserState = (props: { children: any }) => {

  const { logout, enableWeb3, authenticate } = useMoralis();
  const { user } = useMoralis();
  // const userAddress = user!.get("ethAddress");

  const {
    DataPerfilUser,
    User,
    Authenticated,
    setDataPerfilUser,
    setUser,
    setAuthenticated
  } = useBoundStore();
  
  const LoginMail = async ({ email, password }: { email: string; password: string }): Promise<void> => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setAuthenticated(true);
      const user = userCredential.user;
      setUser({
        uid: user.uid,
        email: user.email,
      });
    } catch (error: any) {
      const errorMessage = JSON.stringify(error);
      const errorObjeto = JSON.parse(errorMessage);
  
      console.error("🚀 error de login", error);
      throw new Error (`No se pudo autenticar a ${email}`);
    }
  };
  

  const SettingsUser = async (userAddress: string) => {
    try{
      const SetSettingsUser = await Moralis.Cloud.run("SetSettingsUser", { owner: userAddress });
    }catch(error: any){
      console.error("🚀 error de SettingsUser", error);
    }
  };

   const LogoutFunc = async () => {
    try {
      const auth = getAuth();
      // Cerrar sesión en Firebase
      await auth.signOut();
      // Cerrar sesión en Moralis
      await logout();
      // setAuthenticated(false)
      // setUser([])
      location.reload();
    } catch (error: any) {
      console.error("🚀 error de logout", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ 
        LoginMail, 
        SettingsUser, 
        LogoutFunc
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
