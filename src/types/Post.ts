import { Timestamp } from "firebase/firestore";

export default interface Post {
  id: String;
  title: string;
  body: string;
  tags: { id: string; title: string }[];
  timestamp: Timestamp;
}
