import { useState, FormEvent } from "react";
import { useNavigate } from "react-router";

import { Input, Button } from "../components";
import Auth from "../api/authentication";

const auth = Auth();

const Authentication = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const authUser = await auth.$signIn({
      email: user.email,
      password: user.password,
    });

    if (authUser) {
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
          <Button>Sign In</Button>
        </div>
      </form>
    </div>
  );
};

export default Authentication;
