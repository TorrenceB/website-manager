import { getDownloadURL, uploadBytes, getStorage, ref } from "firebase/storage";

import "../plugins/firebase";

interface Upload {
  file: File;
  path: string;
}

interface Storage {
  $upload: ({ file, path }: Upload) => void;
  $download: (path: string) => Promise<string>;
}

const storage = getStorage();

const Storage = (): Storage => ({
  $upload: async ({ path, file }: Upload) => {
    try {
      const storageRef = ref(storage, path);

      await uploadBytes(storageRef, file);
    } catch (error) {
      throw Error(`@storage.ts::Storage.$upload ${error}`);
    }
  },
  $download: async (path: string) => {
    try {
      const storageRef = ref(storage, path);
      const url = await getDownloadURL(storageRef);

      return url;
    } catch (error) {
      throw Error(`@storage.ts::Storage.$download ${error}`);
    }
  },
});

export default Storage;
