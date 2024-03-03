import {
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  CollectionReference,
  DocumentData,
  DocumentSnapshot,
  DocumentReference,
  FirestoreDataConverter,
} from "@firebase/firestore";

import { db } from "../plugins/firebase";

type Client = {
  $get: ({ path, id }: { path: string; id: string }) => Promise<DocumentData>;
  $list: (collection: CollectionReference) => Promise<DocumentData[]>;
  $create: ({
    collection,
    data,
  }: {
    collection: CollectionReference<DocumentData>;
    data: DocumentData;
  }) => Promise<{
    [key: string]: string;
    id: string;
    status: string;
  }>;
  $mutate: ({
    path,
    id,
    data,
  }: {
    path: string;
    id: string;
    data: Object;
  }) => void;
  $delete: ({ path, id }: { path: string; id: string }) => void;
};

const Client = (): Client => ({
  $get: async ({ path, id }) => {
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
  $list: async (collection: CollectionReference) => {
    try {
      const data: DocumentData[] = [];
      const snapshot = await getDocs(collection);

      snapshot.forEach((doc) => {
        const item = { ...doc.data(), id: doc.id };

        data.push(item);
      });

      return data;
    } catch (error) {
      throw Error(`@client.ts::Client.$list ${error}`);
    }
  },
  $create: async ({ collection, data }) => {
    try {
      const docRef: DocumentReference = await addDoc(collection, data);
      const docSnap: DocumentSnapshot = await getDoc(docRef);

      return {
        ...docSnap.data(),
        id: docSnap.id,
        status: "created",
      };
    } catch (error) {
      throw Error(`@client.ts::Client.$create ${error}`);
    }
  },
  $mutate: async ({ path, id, data }) => {
    try {
      const docRef = doc(db, path, id);

      await setDoc(docRef, data);
    } catch (error) {
      throw Error(`@client.ts::Client.$mutate ${error}`);
    }
  },
  $delete: async ({ path, id }) => {
    try {
      const docRef = doc(db, path, id);

      await deleteDoc(docRef);
    } catch (error) {
      throw Error(`@client.ts::Client.$delete ${error}`);
    }
  },
});

export default Client;
