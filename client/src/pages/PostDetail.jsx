import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, getCommentByPostId, createComments, updatePost, deletePost } from '../firebase/firestore';
import { getAuth } from "firebase/auth";

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedImageUrl, setEditedImageUrl] = useState('');
    const [editedBaseUrl, setEditedBaseUrl] = useState('');
    const [editedContent, setEditedContent] = useState('');

    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        const fetchPost = async () => {
            if (postId) {
                const fetchedPost = await getPostById(postId);
                setPost(fetchedPost);
                // Set the state for editing fields
                setEditedTitle(fetchedPost.title);
                setEditedImageUrl(fetchedPost.imageUrl);
                setEditedBaseUrl(fetchedPost.copyBaseUrl);
                setEditedContent(fetchedPost.content);
            }
        };
        fetchPost();
    }, [postId]);

    const fetchComments = async () => {
        try {
            const fetchedComments = await getCommentByPostId(postId);
            setComments(fetchedComments);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    useEffect(() => {
        if (postId) {
            fetchComments();
        }
    }, [postId]);

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (user && commentContent) {
            const commentData = {
                content: commentContent,
                username: user.displayName,
                profilePicture: user.photoURL,
                timestamp: new Date(),
            };
            try {
                await createComments(postId, commentData);
                setCommentContent('');
                fetchComments();
            } catch (error) {
                console.error("Error adding comment:", error);
            }
        }
    };

    const handleUpdatePost = async () => {
        if (user && post) {
            const updatedData = {
                title: editedTitle,
                imageUrl: editedImageUrl,
                copyBaseUrl: editedBaseUrl,
                content: editedContent,
            };
            try {
                await updatePost(postId, updatedData);
                setPost(prev => ({ ...prev, ...updatedData }));
                setIsEditing(false);
            } catch (error) {
                console.error("Error updating post:", error);
            }
        }
    };

    const handleDeletePost = async () => {
        try {
            await deletePost(postId);
            navigate('/');
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    if (!post) {
        return <p>Loading post...</p>;
    }

    const handleButtonClick = () => {
        if (post.copyBaseUrl) {
            window.open(post.copyBaseUrl, '_blank', 'noopener, noreferrer');
        }
    };

    return (
        <div className="w-full p-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <img
                src={post.imageUrl}
                alt="Post Image"
                className="w-full h-screen"
            />
            <div className="flex items-center gap-4 p-4 bg-primary text-white">
                <h2 className="text-2xl">Created By:</h2>
                <img src={post.profilePicture} className="rounded-full size-20" />
                <h2 className="text-2xl">{post.displayName}</h2>
                <h3>Created on: {new Date(post.timestamp.toDate()).toLocaleString()}</h3>
            </div>
            {isEditing ? (
                <div className="mt-4">
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                        placeholder="Title"
                    />
                    <input
                        type="text"
                        value={editedImageUrl}
                        onChange={(e) => setEditedImageUrl(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                        placeholder="Image URL"
                    />
                    <input
                        type="text"
                        value={editedBaseUrl}
                        onChange={(e) => setEditedBaseUrl(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                        placeholder="Base URL"
                    />
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                        rows="4"
                    />
                    <button onClick={handleUpdatePost} className="mt-2 p-2 bg-primary-light text-white hover:bg-primary">
                        Save Changes
                    </button>
                    <button onClick={() => setIsEditing(false)} className="mt-2 p-2 bg-gray-300 text-white hover:bg-gray-400">
                        Cancel
                    </button>
                </div>
            ) : (
                <p className="text-gray-700 text-lg">Content: {post.content}</p>
            )}
            {post.copyBaseUrl && (
                <div className="mt-4">
                    <p>BASE URL:
                        <a
                            href={post.copyBaseUrl}
                            className="hover:bg-blue-500 hover:underline cursor-pointer"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {post.copyBaseUrl}
                        </a>
                    </p>
                    <button onClick={() => window.location.href = post.copyBaseUrl}
                        className="mt-2 p-2 bg-primary-light text-white hover:bg-primary"
                    >
                        Open Base URL
                    </button>
                </div>
            )}

            {/* CONDITIONAL EDIT AND DELETE BUTTONS */}
            {user && post.userId === user.uid && (
                <div className="flex gap-4">
                    {!isEditing && (
                        <button onClick={() => setIsEditing(true)} className="mt-4 p-2 bg-blue-500 text-white hover:bg-blue-600">
                            Edit Post
                        </button>
                    )}
                    <button onClick={handleDeletePost} className="mt-4 p-2 bg-red-500 text-white hover:bg-red-600">
                        Delete Post
                    </button>
                </div>
            )}

            {/* COMMENT SECTION */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Comments</h2>

                {/* COMMENT DISPLAY */}
                {comments.length > 0 ? (
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <div key={comment.id} className="p-4 border border-black">
                                <div className="flex">
                                    <img src={comment.profilePicture} className="w-1/12 rounded-full" />
                                    <div className="flex flex-col ml-4">
                                        <div className="flex items-center gap-4">
                                            <h4 className="text-xl font-semibold">{comment.username}</h4>
                                            <p className="text-sm text-gray-500">Created on: {new Date(comment.timestamp.toDate()).toLocaleString()}</p>
                                        </div>
                                        <p className="mt-2">{comment.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No comments yet. Be the first to comment!</p>
                )}

                {/* COMMENT INPUT */}
                {user ? (
                    <form onSubmit={handleAddComment} className="mt-4 flex flex-col gap-4">
                        <textarea
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            placeholder="Add a comment"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            rows="4"
                        />
                        <button type="submit" className="p-2 bg-primary-light text-white hover:bg-primary">
                            Submit Comment
                        </button>
                    </form>
                ) : (
                    <p className="mt-4 text-gray-700">Log in to create comments</p>
                )}
            </div>
        </div>
    );
};

export default PostDetail;
