import { MouseEventHandler } from "react";

import { Icon } from "./index";
import { Icons } from "../assets/data";

interface Props {
  content: string | number;
  color?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  onDelete?: () => void;
}

interface Classes {
  base: string;
  clickable: string;
  deletable: string;
}

const Chip = ({
  content = "",
  color = "bg-honeydew",
  onClick,
  onDelete,
}: Props) => {
  const classes: Classes = {
    base: "flex w-fit p-1.5 rounded-md text-black text-xs font-bold",
    clickable: "cursor-pointer active:scale-105",
    deletable: "",
  };

  return (
    <div
      onClick={onClick ? onClick : undefined}
      className={[classes.base, color, onClick && classes.clickable].join(" ")}
    >
      <span className="m-auto flex items-center">
        {onDelete && (
          <Icon icon={Icons["x-mark"]} onClick={onDelete} color="#000000" />
        )}
        {content}
      </span>
    </div>
  );
};

export default Chip;
