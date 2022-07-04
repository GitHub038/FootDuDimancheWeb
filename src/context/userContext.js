import { createContext, useState, useEffect } from "react";

import {
  signInWithEmailAndPassword,
  OnAuthStateChanged,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../firebase-config";

// Composant d'ordre supérieur utile pour pouvoir passer notre "value" à nos childrens
export const UserContext = createContext();

export function UserContextProvider(props) {
  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);

  const [currentUser, setCurrentUser] = useState();
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    // Comme un eventListener mais la sur currentUser
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoadingData(false);
    });

    return unsubscribe;
  }, []);

  // modal
  const [modalState, setModalState] = useState({
    signInModal: false,
  });

  const toggleModals = (modal) => {
    if (modal === "signIn") {
      setModalState({
        signInModal: true,
      });
    }
    if (modal === "close") {
      setModalState({
        signInModal: false,
      });
    }
  };

  //   Ici c'est <App> notre props.children
  return (
    <UserContext.Provider
      value={{ modalState, toggleModals, signIn, currentUser }}
    >
      {!loadingData && props.children}
    </UserContext.Provider>
  );
}
