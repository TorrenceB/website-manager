import { Link } from "react-router-dom";
import { Viewer } from "@bytemd/react";

import { Button, Icon, Chip } from "./index";
import { Icons } from "../assets/data";
import { useFirebaseDate } from "../hooks";
import { Post } from "../types";

interface Props {
  post: Post;
  onDelete?: () => void;
}

const PostCard = ({ post, onDelete }: Props) => {
  const { id, title, timestamp, body, tags } = post;
  const date = useFirebaseDate(timestamp);

  const tagColor = (index: number): string => {
    if (index % 2) {
      return "bg-honeydew";
    } else if (index % 3) {
      return "bg-alice-blue";
    } else {
      return "bg-lavender-blush";
    }
  };

  const buildTags = tags.map((tag, index) => (
    <Chip key={tag.id} content={tag.title} color={tagColor(index)} />
  ));

  return (
    <div className="flex flex-col justify-between rounded-md p-4 h-[30rem] w-96 shadow-lg text-black transition-all">
      <img
        src="https://i0.wp.com/blog.publer.io/wp-content/uploads/2023/12/blog-1.png?w=2000&ssl=1"
        className="rounded-md"
      />

      <div className="flex gap-2">{buildTags}</div>
      <h3 className="text-black">{title}</h3>

      <p className="max-h-32 overflow-hidden">
        <Viewer value={body} />
      </p>
      <p className="flex-end">{date}</p>
      <div className="flex gap-2">
        <Link to={`/update-post/${id}`} className="w-full">
          <Button>
            Edit
            <Icon icon={Icons.pencil} />
          </Button>
        </Link>
        <Button onClick={onDelete}>
          Delete
          <Icon icon={Icons.trash} />
        </Button>
      </div>
    </div>
  );
};

export default PostCard;
