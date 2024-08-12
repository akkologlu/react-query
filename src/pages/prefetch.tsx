import { fetchPosts } from "@/lib/api";
import { Post } from "@/types/types";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["prefetchedPosts"],
    queryFn: fetchPosts,
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
const Prefetch = () => {
  const { data } = useQuery({
    queryKey: ["prefetchedPosts"],
    queryFn: fetchPosts,
  });
  return (
    <div>
      {data?.map((post: Post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Prefetch;
