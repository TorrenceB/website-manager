import { Button, Plus } from "../components";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="grid justify-center gap-y-4 p-4 w-full">
      <h1>Blog Management</h1>

      <Link to={"/create-post"}>
        <Button>
          Create Post
          <Plus />
        </Button>
      </Link>
    </div>
  );
};

export default Home;
