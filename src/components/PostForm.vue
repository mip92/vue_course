<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <my-input
        v-model="post.title"
        type="text"
        placeholder="Название поста"
    />
    <my-input
        v-model="post.body"
        type="text"
        placeholder="Описание"/>
    <my-button
        class="btnForm"
        @click="createPost">
      Создать пост
    </my-button>
  </form>
</template>

<script>

export default {
  props: {},
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: '',
        id: '',
      }
    }
  },
  /*watch:{
    post:{
      handler(newValue){
        console.log(newValue)
      },
      deep: true
    }
  }*/
}
</script>

<style scoped>

form {
  display: flex;
  flex-direction: column;
}

.btnForm {
  margin-top: 15px;
  align-self: flex-end;
}

</style>