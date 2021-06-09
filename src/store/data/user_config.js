const state = {
    firstname: '',
    lastname: '',
    birth: '',
    email: '',
    phonenumber: '',
    career: '',
    location: '',
    province: '',
    status: '',
    uid: '',
}

const getters = {
    getUserConfig: (state, getters, rootState) => {
        return {
            firstname: state.firstname,
            lastname: state.lastname,
            birth: state.birth,
            email: state.email,
            phonenumber: state.phonenumber,
            career: state.career,
            location: state.location,
            province: state.province,
            status: state.status,
            uid: state.uid,
        };
    }
}

const actions = {
    setUserConfig: ({ commit, state }, payload) => {
        commit('SET_USER', payload)
    }
}

const mutations = {
    SET_USER(state, payload) {
        state.firstname = payload.firstname
        state.lastname = payload.lastname
        state.birth = payload.birth
        state.email = payload.email
        state.phonenumber = payload.phonenumber
        state.career = payload.career
        state.location = payload.location
        state.province = payload.province
        state.status = payload.status
        state.uid = payload.uid
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}