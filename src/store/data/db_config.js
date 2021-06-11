const state = {
    // databaseUrl: 'http://localhost:3000',
    databaseUrl: 'https://laberu-ptrmd2zvzq-as.a.run.app',
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