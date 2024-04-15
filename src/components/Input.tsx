import { ChangeEventHandler, HTMLAttributes, LegacyRef } from "react";

interface Props {
  id: string;
  className?: string;
  value?: string | number;
  label?: string;
  name?: string;
  placeholder?: string;
  hasError?: boolean;
  errorMessage?: string;
  innerRef?: LegacyRef<HTMLInputElement>;
  type?: "text" | "number" | "email" | "password" | "file";
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Input = ({
  onChange,
  value,
  className = "",
  label,
  name,
  placeholder,
  id,
  type,
  hasError,
  errorMessage,
  innerRef,
}: Props) => {
  return (
    <div className="flex flex-col gap-y-1 w-full">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        ref={innerRef}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={[
          "p-2",
          "rounded",
          "shadow",
          "w-full",
          "focus:ouline-none",
          "leading-tight",
          type === "file" && "hidden",
          className,
        ].join(" ")}
      />
      {hasError && (
        <p className="text-red-500 text-xs font-bold">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
