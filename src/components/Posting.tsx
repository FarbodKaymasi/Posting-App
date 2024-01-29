import React, { useState } from 'react';
import './../App.css';

const Posting: React.FC = () => {
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [isPostAreaVisible, setPostAreaVisibility] = useState(false);

    const savePost = () => {
        if (!content && !file) {
            return;
        }

        const newPost = {
            content,
            timestamp: new Date().toLocaleString(),
            file,
        };

        const updatedPosts = [...posts, newPost];
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        setPosts(updatedPosts);

        setContent('');
        setFile(null);

        setPostAreaVisibility(false);
    };

    const deletePost = (index: number) => {
        const updatedPosts = [...posts];
        updatedPosts.splice(index, 1);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        setPosts(updatedPosts);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        setFile(selectedFile);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-lg p-4 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl relative text-center font-semibold mb-4 text-red-600">Posting</h1>
                <div className='relative justify-center align-middle text-center text-yellow-600'>
                    {posts.map((post, index) => (
                        <div key={index} className="mb-4 border-2 p-4 rounded-md bg-gray-200 border-gray-200">
                            <p>{post.content}</p>
                            {post.file && (
                                <div className="mt-2">
                                    {post.file.type.startsWith('image') ? (
                                        <img
                                            src={URL.createObjectURL(post.file)}
                                            alt="Post"
                                            className="w-screen h-[300px] object-cover"
                                        />
                                    ) : post.file.type.startsWith('video') ? (
                                        <video
                                            width="400"
                                            height="300"
                                            controls
                                            className="w-screen h-[300px]"
                                        >
                                            <source src={URL.createObjectURL(post.file)} type={post.file.type} />
                                            Error
                                        </video>
                                    ) : (
                                        <p>Error</p>
                                    )}
                                </div>
                            )}
                            <div className='flex justify-between  mt-2'>
                                <button className='bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-500' onClick={() => deletePost(index)}>Delete</button>
                                <small className='text-yellow-600'>{post.timestamp}</small>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mb-4 flex justify-end">
                    <button
                        onClick={() => setPostAreaVisibility(!isPostAreaVisible)}
                        className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-500"
                    >
                        +
                    </button>
                </div>
                {isPostAreaVisible && (
                    <div className="mb-4 text-right mt-10">
                        <label className="block mb-2">
                            <textarea
                                className="border p-2 w-full bg-yellow-50 text-yellow-600"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </label>
                        <label className="block mb-14 relative">
                            <span className="bg-yellow-600 rounded-md py-1 px-3 pl-3 text-white">
                                {file ? file.name : 'Select File'}
                            </span>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                            />
                        </label>
                        <button
                            onClick={savePost}
                            className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-500"
                        >
                            Post
                        </button>
                    </div>
                )}
                
            </div>
        </div>
    );
};

export default Posting;



