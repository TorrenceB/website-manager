import { MouseEvent, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ onClick, children }: Props) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex justify-center items-center gap-1 rounded p-1 bg-robin-egg-blue text-white font-bold"
    >
      {children}
    </button>
  );
};

export default Button;
