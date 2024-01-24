import {
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  CollectionReference,
} from "@firebase/firestore";

import { db } from "../plugins/firebase";

const Client = () => ({
  $get: async ({ id, path }: { id: string; path: string }): Promise<any> => {
    try {
      const docRef = doc(db, path, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        throw Error();
      }
    } catch (error) {
      console.error("@client.ts::Client.$get", error);
    }
  },
  $list: async (collection: CollectionReference): Promise<any> => {
    try {
      const data: Array<object> = [];
      const snapshot = await getDocs(collection);

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
  $create: async ({
    collection,
    payload,
  }: {
    collection: CollectionReference;
    payload: {};
  }) => {
    try {
      const docRef = await addDoc(collection, payload);

      return {
        status: "created",
        id: docRef.id,
      };
    } catch (error) {
      console.error("@client.ts::Client.$create", error);
    }
  },
  $mutate: async () => {
    try {
    } catch (error) {}
  },
  $delete: async () => {
    try {
    } catch (error) {}
  },
});

export default Client;
