import React, { useState, useContext } from 'react';
import { PostList as PostListContext } from '../store/Post-List-Store';

const CreatePost = () => {
  const { addPost } = useContext(PostListContext);
  const [postData, setPostData] = useState({
    title: '',
    text: '',
    image: '',
    tags: []
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleTagChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setPostData(prev => ({
      ...prev,
      tags
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(postData);
    // Reset form
    setPostData({
      title: '',
      text: '',
      image: '',
      tags: []
    });
  };

  return (
    <div className="container py-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Create New Post</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input 
                type="text" 
                className="form-control" 
                id="title"
                name="title"
                value={postData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="text" className="form-label">Content</label>
              <textarea 
                className="form-control" 
                id="text"
                name="text"
                value={postData.text}
                onChange={handleChange}
                rows="3"
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Image URL</label>
              <input 
                type="url" 
                className="form-control" 
                id="image"
                name="image"
                value={postData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
              <div className="form-text">Leave empty for a default image</div>
              {postData.image && (
                <div className="my-3 text-center">
                  <img
                    src={postData.image}
                    alt="Preview"
                    className="img-fluid rounded"
                    style={{ maxHeight: 300, objectFit: 'cover', width: '100%' }}
                  />
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="tags" className="form-label">Tags</label>
              <input 
                type="text" 
                className="form-control" 
                id="tags"
                value={postData.tags.join(', ')}
                onChange={handleTagChange}
                placeholder="tag1, tag2, tag3"
              />
              <div className="form-text">Separate tags with commas</div>
            </div>
            <button type="submit" className="btn btn-primary">Create Post</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
