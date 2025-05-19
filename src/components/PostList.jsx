import React, { useContext } from 'react';
import Post from './Post';
import { PostList as PostListContext } from '../store/Post-List-Store';

const PostList = () => {
  const { postList } = useContext(PostListContext);
  
  return (
    <div className="container py-4">
      <div className="masonry-grid">
        {postList.map((post) => (
          <div key={post.id} className="masonry-item" style={{ padding: '10px' }}>
            <Post 
              id={post.id}
              title={post.title} 
              text={post.text} 
              image={post.image} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
