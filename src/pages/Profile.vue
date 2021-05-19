<template>
  <q-layout view="lHh Lpr lFf">
    <div class="row" style="margin-left: 8%">
      <div class="context" style="width: 70%">
        <q-splitter v-model="splitterModel" style="height: auto">
          <template v-slot:before>
            <q-tabs
              v-model="tab"
              vertical
              class="text-teal"
              active-color="white"
              indicator-color="white"
            >
              <q-tab
                name="general"
                label="ข้อมูลทั่วไป/General"
                class="generalMenu"
              ></q-tab>
              <q-tab name="stat" label="สถิติ/Stat" style="color: grey" />
            </q-tabs>
          </template>

          <template v-slot:after>
            <q-tab-panels
              v-model="tab"
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
              style="margin-left: 25px"
            >
              <q-tab-panel name="general" style="background-color: #393a3f">
                <div class="col-12">
                  <div class="row">
                    <div class="col paddingCol">
                      <div class="dataProfile">ชื่อ/Name</div>
                      <div class="profileBG">{{ userData.firstname }}</div>
                    </div>
                    <div class="col paddingCol">
                      <div class="dataProfile">นามสกุล/Surname</div>
                      <div class="profileBG">{{ userData.lastname }}</div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col paddingCol">
                      <div class="dataProfile">วันเกิด/DateofBirth</div>
                      <div class="profileBG">{{ userData.birth }}</div>
                    </div>
                    <div class="col paddingCol">
                      <div class="dataProfile">อาชีพ/Career</div>
                      <div class="profileBG">{{ userData.career }}</div>
                    </div>
                    <div class="col paddingCol">
                      <div class="dataProfile">จังหวัด/Province</div>
                      <div class="profileBG">{{ userData.province }}</div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col paddingCol">
                      <div class="dataProfile">อีเมลล์/Email</div>
                      <div class="profileBG">{{ userData.email }}</div>
                    </div>
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="stat" style="background-color: #393a3f">
                <q-expansion-item
                  class="statMenu"
                  v-model="menu"
                  dense
                  dense-toggle
                  expand-separator
                  label="Annotation"
                >
                  <q-card-section>
                    <div class="row" style="margin-top: 15px">
                      <div class="col">
                        <div class="totalText">จำนวนรูปที่ทำ</div>
                      </div>
                      <div class="col">
                        <div class="totalMoneyText">
                          {{ userData.countSuccess }} รูป
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section>
                    <div class="row">
                      <div class="col">
                        <div class="totalText">ผ่าน</div>
                      </div>
                      <div class="col">
                        <div class="totalMoneyText">
                          {{ userData.countSuccess }} รูป
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section>
                    <div class="row">
                      <div class="col">
                        <div class="totalText">ไม่ผ่าน</div>
                      </div>
                      <div class="col">
                        <div class="totalMoneyText">
                          {{ userData.countNotSuccess }} รูป
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section>
                    <div class="row">
                      <div class="col">
                        <div class="totalText">เป็นจำนวนเงิน</div>
                      </div>
                      <div class="col">
                        <div class="totalMoneyText">
                          {{ userData.countSuccess }} บาท
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-expansion-item>
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
      </div>
    </div>
  </q-layout>
</template>

<script>
import backgroundDisplay from "../components/login_animation";
import { mapGetters } from "vuex";
import Axios from "app/node_modules/axios";
export default {
  components: {
    backgroundDisplay,
  },
  computed: {
    ...mapGetters({
      user_email: "user_email/user_email",
      user_id: "user_id/user_id",
      user_uid: "user_uid/user_uid",
    }),
  },
  data() {
    return {
      tab: "general",
      splitterModel: 20,
      menu: "Annotation",
      config: {
        // url: "https://laberu-ptrmd2zvzq-as.a.run.app",
        // url: "http://localhost:8080",
      },
      userData: {
        _id: null,
        firstname: null,
        lastname: null,
        birth: null,
        phonenumber: null,
        email: null,
        career: null,
        province: null,
        location: null,
        countSuccess: null,
        countNotSuccess: null,
      },
    };
  },
  async mounted() {
    await this.getUserData();
    await this.getUserTaskSuccess();
  },
  methods: {
    async getUserData() {
      const response = await Axios.get(
        `${this.config.url}/user/check_login/uid=${this.user_uid}`
      );
      this.userData._id = response.data[0]._id;
      this.userData.firstname = response.data[0].firstname;
      this.userData.lastname = response.data[0].lastname;
      this.userData.birth = response.data[0].birth;
      this.userData.email = response.data[0].email;
      this.userData.phonenumber = response.data[0].phonenumber;
      this.userData.career = response.data[0].career;
      this.userData.location = response.data[0].location;
      this.userData.province = response.data[0].province;
    },
    async getUserTaskSuccess() {
      const success = await Axios.get(
        `${this.config.url}/task-success/findByUser/user_id=${this.userData._id}&accept=true`
      );
      const notSuccess = await Axios.get(
        `${this.config.url}/task-success/findByUser/user_id=${this.userData._id}&accept=false`
      );
      this.userData.countSuccess = success.data;
      this.userData.countNotSuccess = notSuccess.data;
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