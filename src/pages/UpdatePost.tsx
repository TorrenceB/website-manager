import { useParams } from "react-router";

const UpdatePost = () => {
  const { id } = useParams();

  return <div>{id}</div>;
};

export default UpdatePost;
