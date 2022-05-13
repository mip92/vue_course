import axios from "axios";

export const postModule = {
    state: () => {
        return {
            posts: [],
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
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => {
                if (state.selectedSort === 'id') return post1[state.selectedSort] - post2[state.selectedSort]
                else return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
            })
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchValue.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setSearchValue(state, searchValue) {
            state.searchValue = searchValue
        },
        setCurrentPage(state, currentPage) {
            state.currentPage = currentPage
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        removePost(state, post) {
            console.log(state, post)
            state.posts = state.posts.filter((p) => {
                return p.id !== post.id
            })
        },
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit('setLoading', true)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _limit: state.limit,
                        _page: state.currentPage
                    }
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', response.data)
            } catch (e) {
                console.log(e)
            } finally {
                commit('setLoading', false)
            }
        },
        async loadMorePosts({state, commit}) {
            try {
                console.log(123)
                console.log()
                if (state.currentPage < state.totalPages) {
                    commit('setCurrentPage', state.currentPage += 1)
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _limit: state.limit,
                            _page: state.currentPage
                        }
                    })
                    commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                    commit('setPosts', [...state.posts, ...response.data])
                }
            } catch (e) {
                console.log(e)
            } finally {
            }
        }
    },
    namespaced: true
}