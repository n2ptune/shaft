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

  deleteTopic(state, { topicID }) {
    const searchIndex = state.children.findIndex(
      (topic) => topic.id === topicID
    )

    if (searchIndex !== -1) {
      state.children.splice(searchIndex, 1)
    }
  },

  modifyComment(state, { commentID, updatedCommentData, updatedAt, isRoot }) {
    if (isRoot) {
      const target = state.parent.comments.filter(
        (comment) => comment.commentID === commentID
      )[0]

      target.commentContent = updatedCommentData
      target.updatedAt = updatedAt
    } else {
      state.parent.children.forEach((child) => {
        const target = child.comments.filter(
          (comment) => comment.commentID === commentID
        )

        if (target.length) {
          target[0].commentContent = updatedCommentData
          target[0].updatedAt = updatedAt
        }
      })
    }
  },

  deleteComment(state, { commentID, topicID }) {
    const searchTarget = (element) => element.commentID === commentID

    const searchParent = state.parent.comments.findIndex(searchTarget)

    if (searchParent !== undefined) {
      state.parent.comments.splice(searchParent, 1)
    } else {
      for (const child of state.children) {
        const searchIndex = child.comments.findIndex(searchTarget)

        if (!searchIndex) continue

        child.comments.splice(searchIndex, 1)
      }
    }
  },

  updateCommentByID(state, { topicID, refreshCommentsData }) {
    const updatedTopic = state.children.filter((topic) => topic.id === topicID)

    if (!updatedTopic.length) {
      updatedTopic[0] = state.parent
    }

    updatedTopic[0].comments = refreshCommentsData
  },

  updateLikeCount(state, { topicID, likeCount }) {
    if (state.parent.id === topicID) {
      // 타겟이 부모 토픽이면
      state.parent.likeCount = likeCount
    } else {
      // 타겟이 자식 토픽이면
      const target = state.children.filter((topic) => topic.id === topicID)[0]
      target.likeCount = likeCount
    }
  },

  clearTopics(state) {
    state.parent = null
    state.children = null
  }
}

export const actions = {
  async fetchTopics({ commit }, id) {
    const { data } = await this.$axios.get('/api/topics/' + id)

    commit('setParentTopic', data.topics.root)
    commit('setChildrenTopics', data.topics.children)
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

  async updateComment({ commit }, { commentID, updatedComment, date }) {
    if (!updatedComment || !commentID)
      throw new Error('댓글 아이디 혹은 내용이 필요합니다.')

    const { data: modifiedCommentData } = await this.$axios.put(
      '/api/comments/update',
      {
        commentID,
        updatedComment,
        date
      }
    )

    commit('modifyComment', {
      commentID: modifiedCommentData.id,
      updatedCommentData: modifiedCommentData.content,
      updatedAt: modifiedCommentData.updatedAt,
      isRoot: modifiedCommentData.isRoot
    })
  },

  async deleteComment({ commit }, { commentID, topicID }) {
    if (!commentID) {
      return
    }

    await this.$axios.delete(`/api/comments/delete/${commentID}`)

    commit('deleteComment', { commentID, topicID })
  },

  clearTopics({ commit }) {
    commit('clearTopics')
  }
}
