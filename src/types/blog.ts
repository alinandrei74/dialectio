export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author_id: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  published_at?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  // Joined data
  author?: {
    username: string;
    full_name?: string;
  };
}

export interface BlogPostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  image_url?: string;
  published_at?: string;
  author?: {
    username: string;
    full_name?: string;
  };
}