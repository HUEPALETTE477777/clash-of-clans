import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from './firebase';

const storage = getStorage(app);

export const uploadImage = async (file) => {
    try {
        const imageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(imageRef, file);
        const downloadURL = await getDownloadURL(imageRef);
        return downloadURL;
    } catch (error) {
        console.error("Upload failed:", error);
        throw error;
    }
}