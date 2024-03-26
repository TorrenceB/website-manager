import { getDownloadURL, getStorage, ref } from "firebase/storage";

interface Storage {
  $upload: () => void;
  $download: (url: string) => void;
}

const storage = getStorage();

const Storage = (): Storage => ({
  $upload: async () => {},
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
