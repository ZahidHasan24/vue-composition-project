import { createApp } from "vue";
import App from "@/App.vue";
import axios from "axios";
import { router } from "@/router";
import { random } from "lodash";
import { today, thisWeek, thisMonth, Post } from "@/data";
import "highlight.js/styles/atom-one-dark.css";
import { store } from "@/store";

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

// @ts-ignore
axios.post = async (url: string, post: Post) => {
  if (url === "/posts") {
    const id = random(100, 1000);
    await delay();
    return Promise.resolve({
      data: {
        ...post,
        id,
      },
    });
  }
};

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");
