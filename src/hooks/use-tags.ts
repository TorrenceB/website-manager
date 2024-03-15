import { useState } from "react";

import Client from "../api/client";
import { Tag } from "../types";
import { tags as tagsData } from "../plugins/firebase";

const client = Client();

const useTags = () => {
  const [tags, setTags] = useState<Tag[]>();

  const fetchTags = async (): Promise<void> => {
    const tags = (await client.$list(tagsData)) as Tag[];

    setTags(tags);
  };

  const createTag = async (tag: Tag): Promise<void> => {
    const { id, title } = await client.$create({
      collection: tagsData,
      data: { title: tag.title },
    });

    const newTag: Tag = {
      id,
      title,
    };

    setTags([...(<[]>tags), newTag]);
  };

  return {
    tags,
    fetchTags,
    createTag,
  };
};

export default useTags;
