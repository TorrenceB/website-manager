import { MarkdownEditor } from "../components";

const Home = () => {
  return (
    <div className="grid justify-center p-4">
      <h1 className="text-center">Blog Management</h1>

      <form className="flex flex-col">
        <input placeholder="Title" />
        <input placeholder="Tags" />
        <MarkdownEditor />
      </form>
    </div>
  );
};

export default Home;
