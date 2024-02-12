import { Timestamp } from "firebase/firestore";

import { Button, Trash, Pencil } from "./index";
import { useFirebaseDate } from "../hooks";

interface Props {
  id?: string;
  title: string;
  body: string;
  timestamp: Timestamp;
  tags: { id: string; title: string }[];
}

const PostCard = ({ title, body, timestamp, tags }: Props) => {
  const [date] = useFirebaseDate(timestamp);

  return (
    <div className="flex flex-col gap-2 rounded p-4 h-72 w-full bg-cool-gray text-light-gray transition-all">
      <h3 className="text-dark-indigo">{title}</h3>
      <p>{date}</p>
      <hr className="border border-light-gray w-full" />
      {tags.map((tag) => (
        <div
          key={tag.id}
          className="w-fit p-1.5 rounded-full bg-dark-indigo text-light-gray text-xs font-bold"
        >
          <span>{tag.title}</span>
        </div>
      ))}

      <p className="max-h-32 overflow-hidden">{body}</p>
      <div className="flex gap-2">
        <Button>
          Edit
          <Pencil />
        </Button>
        <Button>
          Delete
          <Trash />
        </Button>
      </div>
    </div>
  );
};

export default PostCard;
