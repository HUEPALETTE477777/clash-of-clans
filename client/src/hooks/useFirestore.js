import { useState, useEffect } from 'react';
import { getPosts } from '../firebase/firestore';

const useFirestore = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPosts();
      setPosts(data);
    };
    fetchData();
  }, []);

  return posts;
};

export default useFirestore;
