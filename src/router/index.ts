import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { authService } from "@/services/authService";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/feed",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/LoginView.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/auth/RegisterView.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/reset-password",
    name: "ResetPass",
    component: () => import("@/views/auth/ResetPassView.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/forgotPassword",
    name: "ForgotPassword",
    component: () => import("@/views/auth/ForgetPassView.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/feed",
    name: "Newsfeed",
    component: () => import("@/views/NewsfeedView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/profile/:username?",
    name: "Profile",
    component: () => import("@/views/ProfileView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/post/:id",
    name: "PostDetail",
    component: () => import("@/views/PostDetailView.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  // ✅ THAY ĐỔI CHỖ NÀY
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation guards
router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated();

  // Nếu route yêu cầu đăng nhập
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "Login" });
    return;
  }

  // Nếu route yêu cầu guest (chưa đăng nhập)
  if (to.meta.requiresGuest && isAuthenticated) {
    next({ name: "Newsfeed" });
    return;
  }

  next();
});

export default router;
