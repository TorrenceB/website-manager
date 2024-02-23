import { Chip } from "./index";

interface Props {
  options: string[];
}

const ChipGroup = ({ options = [] }: Props) => {
  const chips = options.map((option) => (
    <Chip
      key={option}
      content={option}
      isClickable={true}
      color="bg-deep-purple-gray"
    />
  ));

  return <div className="flex items-center flex-wrap gap-2">{chips}</div>;
};

export default ChipGroup;
