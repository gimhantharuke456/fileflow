import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseConfig";

export const uploadFile = async (file, path) => {
  try {
    const storageRef = ref(storage, path + file.name);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    throw error;
  }
};
