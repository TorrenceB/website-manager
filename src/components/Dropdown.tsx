import { Chevron } from "./index";

interface Props {
  options: string[];
  id: string;
  label?: string;
}

const Dropdown = ({ options, label, id }: Props) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={id}>{label}</label>

      <div className="w-full flex bg-light-gray rounded p-2 shadow">
        <select id={id} className="appearance-none w-full">
          {options.map((option) => (
            <option>{option}</option>
          ))}
        </select>
        <Chevron />
      </div>
    </div>
  );
};

export default Dropdown;