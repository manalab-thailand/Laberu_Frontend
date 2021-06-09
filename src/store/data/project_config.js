const state = {
    _id: '',
    config: [],
    labellingCount: 0,
    baseImageUrl: '',
    priceEach: 0,
}

const getters = {
    projectConfig: (state, getters, rootState) => {
        return {
            _id: state._id,
            config: state.config,
            labellingCount: state.labellingCount,
            baseImageUrl: state.baseImageUrl,
            priceEach: state.priceEach,
        };
    }
}

const actions = {
    setProjectConfig: ({ commit, state }, payload) => {
        commit('SET_PROJECT', payload)
    }
}

const mutations = {
    SET_PROJECT(state, payload) {
        state._id = payload._id
        state.labellingCount = payload.labellingCount
        state.baseImageUrl = payload.baseImageUrl
        state.priceEach = payload.priceEach
        state.config = payload.config
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}