import { ChangeEventHandler } from "react";

interface Props {
  id: string;
  value: string | number;
  label: string;
  name: string;
  placeholder: string;
  type: "text" | "number" | "email" | "password";
  onChange: ChangeEventHandler;
}

const Input = ({
  onChange,
  value,
  label,
  name,
  placeholder,
  id,
  type,
}: Props) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
