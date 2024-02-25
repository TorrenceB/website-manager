import { MouseEventHandler } from "react";

interface Props {
  content: string | number;
  color?: string;
  isClickable?: boolean;
  onClick?: (event: MouseEventHandler<HTMLElement>) => void;
}

const Chip = ({
  content = " ",
  color = "bg-dark-indigo",
  isClickable = false,
  onClick,
}: Props) => {
  const classes: { base: string; clickable: string } = {
    base: "flex w-fit p-1.5 rounded-full text-light-gray text-xs font-bold",
    clickable: "cursor-pointer active:scale-105",
  };

  return (
    <div
      className={[classes.base, color, isClickable && classes.clickable].join(
        " "
      )}
      {...(isClickable && onClick)}
    >
      <span className="m-auto">{content}</span>
    </div>
  );
};

export default Chip;
