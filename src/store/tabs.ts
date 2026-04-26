import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { MenuItem } from "@/types/user";

const defaultTab: MenuItem = {
  name: "数据看板",
  url: "/dashboard",
  icon: "DataLine",
};
const defaultCurrent = { name: "数据看板", url: "/dashboard" };

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export const useTabsStore = defineStore("tabs", () => {
  const tabs = ref<MenuItem[]>(loadFromStorage("tabs", [defaultTab]));
  const currentTab = ref<{ name: string; url: string }>(
    loadFromStorage("currentTab", defaultCurrent),
  );

  watch(
    tabs,
    (val) => {
      sessionStorage.setItem("tabs", JSON.stringify(val));
    },
    { deep: true },
  );
  watch(
    currentTab,
    (val) => {
      sessionStorage.setItem("currentTab", JSON.stringify(val));
    },
    { deep: true },
  );

  const addTab = (name: string, url: string, icon: string) => {
    if (!tabs.value.some((item) => item.url === url)) {
      tabs.value.push({ name, url, icon });
    }
  };
  const setCurrentTab = (name: string, url: string) => {
    currentTab.value = { name, url };
  };

  return {
    tabs,
    currentTab,
    addTab,
    setCurrentTab,
  };
});
