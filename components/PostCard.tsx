
import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl card-hover overflow-hidden flex flex-col border border-slate-100">
      <Link to={`/post/${post.id}`} className="block relative overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="tag inline-block text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-bold mb-3 leading-tight">
          <Link to={`/post/${post.id}`} className="hover:text-purple-600 transition-colors duration-300 group-hover:text-purple-600">
            {post.title}
          </Link>
        </h2>
        <p className="text-slate-600 flex-grow leading-relaxed mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center">
            <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full mr-3 ring-2 ring-white shadow-sm" />
            <div>
              <p className="font-semibold text-slate-800 text-sm">{post.author}</p>
              <p className="text-xs text-slate-500">{post.date}</p>
            </div>
          </div>
          <div className="flex items-center text-slate-400 text-sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {post.readTime} min
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
