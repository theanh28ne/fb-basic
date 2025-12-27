import api from "./api";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  UserResponse,
  ForgotPasswordResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "@/types/auth";

export const authService = {
  // Đăng ký
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/api/auth/register", data);
    return response.data;
  },

  // Đăng nhập
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/api/auth/login", data);
    return response.data;
  },

  // Lấy thông tin user hiện tại
  async getCurrentUser(): Promise<UserResponse> {
    const response = await api.get<UserResponse>("/api/auth/user");
    return response.data;
  },

  //Quên mật khẩu
  async forgotPassword(
    data: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse> {
    const response = await api.post<ForgotPasswordResponse>(
      "/api/auth/forgot-password",
      data
    );
    return response.data;
  },

  async resetPassword(
    data: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> {
    const response = await api.post<ResetPasswordResponse>(
      "/api/auth/reset-password",
      data
    );
    return response.data;
  },

  // Đăng xuất
  async logout(): Promise<void> {
    // Clear local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
  },

  // Lưu token và user info vào localStorage
  saveAuthData(data: AuthResponse["data"]): void {
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    localStorage.setItem("user", JSON.stringify(data.user));
  },

  // Kiểm tra đã đăng nhập chưa
  isAuthenticated(): boolean {
    return !!localStorage.getItem("access_token");
  },
};
