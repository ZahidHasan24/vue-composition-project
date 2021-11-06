import { createApp } from "vue";
import App from "@/App.vue";
import axios from "axios";
import { routerWithStore } from "@/router";
import { random } from "lodash";
import { today, thisWeek, thisMonth, Post } from "@/data";
import "highlight.js/styles/atom-one-dark.css";
import { Author, store, User } from "@/store";

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
axios.post = async (url: string, payload: any) => {
  if (url === "/posts") {
    const id = random(100, 1000);
    await delay();
    const post: Post = {
      ...payload,
      id: id.toString(),
      title: payload.title,
      created: payload.created,
      authorId: payload.authorId,
    };
    return Promise.resolve<{ data: Post }>({
      data: post,
    });
  }
  if (url === "/users") {
    const id = random(100, 1000);
    await delay();
    const author: Author = {
      id: id.toString(),
      username: payload.username,
    };
    return Promise.resolve({
      data: author,
    });
  }
};

// @ts-ignore
axios.put = async (url: string, payload: any) => {
  if (url === "/posts") {
    await delay();
    const post: Post = {
      ...payload,
      title: payload.title,
      created: payload.created,
      authorId: payload.authorId,
    };
    return Promise.resolve<{ data: Post }>({
      data: post,
    });
  }
};

const app = createApp(App);
const router = routerWithStore(store);
app.use(router);
app.use(store);
app.mount("#app");
