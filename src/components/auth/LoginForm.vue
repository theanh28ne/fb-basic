<template>
  <form @submit.prevent="handleSubmit" class="w-full max-w-md flex flex-col gap-6 p-8">
    <h2 class="text-3xl font-bold text-gray-900 text-center">Đăng nhập</h2>
    <p class="text-gray-600 text-center -mt-2">Chào mừng bạn quay trở lại!</p>

    <div v-if="errorMessage" class="px-4 py-3.5 rounded-lg text-sm bg-red-50 text-red-600 border border-red-200">
      {{ errorMessage }}
    </div>

    <Input
      id="login"
      v-model="formData.login"
      label="Email hoặc Username"
      type="text"
      placeholder="Nhập email hoặc username"
      required
      :error="errors.login"
    />

    <Input
      id="password"
      v-model="formData.password"
      label="Mật khẩu"
      type="password"
      placeholder="Nhập mật khẩu"
      required
      :error="errors.password"
    />

    <Button
      type="submit"
      variant="primary"
      :loading="loading"
      custom-class="w-full mt-2"
    >
      Đăng nhập
    </Button>

    <div class="text-center pt-4 border-t border-gray-200">
      <p class="text-gray-600">
        Chưa có tài khoản?
        <router-link to="/register" class="text-blue-500 font-semibold hover:underline ml-1">Đăng ký ngay</router-link>
      </p>
      <p class="text-gray-600">
        Quên mật khẩu?
        <router-link to="/forgotPassword" class="text-blue-500 font-semibold hover:underline ml-1">Đặt lại mật khẩu</router-link>
      </p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Input from '@/components/common/Input.vue'
import Button from '@/components/common/Button.vue'

const router = useRouter()
const authStore = useAuthStore()

const formData = reactive({
  login: '',
  password: '',
})

const errors = reactive({
  login: '',
  password: '',
})

const loading = ref(false)
const errorMessage = ref('')

const validateForm = () => {
  let isValid = true
  
  // Reset errors
  errors.login = ''
  errors.password = ''

  if (!formData.login.trim()) {
    errors.login = 'Vui lòng nhập email hoặc username'
    isValid = false
  }

  if (!formData.password) {
    errors.password = 'Vui lòng nhập mật khẩu'
    isValid = false
  } else if (formData.password.length < 6) {
    errors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  errorMessage.value = ''

  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    const result = await authStore.login({
      login: formData.login,
      password: formData.password,
    })

    if (result?.success) {
      router.push('/feed')
    } else {
      errorMessage.value = result?.error || 'Đăng nhập thất bại'
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'Có lỗi xảy ra, vui lòng thử lại'
  } finally {
    loading.value = false
  }
}
</script>
