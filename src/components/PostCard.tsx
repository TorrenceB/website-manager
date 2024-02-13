import { Link } from "react-router-dom";

import { Button, Icon } from "./index";
import { Icons } from "../assets/data";
import { useFirebaseDate } from "../hooks";
import { Post } from "../types";

const PostCard = ({ id, title, body, timestamp, tags }: Post) => {
  const date = useFirebaseDate(timestamp);

  const buildTags = tags.map((tag) => (
    <div
      key={tag.id}
      className="w-fit p-1.5 rounded-full bg-dark-indigo text-light-gray text-xs font-bold"
    >
      <span>{tag.title}</span>
    </div>
  ));

  return (
    <div className="flex flex-col gap-2 rounded p-4 h-72 w-full bg-cool-gray text-light-gray transition-all">
      <h3 className="text-dark-indigo">{title}</h3>
      <p>{date}</p>
      <hr className="border border-light-gray w-full" />
      {buildTags}

      <p className="max-h-32 overflow-hidden">{body}</p>
      <div className="flex gap-2">
        <Link to={`/update-post/${id}`} className="w-full">
          <Button>
            Edit
            <Icon icon={Icons.pencil} />
          </Button>
        </Link>
        <Button>
          Delete
          <Icon icon={Icons.trash} />
        </Button>
      </div>
    </div>
  );
};

export default PostCard;
