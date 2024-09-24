import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { deletePost, submitPost } from "@/app/_actions/posts";
import { PostData, PostsPage } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";

export function useSubmitPostMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: submitPost,
    onSuccess: async newPost => {
      const queryFilter: QueryFilters = { queryKey: ["post-feed", "for-you"] };
      await queryClient.cancelQueries(queryFilter);
      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        old => {
          const firstPage = old?.pages[0];
          if (firstPage) {
            return {
              pageParams: old?.pageParams,
              pages: [
                {
                  nextCursor: firstPage.nextCursor,
                  posts: [newPost, ...firstPage.posts],
                },
                ...old?.pages.slice(1),
              ],
            };
          }
        }
      );

      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });

      toast({
        description: "Post submitted successfully.",
      });
    },
    onError: error => {
      console.error(error);
      toast({
        variant: "destructive",
        description: "An error occurred while submitting the post.",
      });
    },
  });

  return mutation;
}

export function useDeletePostMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: async deletedPost => {
      const queryFilter: QueryFilters = { queryKey: ["post-feed"] };
      await queryClient.cancelQueries(queryFilter);
      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        old => {
          if (!old) return;

          return {
            pageParams: old?.pageParams,
            pages: old.pages.map(page => {
              return {
                nextCursor: page.nextCursor,
                posts: page.posts.filter(post => post.id !== deletedPost.id),
              };
            }),
          };
        }
      );

      toast({
        description: "Post deleted successfully.",
      });

      if (pathname === `/posts/${deletedPost.id}`) {
        router.push(`/users/${deletedPost.user.userName}`);
      }
    },
    onError: error => {
      console.error(error);
      toast({
        variant: "destructive",
        description: "An error occurred while deleting the post.",
      });
    },
  });

  return mutation;
}
