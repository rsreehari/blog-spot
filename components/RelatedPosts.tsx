import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';
import { getPosts } from '../services/blogService';

interface RelatedPostsProps {
  currentPost: Post;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentPost }) => {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const allPosts = await getPosts();
        
        // Filter out current post and find related posts based on tags
        const otherPosts = allPosts.filter(post => post.id !== currentPost.id);
        
        // Score posts based on shared tags
        const scoredPosts = otherPosts.map(post => {
          const sharedTags = post.tags.filter(tag => 
            currentPost.tags.some(currentTag => 
              currentTag.toLowerCase() === tag.toLowerCase()
            )
          );
          return {
            ...post,
            score: sharedTags.length
          };
        });

        // Sort by score and take top 3
        const related = scoredPosts
          .sort((a, b) => b.score - a.score)
          .slice(0, 3);

        setRelatedPosts(related);
      } catch (error) {
        console.error('Error fetching related posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [currentPost]);

  if (isLoading || relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">Related Articles</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <article key={post.id} className="group">
            <Link to={`/post/${post.id}`} className="block">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-40 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
