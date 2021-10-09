import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import { router } from "@/router";
import { today, thisWeek, thisMonth, Post } from "@/data";
import 'highlight.js/styles/atom-one-dark.css';

function delay() {
  return new Promise((res) => {
    setTimeout(res, 2000);
  });
}

// @ts-ignore
axios.get = async (url: string) => {
  if (url === "/posts") {
    await delay();
    return Promise.resolve({
      data: [today, thisWeek, thisMonth],
    });
  }
};

createApp(App)
  .use(router)
  .mount("#app");
