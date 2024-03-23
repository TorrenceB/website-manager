import { MouseEvent, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
}

const Button = ({ isDisabled, onClick, children }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className="w-full flex justify-center items-center gap-1 rounded p-1 bg-robin-egg-blue text-white font-bold disabled:bg-gray-200"
    >
      {children}
    </button>
  );
};

export default Button;
