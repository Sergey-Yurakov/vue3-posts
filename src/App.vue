<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <my-input v-model="searchQuery" placeholder="Поиск по заголовкам" />

    <div class="app__btn">
      <my-button class="btn" @click="showDialog"
        >Создать пользователя</my-button
      >

      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list
      :posts="sortedAndSearchPost"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка...</div>
    <div class="observer" ref="observer"></div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import axios from "axios";

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: "",
      sortOptions: [
        {
          value: "title",
          name: "По названию",
        },
        {
          value: "body",
          name: "По содержимому",
        },
      ],
      searchQuery: "",
      page: 1,
      limit: 10,
      totalPages: 0,
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.posts = response.data;
        this.totalPages = +response.headers["x-total-count"];
      } catch (e) {
        alert(`Ошибка: ${e.message}`);
      } finally {
        this.isPostsLoading = false;
      }
    },

    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert(`Ошибка: ${e.message}`);
      }
    },
  },
  mounted() {
    this.fetchPosts();
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback = (entries) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
  computed: {
    sortedPost() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      );
    },
    sortedAndSearchPost() {
      return this.sortedPost.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

.btn {
  margin: 20px 0;
}

.app__btn {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.observer {
  height: 30px;
}
</style>
