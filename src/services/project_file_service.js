import { db } from "../firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  deleteDoc,
  where,
  addDoc,
} from "firebase/firestore";

const fileCollection = "files";

export const createFile = async (projectId, name, downloadUrl, type) => {
  try {
    const fileData = {
      projectId: projectId,
      name: name,
      downloadUrl: downloadUrl,
      type: type,
      status: "active",
    };

    const col = collection(db, fileCollection);
    await addDoc(col, fileData);
  } catch (error) {
    throw Error(error);
  }
};

export const getFilesByProjectId = async (projectId) => {
  const q = query(
    collection(db, fileCollection),
    where("projectId", "==", projectId)
  );
  const docs = await getDocs(q);
  let files = [];
  docs.forEach((doc) => {
    files.push({
      fileId: doc.id,
      ...doc.data(),
    });
  });
  return files;
};
export const getFiles = async () => {
  const q = query(
    collection(db, fileCollection),
    where("status", "==", "active")
  );
  const docs = await getDocs(q);
  let files = [];
  docs.forEach((doc) => {
    files.push({
      fileId: doc.id,
      ...doc.data(),
    });
  });
  return files;
};

export const getFileById = async (fileId) => {
  try {
    const docRef = doc(db, fileCollection, fileId);
    const docSnap = await getDocs(docRef);

    if (docSnap.exists()) {
      return {
        fileId: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      return null;
    }
  } catch (error) {
    throw Error(error);
  }
};

export const updateFile = async (fileId, newData) => {
  try {
    const docRef = doc(db, fileCollection, fileId);
    await updateDoc(docRef, newData);
  } catch (error) {
    throw Error(error);
  }
};

export const deleteFile = async (fileId) => {
  try {
    await deleteDoc(doc(db, fileCollection, fileId));
  } catch (error) {
    throw Error(error);
  }
};
