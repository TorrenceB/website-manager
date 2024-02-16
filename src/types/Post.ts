import { Timestamp } from "firebase/firestore";

export default interface Post {
  id: string;
  title: string;
  body: string;
  tags: { id: string; title: string }[];
  timestamp: Timestamp;
}
