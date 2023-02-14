<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <my-input placeholder="Название" v-model.trim="post.title" />
    <my-input placeholder="Описание" v-model.trim="post.body" />
    <my-button class="btn" @click="createPost">Создать</my-button>
  </form>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post);
      this.post = {
        title: "",
        body: "",
      };
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

/*.input {*/
/*  width: 100%;*/
/*  border: 1px solid teal;*/
/*  padding: 10px 15px;*/
/*  margin-top: 15px;*/
/*}*/

.btn {
  align-self: flex-end;
  margin-top: 15px;
}
</style>
