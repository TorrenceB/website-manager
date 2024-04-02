import { useState, FormEvent } from "react";
import { useNavigate } from "react-router";
import ReactLoading from "react-loading";

import { Input, Button, Icon } from "../components";
import { Icons } from "../assets/data";
import { useAuth } from "../context";
import Auth from "../api/authentication";

const authentication = Auth();

const SignIn = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const { setAuth } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsSigningIn(true);

    const authUser = await authentication.$signIn({
      email: user.email,
      password: user.password,
    });

    setAuth({ token: authUser.token, isAuthenticated: true });
    setIsSigningIn(false);

    if (authUser.token) {
      navigate("/posts");
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center w-[40rem] m-auto shadow-md rounded-md p-4">
      <h2 className="opacity-30">Sign in to account</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="email"
          name="email"
          type="text"
          label="Email"
          value={user.email}
          onChange={({ target }) => setUser({ ...user, email: target.value })}
        />
        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          value={user.password}
          onChange={({ target }) =>
            setUser({ ...user, password: target.value })
          }
        />

        <div className="w-40">
          <Button>
            {isSigningIn ? (
              <ReactLoading
                type="spinningBubbles"
                height={"1.5rem"}
                width={"1.5rem"}
              />
            ) : (
              <>
                Sign In <Icon icon={Icons["arrow-out-left"]} />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
