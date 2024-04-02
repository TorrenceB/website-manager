import {
  User,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import toast from "react-hot-toast";

interface Auth {
  $signIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<{ user: User; token: string }>;
  $signOut: () => void;
}

const auth = getAuth();

const Auth = (): Auth => ({
  $signIn: async ({ email, password }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const token = await user.getIdToken();

      if (token) {
        toast.success("Signed in successfully!", { position: "bottom-center" });
      }

      return { user, token };
    } catch (error) {
      throw Error(`@authentication/functions.ts::Auth.$signIn ${error}`);
    }
  },
  $signOut: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw Error(`@authentication/functions.ts::Auth.$signOut ${error}`);
    }
  },
});

export default Auth;
