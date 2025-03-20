import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createPost } from '../firebase/firestore';
import { uploadImage } from '../firebase/storage';

const PostForm = () => {
    const { user } = useAuth();
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [copyBaseUrl, setCopyBaseUrl] = useState('');

    const submitHandle = async (e) => {
        e.preventDefault();

        if (!user) {
            console.error('User is not authenticated');
            return;
        }

        console.log('Submitting post:', { title, content, image });

        try {
            let imageUrl = '';
            if (image) {
                imageUrl = await uploadImage(image);
            }
            await createPost({
                title,
                content,
                timestamp: new Date(),
                userId: user.uid,
                displayName: user.displayName || "Anonymous",
                profilePicture: user.photoURL || "default-profile.png",
                imageUrl: imageUrl,
                copyBaseUrl: copyBaseUrl,
            });
            setTitle('');
            setContent('');
            setImage(null);
            setCopyBaseUrl('');
        } catch (error) {
            console.error('Error creating post:', error.message);
        }
    };

    const image_change_handle = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    return (
        <form onSubmit={submitHandle} className="max-w-lg mx-auto p-4 bg-gray-100">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create a Post</h2>
            <div className="flex flex-col gap-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                    className="p-2 border border-gray-300 focus:outline-none"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                    required
                    className="p-2 border border-gray-300 focus:outline-none"
                    rows="5"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={image_change_handle}
                />
                <input
                    type="text"
                    value={copyBaseUrl}
                    onChange={(e) => setCopyBaseUrl(e.target.value)}
                    placeholder="Enter Base URL"
                    className="p-2 border border-gray-300 focus:outline-none"
                />
                <button type="submit" className="p-4 w-full bg-primary-light text-white rounded-md shadow-md hover:bg-primary">
                    Post
                </button>
            </div>
        </form>
    );
};

export default PostForm;
