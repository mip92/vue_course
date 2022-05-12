<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input v-model="searchValue"
              type="text"
              placeholder="Поиск..."/>
    <div class="app_buttons">
      <my-button class="createPostBtn" @click="openDialog">Создать пост</my-button>
      <my-selector :options="sortOptions" v-model='selectedSort'></my-selector>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>
    <post-list v-if="!isPostsLoading" @removePost='removePost' :posts="sortedAndSearchedPosts"/>
    <div v-else>Загрузка</div>
    <div ref="observer" class="observer"></div>
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
import axios from "axios";


export default {
  components: {PostList, PostForm},
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      sortOptions: [
        {value: 'id', name: "По id"},
        {value: 'title', name: "По названию"},
        {value: 'body', name: "По содержанию"}
      ],
      searchValue: "",
      currentPage: 1,
      limit: 10,
      totalPages: 0
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    /*    changeCurrentPage(pageNumder){
          this.currentPage=pageNumder
        },*/
    removePost(post) {
      this.posts = this.posts.filter((p) => {
        return p.id !== post.id
      })
    },
    openDialog() {
      this.dialogVisible = true
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: this.limit,
            _page: this.currentPage
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.isPostsLoading = false
      }
    },
    async loadMorePosts() {
      try {
        this.currentPage += 1
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: this.limit,
            _page: this.currentPage
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data]
      } catch (e) {
        console.log(e)
      } finally {
      }
    }
  },
  mounted() {
    this.fetchPosts()
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = (entries, observer) => {
      if ((entries[0].isIntersecting) && (this.currentPage < this.totalPages)) {
        this.loadMorePosts()
      }
    }
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer)
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        if (this.selectedSort === 'id') return post1[this.selectedSort] - post2[this.selectedSort]
        else return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchValue.toLowerCase()))
    }
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