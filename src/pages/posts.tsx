import { createPost, fetchPosts } from "@/lib/api";
import { Post } from "@/types/types";
import { useEffect, useState } from "react";
import CreatePostForm from "./components/CreatePostForm";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const fetchData = async () => {
    try {
      const res = await fetchPosts();
      setPosts(res);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      body: { value: string };
    };
    const id = crypto.randomUUID();
    const userId = crypto.randomUUID();
    const title = target.title.value;
    const body = target.body.value;
    await createPost({ id, userId, title, body });
    setPosts([...posts, { id, userId, title, body }]);
  };
  return (
    <div>
      <CreatePostForm handleSubmit={handleSubmit} />
      <h1>Posts</h1>
      {posts.map((post: Post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
