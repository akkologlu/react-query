import { createPost, fetchPosts } from "@/lib/api";
import { Post } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CreatePostForm from "./components/CreatePostForm";

const TqPosts = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, isSuccess, isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    //enabled: true,
  });

  // const { mutate } = useMutation({
  //   mutationFn: createPost,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["posts"] });
  //   },
  // });

  const { mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      alert("onSuccess");
      queryClient.setQueryData(["posts"], (old: Post[] | undefined) => {
        return old ? [...old, newPost] : [newPost];
      });
    },
    onMutate: () => {
      alert("onMutate");
    },
    onError: (error: Error) => {
      alert(error);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
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
    mutate({ id, userId, title, body });
  };
  return (
    <div>
      {isLoading && <h2>Loading posts...</h2>}
      {isFetching && <h2>Fetching posts...</h2>}
      {isSuccess && <h2>Post fetched successfully</h2>}
      <CreatePostForm handleSubmit={handleSubmit} />
      <h1>Posts with Tanstack Query</h1>
      {data?.map((post: Post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default TqPosts;
