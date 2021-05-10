<template>
  <q-layout view="lHh Lpr lFf">
    <backgroundDisplay></backgroundDisplay>
    <div class="context">
      <div class="row justify-around">
        <div class="col-lg-1"></div>
        <div class="col-lg-4">
          <q-card-section align="center" style="left: 3rem">
            <div class="text-h4 text-white">
              Image Labelling
              <div class="text-subtitle2 text-white">by LABERU</div>
            </div>
            <div class="q-pa-md">
              <imageDisplay></imageDisplay>
              <div class="q-col-gutter-md row items-start q-mt-xs"></div>
            </div>
          </q-card-section>
        </div>
        <div class="col-lg-1"></div>
        <div class="col-lg-4 q-mt-md">
          <q-card flat bordered class="loginCard">
            <q-card-section>
              <div class="text-h4 text-center q-mt-md q-mb-md">
                ลงชื่อเข้าใช้
              </div>
              <q-form class="text-center">
                <q-input
                  square
                  clearable
                  class="txtInput"
                  type="email"
                  label="E-mail"
                  v-model="email"
                  name="email"
                  id="email"
                >
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
                <q-input
                  square
                  clearable
                  class="txtInput"
                  type="password"
                  label="Password"
                  v-model="password"
                  name="password"
                  id="password"
                >
                  <template v-slot:prepend>
                    <q-icon name="visibility" />
                  </template>
                </q-input>
                <div align="right" class="q-pa-sm">
                  <q-btn
                    flat
                    size="10px"
                    class="forgetPW"
                    label="Forgot password?"
                    style="left: 15px"
                  />
                </div>
              </q-form>
              <div align="center">
                <q-btn
                  class="q-mt-sm loginBtn"
                  outline
                  @click="onLogin()"
                  color="primary"
                  label="Sign in"
                />
              </div>
              <div class="text-center q-pa-md q-gutter-md">
                <q-btn round color="red-8" @click="onGmail()">
                  <q-icon name="fab fa-google-plus-g" size="1.5rem" />
                </q-btn>
              </div>
              <q-separator inset />
              <div class="q-mt-sm q-gutter-sm" align="center">
                <q-btn
                  class="createaccBtn"
                  flat
                  color="primary"
                  label="Create an account"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-lg-2"></div>
      </div>
    </div>
  </q-layout>
</template>

<script>
import backgroundDisplay from "../components/login_animation";
import imageDisplay from "../components/login_image";
import { mapActions } from "vuex";
export default {
  components: {
    backgroundDisplay,
    imageDisplay,
  },
  data() {
    return {
      config: {
        // url: "https://laberu-ptrmd2zvzq-as.a.run.app",
        // url: "http://localhost:8080",
      },
      email: null,
      password: null,
    };
  },
  methods: {
    ...mapActions({
      setUserEmail: "user_email/setUserEmail",
      setUserID: "user_id/setUserID",
      setUserUID: "user_uid/setUserUID",
    }),
    async onLogin() {
      this.$auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          var user = userCredential.user;
          if (user != null) {
            this.setUserUID({ uid: user.uid });
            this.setUserEmail({ email: user.email });
            this.authStateChange();
          }
        })
        .catch((error) => {
          this.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: error.message,
          });
        });
    },

    async authStateChange() {
      this.$auth.onAuthStateChanged((user) => {
        this.checkLogin(user.uid);
      });
    },

    async onGmail() {
      const provider = new this.$firebase.auth.GoogleAuthProvider();
      this.$auth
        .signInWithPopup(provider)
        .then((result) => {
          var user = result.user;
          if (user != null) {
            this.setUserUID({ uid: user.uid });
            this.setUserEmail({ email: user.email });
            this.checkLogin(user.uid);
          }
        })
        .catch((error) => {
          var errorMessage = error.message;
          console.log(errorMessage);
        });
    },
    async checkLogin(uid) {
      try {
        const response = await this.$axios.get(
          `${this.config.url}/user/check_login/uid=${uid}`
        );
        if (response.data.length == 0) {
          this.$router.push({ name: "register" });
        } else if (response.data[0].status == "user") {
          this.setUserID({ id: response.data[0]._id });
          this.$router.push({ name: "index" });
        } else if (response.data[0].status == "admin") {
          this.setUserID({ id: response.data[0]._id });
          this.$router.push({ name: "admin" });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.context {
  width: 100%;
  position: absolute;
  top: 10rem;
}
</style>