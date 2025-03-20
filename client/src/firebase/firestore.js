import { db } from './firebase';
import { collection, addDoc, query, orderBy, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export const createPost = async (post) => {
    try {
        await addDoc(collection(db, 'posts'), {
            ...post,
            timestamp: new Date(),
        });
    } catch (error) {
        console.error('Error creating post:', error.message);
        throw error;
    }
};

export const getPosts = async () => {
    const postsCollection = collection(db, "posts");
    const q = query(postsCollection, orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);

    const posts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return posts;
};

export const getPostById = async (postId) => {
    try {
        const postRef = doc(db, "posts", postId);
        const postSnap = await getDoc(postRef);

        if (postSnap.exists()) {
            return { id: postSnap.id, ...postSnap.data() };
        } else {
            throw new Error("Post not found");
        }
    } catch (error) {
        console.error("Error fetching post:", error);
        throw error;
    }
};

export const updatePost = async (postId, updatedData) => {
    try {
        const postRef = doc(db, "posts", postId);
        await updateDoc(postRef, updatedData);
    } catch (error) {
        console.error("Error updating post:", error.message);
        throw error;
    }
};

export const deletePost = async (postId) => {
    try {
        const postRef = doc(db, "posts", postId);
        await deleteDoc(postRef)
    } catch (error) {
        console.error("Error deleting post:", error.message);
        throw error;
    }
}

export const createComments = async (postId, commentData) => {
    const commentsCollection = collection(db, "posts", postId, "comments");
    await addDoc(commentsCollection, commentData);
}

export const getCommentByPostId = async (postId) => {
    try {
        const commentsCollection = collection(db, "posts", postId, "comments");
        const q = query(commentsCollection, orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q); // GET ALL DOCS (COMMENTS) THAT MATCH IN POSTS
        const comments = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return comments;
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
}
