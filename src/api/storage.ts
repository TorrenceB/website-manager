import { getDownloadURL, uploadBytes, getStorage, ref } from "firebase/storage";

interface Storage {
  $upload: ({ file, path }: { file: File; path: string }) => void;
  $download: (url: string) => void;
}

const storage = getStorage();

const Storage = (): Storage => ({
  $upload: async ({ path, file }) => {
    try {
      const storageRef = ref(storage, path);

      await uploadBytes(storageRef, file);
    } catch (error) {
      throw Error(`@storage.ts::Storage.$upload ${error}`);
    }
  },
  $download: async (path = "") => {
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
