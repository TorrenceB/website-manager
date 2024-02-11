import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  onClick?: () => void;
}

const Button = ({ onClick, children }: Props) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex justify-center items-center gap-1 rounded p-1 bg-light-gray text-dark-indigo font-bold hover:bg-cool-gray"
    >
      {children}
    </button>
  );
};

export default Button;
