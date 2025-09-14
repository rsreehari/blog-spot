
export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: number; // in minutes
  tags: string[];
  imageUrl: string;
  excerpt: string;
}
