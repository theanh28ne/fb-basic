<template>
  <form @submit.prevent="handleSubmit" class="w-full max-w-md flex flex-col gap-5">
    <h2 class="text-3xl font-bold text-gray-900 text-center">Quên mật khẩu</h2>
    <p class="text-gray-600 text-center -mt-2">Nhập email để lấy lại mật khẩu</p>

    <div v-if="errorMessage" class="px-4 py-3.5 rounded-lg text-sm bg-red-50 text-red-600 border border-red-200">
      {{ errorMessage }}
    </div>

    <Input
      id="email"
      v-model="formData.email"
      label="Email"
      type="email"
      placeholder="Nhập email"
      required
    />

    <Button
      type="submit"
      variant="primary"
      :loading="loading"
      custom-class="w-full mt-2"
    >
      Đặt lại mật khẩu
    </Button>

  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToat'
import Input from '@/components/common/Input.vue'
import Button from '@/components/common/Button.vue'

const router = useRouter()
const authStore = useAuthStore()
const { showToast } = useToast()

const formData = reactive({
  email: '',
})

const loading = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  errorMessage.value = ''
  loading.value = true

  try {
    const result = await authStore.forgotPassword({
      email: formData.email,
    })

    if (result?.success) {
      // Hiển thị toast thông báo thành công
      showToast('Mã xác thực đã được gửi tới email của bạn. Vui lòng kiểm tra hộp thư!', 'success')
      
      // Chuyển về trang login
      router.push('/login')
    } else {
      errorMessage.value = result?.message || 'Gửi mail thất bại'
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'Có lỗi xảy ra, vui lòng thử lại'
  } finally {
    loading.value = false
  }
}
</script>