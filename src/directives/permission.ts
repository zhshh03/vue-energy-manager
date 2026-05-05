import { useUserStore } from "@/store/auth";
import type { Directive } from "vue";

const permission: Directive = {
  mounted(el: any, binding: any) {
    const userStore = useUserStore();
    if (!userStore.rolus.includes(binding.value)) {
      el.style.display = "none";
    }
  }
}

export default permission