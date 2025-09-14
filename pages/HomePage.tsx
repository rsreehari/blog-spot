
import React, { useState } from 'react';
import { useBlogData } from '../hooks/useBlogData';
import PostCard from '../components/PostCard';
import SearchInput from '../components/SearchInput';
import Spinner from '../components/Spinner';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { posts, isLoading, error } = useBlogData(searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const categories = ['All', 'Web Development', 'AI', 'Design', 'Frontend', 'React', 'CSS'];

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.tags.some(tag => 
        tag.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        selectedCategory.toLowerCase().includes(tag.toLowerCase())
      ));

  const renderContent = () => {
    if (isLoading) {
      return <Spinner />;
    }

    if (error) {
      return <p className="text-center text-red-500">{error}</p>;
    }

    if (filteredPosts.length === 0) {
      return <p className="text-center text-slate-500">No posts found.</p>;
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, index) => (
          <div key={post.id} className="stagger-animation" style={{ animationDelay: `${index * 0.1}s` }}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl hero-bg text-white py-20 px-8 text-center">
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 responsive-text-5xl">
            Insights & Ideas
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Discover the latest trends in web development, AI, design, and technology. 
            Join thousands of developers staying ahead of the curve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn-primary text-lg px-8 py-4 shadow-2xl">
              Start Reading
            </button>
            <button className="glass-morphism text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/30 transition-all duration-300">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/10"></div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
          <div className="text-slate-600 font-medium">Articles</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
          <div className="text-slate-600 font-medium">Readers</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="text-3xl font-bold text-green-600 mb-2">25+</div>
          <div className="text-slate-600 font-medium">Topics</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
          <div className="text-3xl font-bold text-orange-600 mb-2">5★</div>
          <div className="text-slate-600 font-medium">Rating</div>
        </div>
      </section>
      
      {/* Search Section */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-slate-800">Find Your Next Read</h2>
        <SearchInput value={searchQuery} onChange={handleSearchChange} />
      </section>

      {/* Category Filter */}
      <section id="categories" className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-800 text-center">Browse by Category</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-filter px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Posts */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Dive deep into topics that matter to modern developers and designers.
          </p>
        </div>
        {renderContent()}
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="newsletter-bg rounded-3xl text-white py-16 px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl opacity-90 mb-8">
            Get the latest articles and insights delivered straight to your inbox. 
            Join our community of passionate developers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg text-slate-800 focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-slate-50 rounded-3xl py-16 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-800 mb-6">About Awesome Blog</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            We're a community of passionate developers, designers, and tech enthusiasts 
            sharing knowledge and insights about the ever-evolving world of technology. 
            Our mission is to make complex topics accessible and help you stay ahead in your career.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Quality Content</h3>
              <p className="text-slate-600">In-depth articles written by industry experts</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Latest Trends</h3>
              <p className="text-slate-600">Stay updated with the newest technologies</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Community</h3>
              <p className="text-slate-600">Join thousands of like-minded developers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
