<template>

  <div>
    <h1>Страница с постами</h1>
    <my-input
        v-focus
        :model-value="searchValue"
        @update:model-value="setSearchValue"
        type="text"
        placeholder="Поиск..."/>
    <div class="app_buttons">
      <my-button class="createPostBtn" @click="openDialog">Создать пост</my-button>
      <my-selector :options="sortOptions"
                   @update:model-value="setSortOptions"
                   :model-value='selectedSort'></my-selector>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>
    <post-list v-if="!isPostsLoading"
               @removePost='removePost'
               :posts="sortedAndSearchedPosts"/>
    <div v-else>Загрузка</div>
    <div v-intersection='{loadMorePosts}' class="observer"></div>
    <!--    <div class="page__wrapper">
          <div
              v-for="page in totalPages"
              :key="page"
              class="page"
              :class="{
                'current-page': page === currentPage
              }"
              @click="changeCurrentPage(page)"
          >
            {{ page }}
          </div>
        </div>-->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyButton from "@/components/UI/MyButton";
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'


export default {
  components: {MyButton, PostList, PostForm},
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setCurrentPage: "post/setCurrentPage",
      setSearchValue:"post/setSearchValue",
      setSortOptions:'post/setSelectedSort',
      removePost:"/post/removePost"
    }),
    ...mapActions({
      loadMorePosts: "post/loadMorePosts",
      fetchPosts: "post/fetchPosts",
    }),
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    /*    changeCurrentPage(pageNumder){
          this.currentPage=pageNumder
        },*/
    /*removePost(post) {
      console.log(12)
      this.posts = this.posts.filter((p) => {
        return p.id !== post.id
      })
    },*/
    openDialog() {
      this.dialogVisible = true
    },

  },
  mounted() {
    this.fetchPosts()
    /*    const options = {
          rootMargin: '0px',
          threshold: 1.0
        }
       const callback = (entries, observer) => {
          if ((entries[0].isIntersecting) && (this.currentPage < this.totalPages)) {
            this.loadMorePosts()
          }
        }
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer)*/
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      sortOptions: state => state.post.sortOptions,
      searchValue: state => state.post.searchValue,
      currentPage: state => state.post.currentPage,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      sortedAndSearchedPosts: "post/sortedAndSearchedPosts",
    })
  },

  /*watch: {
    selectedSort(newValue) {
      this.posts.sort((post1, post2) => {
        if (this.selectedSort === 'id') return post1[newValue] - post2[newValue]
        else return post1[newValue]?.localeCompare(post2[newValue])
      })
    },
    currentPage(){
      this.fetchPosts()
      }
  }*/
}
</script>

<style>
.createPostBtn {

}

.app_buttons {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 5px;
}

.current-page {
  border: 2px solid darkcyan;
}

.observer {
  height: 30px;
  background: darkgrey;
}
</style>