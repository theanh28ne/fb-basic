import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { authService } from "@/services/authService";
import type { AuthUser } from "@/types/user";
import type {
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "@/types/auth";

export const useAuthStore = defineStore("auth", () => {
  // State
  const user = ref<AuthUser | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const isAuthenticated = computed(() => !!user.value);
  const currentUser = computed(() => user.value);

  // Actions
  async function login(credentials: LoginRequest) {
    loading.value = true;
    error.value = null;

    try {
      const response = await authService.login(credentials);

      if (response.success) {
        user.value = response.data.user;
        authService.saveAuthData(response.data);
        return { success: true };
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || "Đăng nhập thất bại";
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  async function register(data: RegisterRequest) {
    loading.value = true;
    error.value = null;

    try {
      const response = await authService.register(data);

      if (response.success) {
        user.value = response.data.user;
        authService.saveAuthData(response.data);
        return { success: true, message: response.message };
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || "Đăng ký thất bại";
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }

  async function forgotPassword(data: ForgotPasswordRequest) {
    loading.value = true;
    error.value = null;

    try {
      const response = await authService.forgotPassword(data);

      if (!response.success) {
        error.value = response.message;
        return { success: false, message: response.message };
      }

      return {
        success: true,
        message: response.message,
      };
    } catch (err: any) {
      error.value =
        err.response?.data?.message || "Gửi email đặt lại mật khẩu thất bại";

      return {
        success: false,
        message: error.value,
      };
    } finally {
      loading.value = false;
    }
  }

  async function resetPassword(data: ResetPasswordRequest) {
    loading.value = true;
    error.value = null;

    try {
      const response = await authService.resetPassword(data);

      if (!response.success) {
        error.value = response.message;
        return { success: false, message: response.message };
      }

      return {
        success: true,
        message: response.message,
      };
    } catch (err: any) {
      error.value = err.response?.data?.message || "Cập nhật mật khẩu thất bại";

      return {
        success: false,
        message: error.value,
      };
    } finally {
      loading.value = false;
    }
  }

  async function fetchCurrentUser() {
    if (!authService.isAuthenticated()) return;

    loading.value = true;
    try {
      const response = await authService.getCurrentUser();
      if (response.success) {
        user.value = response.data;
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
      // Nếu fetch user fail, có thể token đã hết hạn
      await logout();
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    await authService.logout();
    user.value = null;
  }

  // Initialize từ localStorage khi app khởi động
  function initializeAuth() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser);
      } catch (err) {
        console.error("Failed to parse stored user:", err);
      }
    }
  }

  return {
    // State
    user,
    loading,
    error,

    // Getters
    isAuthenticated,
    currentUser,

    // Actions
    login,
    register,
    logout,
    fetchCurrentUser,
    initializeAuth,
    forgotPassword,
    resetPassword,
  };
});
