import { MouseEventHandler } from "react";

interface Props {
  content: string | number;
  color?: string;
  isClickable?: boolean;
  toggle?: (event: MouseEventHandler<HTMLElement>) => void;
}

const Chip = ({
  content = " ",
  color = "bg-dark-indigo",
  isClickable = false,
  toggle,
}: Props) => {
  const classes = {
    base: "flex w-fit p-1.5 rounded-full text-light-gray text-xs font-bold",
    clickable: "cursor-pointer",
  };

  return (
    <div
      className={[classes.base, color, isClickable && classes.clickable].join(
        " "
      )}
      {...(isClickable && toggle)}
    >
      <span className="m-auto">{content}</span>
    </div>
  );
};

export default Chip;
