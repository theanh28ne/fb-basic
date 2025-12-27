import api from "./api";
import type {
  PostFeedResponse,
  FeedType,
  CreatePostData,
  Post,
  GetPostResponse,
} from "@/types/post";
import type { LikeResponse } from "@/types/common";

export const postService = {
  // Lấy danh sách bài đăng (newsfeed)
  async getFeed(
    feedType: FeedType = "for_you",
    page: number = 1
  ): Promise<PostFeedResponse> {
    const response = await api.get<PostFeedResponse>("/api/posts/feed", {
      params: {
        type: feedType,
        page,
      },
    });
    return response.data;
  },

  async createPost(data: CreatePostData): Promise<GetPostResponse> {
    const response = await api.post<GetPostResponse>("/api/posts", data);
    return response.data;
  },

  // Like/Unlike bài đăng
  async toggleLike(postId: number): Promise<LikeResponse> {
    const response = await api.post<LikeResponse>(`/api/posts/${postId}/like`);
    return response.data;
  },

  async getPostById(postId: number): Promise<any> {
    // TODO: Implement khi có API
    const response = await api.get<Post>(`/api/posts/${postId}`);
    return response.data;
  },

  // Lấy comments của một post (mock)
  async getComments(postId: number): Promise<any> {
    // TODO: Implement khi có API
    console.log("Getting comments for post:", postId);
    return Promise.resolve([]);
  },

  // Tạo comment (mock)
  async createComment(postId: number, content: string): Promise<any> {
    // TODO: Implement khi có API
    console.log("Creating comment:", postId, content);
    return Promise.resolve({ success: true });
  },
};
