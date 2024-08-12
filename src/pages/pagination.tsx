import { paginatePosts } from "@/lib/api";
import { Post } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Pagination = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => paginatePosts(page),
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Pagination</h1>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)} disabled={page === data?.pages}>
        Next
      </button>
      {data?.data.map((post: Post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Pagination;
