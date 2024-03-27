import { User, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";

interface Auth {
  $signIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<User>;
}

const auth = getAuth();

const Auth = (): Auth => ({
  $signIn: async ({ email, password }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      if (user) {
        toast.success("Signed in successfully!", { position: "bottom-center" });
      }

      return user;
    } catch (error) {
      throw Error(`@authentication/functions.ts::Auth.$signIn ${error}`);
    }
  },
});

export default Auth;
