import { createContext, useState } from "react";
import { Widget } from "./components/Widget";
import { firebase, auth } from "./services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}
export const AuthContext = createContext({} as AuthContextType);

export function App() {
  const [ user, setUser ] = useState<User>();

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

      if (result.user) {
        const { displayName, photoURL, uid} = result.user

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
  }

  return (
    <AuthContext.Provider value={{user, signInWithGoogle}}>
      <Widget />
    </AuthContext.Provider>
  )
}

