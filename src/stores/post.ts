import { defineStore } from "pinia";
import { ref } from "vue";
import { postService } from "@/services/postService";
import type { Post, FeedType, Pagination, CreatePostData } from "@/types/post";

export const usePostStore = defineStore("post", () => {
  // State
  const posts = ref<Post[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const pagination = ref<Pagination | null>(null);
  const currentFeedType = ref<FeedType>("for_you");

  // Actions
  async function fetchFeed(
    feedType: FeedType = "for_you",
    page: number = 1,
    append: boolean = false
  ) {
    loading.value = true;
    error.value = null;

    try {
      const response = await postService.getFeed(feedType, page);

      if (response.success) {
        if (append) {
          posts.value = [...posts.value, ...response.data];
        } else {
          posts.value = response.data;
        }
        pagination.value = response.pagination;
        currentFeedType.value = feedType;
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || "Không thể tải bài đăng";
      console.error("Failed to fetch feed:", err);
    } finally {
      loading.value = false;
    }
  }

  async function getPostById(postId: number): Promise<Post | null> {
    loading.value = true;
    error.value = null;

    try {
      const post = await postService.getPostById(postId);
      return post.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Không thể tải bài viết";
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function createPost(data: CreatePostData) {
    loading.value = true;
    error.value = null;

    try {
      const response = await postService.createPost(data);
      if (response.success) {
        // Refresh feed sau khi tạo bài mới
        await fetchFeed(currentFeedType.value);
        return { success: true };
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || "Không thể tạo bài đăng";
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  async function toggleLike(postId: number) {
    try {
      const response = await postService.toggleLike(postId);

      if (response.success) {
        // Cập nhật state local
        const post = posts.value.find((p) => p.id === postId);
        if (post) {
          post.is_liked_by_auth = response.data.is_liked;
          post.likes_count = response.data.likes_count;
        }
      }
    } catch (err: any) {
      console.error("Failed to toggle like:", err);
      error.value = err.response?.data?.message || "Không thể thích bài đăng";
    }
  }

  async function loadMore() {
    if (
      !pagination.value ||
      pagination.value.current_page >= pagination.value.last_page
    ) {
      return;
    }

    await fetchFeed(
      currentFeedType.value,
      pagination.value.current_page + 1,
      true
    );
  }

  function clearPosts() {
    posts.value = [];
    pagination.value = null;
  }

  return {
    // State
    posts,
    loading,
    error,
    pagination,
    currentFeedType,

    // Actions
    fetchFeed,
    createPost,
    toggleLike,
    loadMore,
    clearPosts,
    getPostById,
  };
});
