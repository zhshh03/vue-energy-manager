import { loginApi } from "@/api/user";
import { defineStore } from "pinia";

interface LoginParams {
  username: string;
  password: string;
}

export const useUserStore = defineStore("user", {
  state: () => ({
    token: sessionStorage.getItem("token") || "",
    rolus: sessionStorage.getItem("rolus")
      ? JSON.parse(sessionStorage.getItem("rolus")!)
      : [],
    username: sessionStorage.getItem("username") || "",
    menu: sessionStorage.getItem("menu")
      ? JSON.parse(sessionStorage.getItem("menu")!)
      : [],
  }),
  actions: {
    async login(data: LoginParams) {
      const res = await loginApi(data);
      console.log(res);
      this.token = res.data.token;
      this.rolus = res.data.user.roles;
      this.username = res.data.user.username;
      this.menu = res.data.user.menulist;
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("rolus", JSON.stringify(res.data.user.roles));
      sessionStorage.setItem("username", res.data.user.username);
      sessionStorage.setItem("menu", JSON.stringify(res.data.user.menulist));
    },
    logout() {
      this.token = "";
      this.rolus = [];
      this.username = "";
      this.menu = [];
      sessionStorage.clear();
    },
  },
});
