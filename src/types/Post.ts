import { Timestamp } from "firebase/firestore";
import { Tag } from "./index";

export default interface Post {
  id: string;
  title: string;
  body: string;
  tags: Tag[];
  timestamp: Timestamp;
}
