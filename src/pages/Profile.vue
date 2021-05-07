<template>
  <q-layout view="lHh Lpr lFf">
    <background-display></background-display>

    <q-page-container style="padding-top: 0">
      <div class="context">
        <div class="fixed-center">
          <q-card class="profileCard">
            <q-card-section>
              <div class="row items-center justify-between">
                <q-btn @click="returnIndexPage()" round v-close-popup>
                  <q-icon
                    class="backBtn"
                    name="img:../icons/unknown.png"
                    size="3rem"
                    v-close-popup
                  />
                </q-btn>
                <div class="profileLabel">ข้อมูลส่วนตัว</div>
                <div style="width: 64px; height: 64px"></div>
              </div>
            </q-card-section>
            <div class="col-12">
              <div class="row">
                <div class="col paddingCol">
                  <div class="profileBG">{{ this.userData.fname }}</div>
                </div>
                <div class="col paddingCol">
                  <div class="profileBG">{{ this.userData.lname }}</div>
                </div>
              </div>
              <div class="row">
                <div class="col-3 paddingCol">
                  <div class="profileBG">{{ this.userData.birth }}</div>
                </div>
                <div class="col-3 paddingCol">
                  <div class="profileBG">{{ this.userData.phone_number }}</div>
                </div>
                <div class="col-6 paddingCol">
                  <div class="profileBG">{{ this.userData.email }}</div>
                </div>
              </div>

              <div class="row">
                <div class="col-3 paddingCol">
                  <div class="profileBG">{{ this.userData.career }}</div>
                </div>
                <div class="col-9 paddingCol">
                  <div class="profileBG">{{ this.userData.location }}</div>
                </div>
              </div>

              <div class="row" style="margin: 0 2px">
                <div class="col paddingCol">
                  <div class="totalText">
                    ยอดรวมทั้งหมด : {{ this.userData.countSuccess }}
                  </div>
                </div>
                <div class="col paddingCol">
                  <div class="totalMoneyText">
                    เงินสุทธิ : {{ this.userData.countSuccess }} ฿
                  </div>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import backgroundDisplay from "../components/login_animation";
import { mapGetters } from "vuex";
import Axios from "app/node_modules/axios";
export default {
  computed: {
    ...mapGetters({
      user_email: "user_email/user_email",
      user_id: "user_id/user_id",
      user_uid: "user_uid/user_uid",
    }),
  },
  data() {
    return {
      config: {
        // url: "https://laberu-ptrmd2zvzq-as.a.run.app",
        // url: "http://localhost:8080",
      },
      userData: {
        _id: null,
        fname: null,
        lname: null,
        birth: null,
        phone_number: null,
        email: null,
        career: null,
        location: null,
        countSuccess: null,
        countNotSuccess: null,
      },
    };
  },
  components: {
    backgroundDisplay,
  },
  async mounted() {
    // await this.getUserData();
    // await this.getUserTaskSuccess();
  },
  methods: {
    async getUserData() {
      const response = await Axios.get(
        `${this.config.url}/user/check_login/uid=${this.user_uid}`
      );

      this.userData._id = response.data[0]._id;
      this.userData.fname = response.data[0].firstname;
      this.userData.lname = response.data[0].lastname;
      this.userData.birth = response.data[0].birth;
      this.userData.email = response.data[0].email;
      this.userData.phone_number = response.data[0].phonenumber;
      this.userData.career = response.data[0].career;
      this.userData.location = response.data[0].location;
    },

    async getUserTaskSuccess() {
      const success = await Axios.get(
        `${this.config.url}/task-success/findByUser/user_id=${this.userData._id}&accept=true`
      );

      this.userData.countSuccess = success.data;
    },

    async returnIndexPage() {
      this.$router.push("/index");
    },

    logout() {
      this.$auth
        .signOut()
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {});
    },
  },
};
</script>

<style scoped src="../css/profile.css">
</style>