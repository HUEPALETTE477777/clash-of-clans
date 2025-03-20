import React, { useEffect, useState } from 'react';
import { getPosts } from '../firebase/firestore';
import { Link } from 'react-router-dom';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const fetchedPosts = await getPosts();
            setPosts(fetchedPosts);
        };

        fetchPosts();
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-100 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {
                posts.length > 0 ? (
                    posts.map((post) => (
                        <Link key={post.id} to={`/posts/${post.id}`}>
                            <div key={post.id} className="mb-6 p-4 bg-white rounded-lg shadow-md flex flex-col cursor-pointer hover:scale-105 transition-all">
                                {post.imageUrl && (
                                    <img src={post.imageUrl} className="mb-4 rounded-lg h-72 w-full"/>
                                )}
                                <div className="flex items-start space-x-4">
                                    <img
                                        src={post.profilePicture || "default-profile.png"}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="font-semibold">{post.displayName || "Anonymous"}</h3>
                                            <span className="text-sm text-gray-500">
                                                {post.timestamp ? new Date(post.timestamp.toDate()).toLocaleString() : "No date available"}
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-bold mb-2">{post.title}</h4>
                                        <p className="text-gray-700">{post.content}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No posts available</p>
                )
            }
        </div>
    );
};

export default PostList;
