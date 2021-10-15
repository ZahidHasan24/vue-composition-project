import { reactive, readonly, provide, inject, App } from "vue";
import axios from "axios";
import { Post, today, thisWeek, thisMonth } from "@/data";

export interface User {
  id: string;
  username: string;
  password: string;
}

interface State {
  posts: PostState;
}

interface PostState {
  ids: string[];
  all: Map<string, Post>;
  loaded: boolean;
}

export class Store {
  private state: State;

  constructor(initialState: State) {
    this.state = reactive(initialState);
  }

  install(app: App) {
    app.provide("store", this);
  }

  getState() {
    return readonly(this.state);
  }

  async createPost(post: Post) {
    const response = await axios.post<Post>("/posts", post);
    this.state.posts.all.set(post.id, response.data);
    this.state.posts.ids.push(post.id);
  }

  async createUser(user: User) {
    console.log({ user });
  }

  async fetchPosts() {
    const response = await axios.get<Post[]>("/posts");
    const postsState: PostState = {
      ids: [],
      all: new Map(),
      loaded: true,
    };
    response.data.forEach((post) => {
      postsState.ids.push(post.id);
      postsState.all.set(post.id, post);
    });
    this.state.posts = postsState;
  }
}

const all = new Map<string, Post>();

export const store = new Store({
  posts: {
    all,
    ids: [],
    loaded: false,
  },
});

export function useStore(): Store {
  const _store = inject<Store>("store");
  if (!_store) {
    throw Error("Did you forgot to call provide?");
  }
  return _store;
}
