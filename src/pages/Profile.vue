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
                <div
                  class="text-h5 text-white text-weight-bold q-mb-lg q-mx-md"
                >
                  {{ userData.firstname }} {{ userData.lastname }}
                  {{ userData.studentId }}
                </div>
                <q-expansion-item
                  class="statMenu"
                  v-model="annotation"
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
                          {{ userData.countAnnotation }} รูป
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                  <!-- <q-card-section>
                    <div class="row">
                      <div class="col">
                        <div class="totalText">เป็นจำนวนเงิน</div>
                      </div>
                      <div class="col">
                        <div class="totalMoneyText">
                          {{ userData.countAnnotation }} บาท
                        </div>
                      </div>
                    </div>
                  </q-card-section> -->
                </q-expansion-item>
                <div class="q-mt-md" />
                <q-expansion-item
                  class="statMenu"
                  v-model="labelling"
                  dense
                  dense-toggle
                  expand-separator
                  label="Object Labelling"
                >
                  <q-card-section>
                    <div class="row" style="margin-top: 15px">
                      <div class="col">
                        <div class="totalText">จำนวนรูปที่ทำ</div>
                      </div>
                      <div class="col">
                        <div class="totalMoneyText">
                          {{ userData.countObject }} รูป
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                  <!-- <q-card-section>
                    <div class="row">
                      <div class="col">
                        <div class="totalText">เป็นจำนวนเงิน</div>
                      </div>
                      <div class="col">
                        <div class="totalMoneyText">
                          {{ userData.countObject }} บาท
                        </div>
                      </div>
                    </div>
                  </q-card-section> -->
                </q-expansion-item>
                <div class="q-mt-md" />
                <q-expansion-item
                  class="statMenu"
                  v-model="classification"
                  dense
                  dense-toggle
                  expand-separator
                  label="Classification"
                >
                  <q-card-section>
                    <div class="row" style="margin-top: 15px">
                      <div class="col">
                        <div class="totalText">จำนวนรูปที่ทำ</div>
                      </div>
                      <div class="col">
                        <div class="totalMoneyText">
                          {{ userData.countClassification }} รูป
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                  <!-- <q-card-section>
                    <div class="row">
                      <div class="col">
                        <div class="totalText">เป็นจำนวนเงิน</div>
                      </div>
                      <div class="col">
                        <div class="totalMoneyText">
                          {{ userData.countClassification }} บาท
                        </div>
                      </div>
                    </div>
                  </q-card-section> -->
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
      databaseUrl: "db_config/databaseUrl",
      getUserConfig: "user_config/getUserConfig",
    }),
  },
  data() {
    return {
      tab: "general",
      splitterModel: 20,
      annotation: false,
      labelling: true,
      classification: false,
      listItem: [],
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
        studentId: null,
        countAnnotation: null,
        countObject: null,
        countClassification: null,
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
      this.userData._id = this.getUserConfig._id;
      this.userData.firstname = this.getUserConfig.firstname;
      this.userData.lastname = this.getUserConfig.lastname;
      this.userData.birth = this.getUserConfig.birth;
      this.userData.email = this.getUserConfig.email;
      this.userData.phonenumber = this.getUserConfig.phonenumber;
      this.userData.career = this.getUserConfig.career;
      this.userData.location = this.getUserConfig.location;
      this.userData.studentId = this.getUserConfig.studentId;
      this.userData.province = this.getUserConfig.province;
    },

    async getUserTaskSuccess() {
      const { data } = await Axios.get(
        `${this.databaseUrl}/tasksuccess/findCountTaskSuccessByUser`,
        {
          params: {
            user_id: this.getUserConfig._id,
          },
        }
      );

      this.userData.countAnnotation = data.countAnnotation;
      this.userData.countObject = data.countObject;
      this.userData.countNotSuccess = data.countClassification;
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