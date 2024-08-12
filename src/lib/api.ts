import { Post } from "@/types/types";
const baseUrl = "http://localhost:3001/posts";
export const fetchPosts = async () => {
  const response = await fetch(`${baseUrl}`);
  return response.json();
};
export const createPost = async (post: Post) => {
  const response = await fetch(`${baseUrl}`, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return response.json();
};
export const deletePost = async (id: number) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const paginatePosts = async (page: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  const totalPosts = response.headers.get("x-total-count");
  return { data, pages: Math.ceil(Number(totalPosts) / 10) };
};
