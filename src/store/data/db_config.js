const state = {
    databaseUrl: 'http://localhost:3000',
}

const getters = {
    databaseUrl: (state, getters, rootState) => {
        return state.databaseUrl;
    }
}

export default {
    namespaced: true,
    state,
    getters,
}