import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Viewer } from "@bytemd/react";

import Storage from "../api/storage";
import { Button, Icon, Chip } from "./index";
import { Icons } from "../assets/data";
import { Post } from "../types";
import { isTimestamp } from "../utils/get-date";

interface Props {
  post: Post;
  onDelete?: () => void;
}

const storage: Storage = Storage();

const PostCard = ({ post, onDelete }: Props) => {
  const { id, title, date, body, tags, image } = post;
  const [imageSrc, setImageSrc] = useState<string>("");

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

  const formatDate = !isTimestamp(date) && date.toDateString();
  const fetchImage = async (): Promise<void> => {
    const src = await storage.$download(image);

    setImageSrc(src);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div className="flex flex-col justify-between rounded-md p-4 h-[30rem] w-96 shadow-lg text-black transition-all">
      <img src={imageSrc} className="rounded-md" />

      <div className="flex gap-2">{buildTags}</div>
      <h3 className="text-black">{title}</h3>

      <Viewer value={body} />

      <p className="flex-end">{formatDate}</p>
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
