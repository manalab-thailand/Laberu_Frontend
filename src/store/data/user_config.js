const state = {
  _id: "",
  firstname: "",
  lastname: "",
  birth: "",
  email: "",
  phonenumber: "",
  career: "",
  studentId: "",
  location: "",
  province: "",
  status: "",
  uid: ""
};

const getters = {
  getUserConfig: (state, getters, rootState) => {
    return {
      _id: state._id,
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
      studentId: state.studentId
    };
  },
  getUserRegister: state => {
    return {
      uid: state.uid,
      email: state.email
    };
  }
};

const actions = {
  setUserConfig: ({ commit, state }, payload) => {
    commit("SET_USER", payload);
  },
  setUserRegister: ({ commit, state }, payload) => {
    commit("SET_REGISTER", payload);
  }
};

const mutations = {
  SET_USER(state, payload) {
    state._id = payload._id;
    state.firstname = payload.firstname;
    state.lastname = payload.lastname;
    state.birth = payload.birth;
    state.email = payload.email;
    state.phonenumber = payload.phonenumber;
    state.career = payload.career;
    state.location = payload.location;
    state.province = payload.province;
    state.status = payload.status;
    state.studentId = payload.studentId;
    state.uid = payload.uid;
  },
  SET_REGISTER(state, payload) {
    state.email = payload.email;
    state.uid = payload.uid;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
