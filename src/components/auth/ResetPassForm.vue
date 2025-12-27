<template>
  <form @submit.prevent="handleSubmit" class="w-full max-w-md flex flex-col gap-5">
    <h2 class="text-3xl font-bold text-gray-900 text-center">Đặt lại mật khẩu</h2>
    <!-- <p class="text-gray-600 text-center -mt-2">Tạo tài khoản mới để bắt đầu</p> -->

    <div v-if="errorMessage" class="px-4 py-3.5 rounded-lg text-sm bg-red-50 text-red-600 border border-red-200">
      {{ errorMessage }}
    </div>

    <div v-if="successMessage" class="px-4 py-3.5 rounded-lg text-sm bg-green-50 text-green-600 border border-green-200">
      {{ successMessage }}
    </div>

    <Input
      id="password"
      v-model="formData.password"
      label="Mật khẩu"
      type="password"
      placeholder="Tạo mật khẩu"
      required
      :error="errors.password"
    />

    <Input
      id="password_confirmation"
      v-model="formData.password_confirmation"
      label="Xác nhận mật khẩu"
      type="password"
      placeholder="Nhập lại mật khẩu"
      required
      :error="errors.password_confirmation"
    />

    <Button
      type="submit"
      variant="primary"
      :loading="loading"
      custom-class="w-full mt-2"
    >
      Cập nhật mật khẩu
    </Button>

    <div class="text-center pt-4 border-t border-gray-200">
      <p class="text-gray-600">
        Đã có nhớ mật khẩu?
        <router-link to="/login" class="text-blue-500 font-semibold hover:underline ml-1">Đăng nhập</router-link>
      </p>
      
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Input from '@/components/common/Input.vue'
import Button from '@/components/common/Button.vue'


const router = useRouter()
const authStore = useAuthStore()

const route = useRoute();

const token = route.query.token as string;

const formData = reactive({
  password: '',
  password_confirmation: '',
})

const errors = reactive({
  password: '',
  password_confirmation: '',
})

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const validateForm = () => {
  let isValid = true
  
  // Reset errors
  errors.password = ''
  errors.password_confirmation = ''

  // Password validation
  if (!formData.password) {
    errors.password = 'Vui lòng nhập mật khẩu'
    isValid = false
  } else if (formData.password.length < 6) {
    errors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
    isValid = false
  }

  // Password confirmation validation
  if (!formData.password_confirmation) {
    errors.password_confirmation = 'Vui lòng xác nhận mật khẩu'
    isValid = false
  } else if (formData.password !== formData.password_confirmation) {
    errors.password_confirmation = 'Mật khẩu xác nhận không khớp'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''
    console.log(token,
      formData.password,
      formData.password_confirmation,);
    
  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    const result = await authStore.resetPassword({
      token,
      password: formData.password,
      password_confirmation: formData.password_confirmation,
    })

    if (result?.success) {
      successMessage.value = result.message || 'Cập nhật mật khẩu thành công!'
      
      // Redirect sau 2 giây
      setTimeout(() => {
        router.push('/feed')
      }, 2000)
    } else {
      errorMessage.value = result?.message || 'Cập nhật mật khẩu thất bại'
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'Có lỗi xảy ra, vui lòng thử lại'
  } finally {
    loading.value = false
  }
}
</script>
