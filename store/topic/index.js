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
    return state.children.slice().push(state.parent)
  },

  getChildrenTopicsLength(state) {
    if (state.children) {
      return state.children.length
    } else {
      return 0
    }
  },

  getTopicsTag(state) {
    if (state.parent.sub.length || state.parent.originCategoryID) {
      const parseID = (category) => {
        category.id = parseInt(category.id)
        return category
      }

      const origin = state.parent.originCategoryID
        ? {
            id: state.parent.originCategoryID,
            name: state.parent.originCategoryName,
            isOrigin: true
          }
        : null

      if (origin && state.parent.sub.length) {
        return []
          .slice()
          .concat(origin)
          .concat(state.parent.sub)
          .map(parseID)
      } else if (!origin && state.parent.sub.length) {
        return state.parent.sub.map(parseID)
      }

      // TODO:

      // return state.parent.sub
      //   .slice()
      //   .map(parseID)
      //   .concat({
      //     id: state.parent.originCategoryID,
      //     name: state.parent.originCategoryName,
      //     isOrigin: true
      //   })
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
  }
}
