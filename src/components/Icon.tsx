interface Props {
  icon: string[];
  color?: string;
  size?: string;
  classes?: string;
}

const Icon = ({
  icon,
  color = "#474787",
  size = "w-5 h-5",
  classes = "",
}: Props) => {
  const paths = icon.map((d) => <path key={d} d={d} fill="black" />);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={color}
      className={[...size, ...classes].join("")}
    >
      {paths}
    </svg>
  );
};

export default Icon;
