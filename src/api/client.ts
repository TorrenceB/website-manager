import {
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  Query,
} from "@firebase/firestore";

import { db } from "../plugins/firebase";

export const Client = () => ({
  $get: async ({ id, path }: { id: string; path: string }) => {
    try {
      const docRef = doc(db, path, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return Error();
      }
    } catch (error) {
      console.error("@client.ts::Client.$get", error);
    }
  },
  $list: async ({ query }: { query: Query }) => {
    try {
      const data: Array<object> = [];
      const snapshot = await getDocs(query);

      snapshot.forEach((doc) => {
        const item = {
          ...(doc.data() as object),
          id: doc.id,
        };

        data.push(item);
      });

      return data;
    } catch (error) {
      console.error("@client.ts::Client.$list", error);
    }
  },
  $create: async () => {},
  $mutate: async () => {},
  $delete: async () => {},
});
