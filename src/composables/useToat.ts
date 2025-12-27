import { useToast as useVueToast } from "vue-toastification";
import type { PluginOptions, POSITION } from "vue-toastification";

type ToastType = "success" | "error" | "info" | "warning";

export const useToast = () => {
  const toast = useVueToast();

  const showToast = (
    message: string,
    type: ToastType = "info",
    options?: Partial<PluginOptions>
  ) => {
    const defaultOptions: Partial<PluginOptions> = {
      timeout: 3000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: false,
      closeButton: "button",
      icon: true,
      rtl: false,
      ...options,
    };

    switch (type) {
      case "success":
        toast.success(message, defaultOptions);
        break;
      case "error":
        toast.error(message, defaultOptions);
        break;
      case "warning":
        toast.warning(message, defaultOptions);
        break;
      case "info":
      default:
        toast.info(message, defaultOptions);
        break;
    }
  };

  return {
    showToast,
    success: (msg: string, options?: Partial<PluginOptions>) =>
      showToast(msg, "success", options),
    error: (msg: string, options?: Partial<PluginOptions>) =>
      showToast(msg, "error", options),
    info: (msg: string, options?: Partial<PluginOptions>) =>
      showToast(msg, "info", options),
    warning: (msg: string, options?: Partial<PluginOptions>) =>
      showToast(msg, "warning", options),
  };
};
