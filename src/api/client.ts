import {
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  CollectionReference,
  DocumentData,
} from "@firebase/firestore";

import { db } from "../plugins/firebase";

type Client = {
  $get: ({ id, path }: { id: string; path: string }) => Promise<DocumentData>;
  $list: (collection: CollectionReference) => Promise<DocumentData[]>;
  $create: ({
    collection,
    data,
  }: {
    collection: CollectionReference;
    data: Object;
  }) => Promise<{ status: string; id: string }>;
  $mutate: {};
  $delete: {};
};

const Client = (): Client => ({
  $get: async ({ id, path }) => {
    try {
      const docRef = doc(db, path, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        throw Error("Snapshot is missing.");
      }
    } catch (error) {
      throw Error(`@client.ts::Client.$get ${error}`);
    }
  },
  $list: async (collection) => {
    try {
      const data: DocumentData[] = [];
      const snapshot = await getDocs(collection);

      snapshot.forEach((doc) => {
        const item: { id: string } = {
          ...doc.data(),
          id: doc.id,
        };

        data.push(item);
      });

      return data;
    } catch (error) {
      throw Error(`@client.ts::Client.$list ${error}`);
    }
  },
  $create: async ({ collection, data }) => {
    try {
      const docRef = await addDoc(collection, data);

      return {
        status: "created",
        id: docRef.id,
      };
    } catch (error) {
      throw Error(`@client.ts::Client.$create ${error}`);
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
