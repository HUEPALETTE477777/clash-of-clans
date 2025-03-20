import React from 'react';
import PostList from '../components/PostList';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>COMMUNITY COC BASE POSTS</h1>
      <PostList />
    </div>
  );
};

export default Home;
