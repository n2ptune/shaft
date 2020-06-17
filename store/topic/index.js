export const state = () => ({
  parent: null,
  children: null
})

export const getters = {
  getParentTopic(state) {
    return state.parent
  },

  getChildrenTopics(state) {
    return state.children
  },

  getAllTopics(state) {
    const topics = state.children.slice()
    topics.push(state.parent)

    return topics
  },

  getChildrenTopicsLength(state) {
    if (state.children) {
      return state.children.length
    } else {
      return 0
    }
  },

  getTopicsTag(state) {
    if (!state.parent && !state.children) {
      return null
    }

    if (state.parent.sub.length || state.parent.originCategoryID) {
      const origin = state.parent.originCategoryID
        ? {
            id: state.parent.originCategoryID,
            name: state.parent.originCategoryName,
            isOrigin: true
          }
        : null

      if (origin && state.parent.sub.length) {
        // 메인 카테고리가 있고, 서브 카테고리 또한 존재할 때
        return state.parent.sub.slice().concat(origin)
      } else if (!origin && state.parent.sub.length) {
        // 메인 카테고리가 없고, 서브 카테고리만 존재할 때
        return state.parent.sub.slice()
      }
    } else {
      return null
    }
  }
}

export const mutations = {
  setParentTopic(state, topic) {
    state.parent = topic
    state.parent.isRoot = true
  },

  setChildrenTopics(state, topics) {
    state.children = topics
  },

  updateCommentByID(state, { topicID, refreshCommentsData }) {
    let updatedTopic = state.children.filter((topic) => topic.id === topicID)

    if (!updatedTopic.length) {
      updatedTopic = state.parent
    }

    updatedTopic.comments = refreshCommentsData
  },

  clearTopics(state) {
    state.parent = null
    state.children = null
  }
}

export const actions = {
  async fetchTopics({ commit }, id) {
    try {
      const { data } = await this.$axios.get('/api/topics/' + id)

      commit('setParentTopic', data.topics.root)
      commit('setChildrenTopics', data.topics.children)
    } catch (error) {
      this.$router.go(-1)
    }
  },

  async writeComment({ commit }, { topicID, comment, date }) {
    // 서버에 댓글과 함께 요청
    // 인터셉터에 의해 헤더가 자동으로 붙음
    // 에러 처리는 호출 한 컴포넌트에서 처리
    const { data: refreshCommentsData } = await this.$axios.post(
      '/api/comments/new',
      {
        topicID,
        comment,
        date
      }
    )

    commit('updateCommentByID', { topicID, refreshCommentsData })
  },

  clearTopics({ commit }) {
    commit('clearTopics')
  }
}
