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
                  label="อีเมล / e-mail"
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
                  label="รหัสผ่าน / password"
                  v-model="password"
                  name="password"
                  id="password"
                >
                  <template v-slot:prepend>
                    <q-icon name="visibility" />
                  </template>
                </q-input>
              </q-form>
              <div align="center" class="q-mt-xl">
                <q-btn
                  class="q-mt-sm loginBtn"
                  outline
                  @click="onLogin()"
                  color="primary"
                  label="ลงชื่อเข้าใช้งาน / Sign in"
                />
              </div>
              <div class="text-center q-pa-md q-mt-xs q-gutter-md">
                <q-btn round color="red-8" @click="onGmail()">
                  <q-icon name="fab fa-google-plus-g" size="1.5rem" />
                </q-btn>
              </div>
              <q-separator inset />
              <div class="q-gutter-sm" align="center">
                <q-btn
                  class="createaccBtn"
                  flat
                  color="primary"
                  label="สมัครสมาชิก / Create an account"
                  @click="createAccountPage()"
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
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      databaseUrl: "db_config/databaseUrl",
    }),
  },
  components: {
    backgroundDisplay,
    imageDisplay,
  },
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    ...mapActions({
      setUserConfig: "user_config/setUserConfig",
    }),
    onLogin() {
      this.$auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          var user = userCredential.user;
          if (user != null) {
            this.checkLogin(user.uid);
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

    async onGmail() {
      const provider = new this.$firebase.auth.GoogleAuthProvider();
      this.$auth
        .signInWithPopup(provider)
        .then((result) => {
          var user = result.user;
          if (user != null) {
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
        const user = await this.$axios.get(
          `${this.databaseUrl}/user-laberu/checkuserActive`,
          {
            params: {
              uid,
            },
          }
        );

        if (!user) {
          this.$$router.push({ name: "register" });
        } else {
          this.setUserConfig({
            firstname: user.data.firstname,
            lastname: user.data.lastname,
            birth: user.data.birth,
            email: user.data.email,
            phonenumber: user.data.phonenumber,
            career: user.data.career,
            location: user.data.location,
            province: user.data.province,
            status: user.data.status,
            uid: user.data.uid,
          });

          if (user.data.status == "user") {
            this.$router.push({ name: "home" });
          } else {
            this.$router.push({ name: "admin" });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    createAccountPage() {
      this.$router.push({ name: "createaccount" });
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