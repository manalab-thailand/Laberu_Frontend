<template>
  <q-layout view="lHh Lpr lFf">
    <backgroundDisplay></backgroundDisplay>
    <div class="context">
      <div class="row">
        <div class="col-6">
          <div class="imgArea left15">
            <div class="container">
              <div
                class="container-inner"
                style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px"
              >
                <img src="../images/image_3.jpg" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="column" style="height: 500px">
            <div class="left5 guideThing col">
              <q-card style="width: 80%; margin-top: 1rem">
                <q-card-actions vertical>
                  <div style="align-item-center">
                    <div style="margin-top: 0">
                      <q-list class="rounded-borders">
                        <q-expansion-item
                          label="Guide"
                          icon="link"
                          style="font-weight: bold; font-size: 16px"
                        >
                          <q-card style="padding: 0px 20px 10px 20px">
                            <q-card-section>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Culpa tenetur fugit nam rerum nobis
                              consequuntur blanditiis neque ad veritatis
                              adipisci! Ea illo nostrum omnis debitis voluptatum
                              magni. Quos, voluptatum aut!
                            </q-card-section>
                          </q-card>
                        </q-expansion-item>
                      </q-list>
                    </div>
                  </div>
                </q-card-actions>
              </q-card>
            </div>
            <div class="col-2"></div>
            <div class="col">
              <div class="row">
                <!-- <div class="exampleBtn1 left5 rounded-borders">
                  <div class="exampleBtnText row items-center justify-center" style="height: 60px">
                  ตัวอย่างที่ 1/Example 1
                  </div>
                </div> -->
                <q-btn
                  class="exampleBtnText exampleBtn1 left5 text-black"
                  color="white"
                  label="ตัวอย่างที่1/Example1"
                  @click="toolbar=true"
                />
                <q-dialog v-model="toolbar">
                  <q-card>
                    <q-toolbar>
                      <q-avatar>
                        <img
                          src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg"
                        />
                      </q-avatar>

                      <q-toolbar-title
                        ><span class="text-weight-bold">Quasar</span>
                        Framework</q-toolbar-title
                      >

                      <q-btn flat round dense icon="close" v-close-popup />
                    </q-toolbar>

                    <q-card-section>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Rerum repellendus sit voluptate voluptas eveniet porro.
                      Rerum blanditiis perferendis totam, ea at omnis vel
                      numquam exercitationem aut, natus minima, porro labore.
                    </q-card-section>
                  </q-card>
                </q-dialog>
                <q-btn
                  class="exampleBtnText exampleBtn2 left3"
                  color="black"
                  label="ตัวอย่างที่2/Example2"
                  @click="toolbar = true"
                />
              </div>
              <div class="row" style="margin-top: 1rem">
                <div class="col">
                  <q-card class="left5" style="width: 76%">
                    <q-card-actions vertical>
                      <div class="q-pa-xs">
                        <vue-tags-input
                          v-model="taskSuccess.description"
                          :tags="tags"
                          @tags-changed="(newTags) => (tags = newTags)"
                        />
                      </div>
                    </q-card-actions>
                  </q-card>
                </div>
              </div>
              <div class="row" style="margin-top: 1rem">
                <q-btn
                  class="exampleBtnText skipBtn left5 text-white"
                  label="ข้าม/Skip"
                  @onclick="onSkip()"
                />
                <q-btn
                  class="exampleBtnText exampleBtn1 left3"
                  color="red-7"
                  label="บันทึก/Save"
                  @onclick="onSave()"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script>
import { QSpinnerHourglass } from "quasar";
import { mapGetters } from "vuex";
import Axios from "axios";
import Vue from "vue";
import IdleVue from "idle-vue";
import VueTagsInput from "@johmun/vue-tags-input";
import backgroundDisplay from "../components/login_animation";

const eventsHub = new Vue();

const options = {
  eventEmitter: eventsHub,
  idleTime: 1800000,
};

Vue.use(IdleVue, options);

export default {
  computed: {
    ...mapGetters({
      user_email: "user_email/user_email",
      user_id: "user_id/user_id",
    }),
  },
  components: {
    VueTagsInput,
    backgroundDisplay,
  },
  data() {
    return {
      tags: [],
      toolbar: false,
      config: {
        // url: "https://laberu-ptrmd2zvzq-as.a.run.app",
        // url: "http://localhost:8080",
        project_name: null,
        baseImageUrl: null,
        labelingCount: null,
        labelType: null,
        customerID: null,
      },
      user: {
        _id: null,
        name: null,
        count: null,
      },
      image: {
        url: null,
      },
      dataImage: {
        _id: null,
        shortcode: null,
        description_english: null,
      },
      taskImage: {
        _id: null,
        shortcode: null,
        status: null,
        process: null,
      },
      taskSuccess: {
        _id: null,
        shortcode: null,
        description: "",
        time_start: null,
        time_stop: null,
        user_id: null,
        task_id: null,
      },
    };
  },
  async onIdle() {
    await this.updateStatusTask(false, 0);
    this.logout();
  },
  async mounted() {
    // await this.configProject();
    // await this.setUserData();
    // await this.initState();
  },
  methods: {
    async initState() {
      this.showLoading();
      if (this.user_id != null && this.user_id != "") {
        if (await this.checkDone()) {
          if (await this.getImageByUser()) {
            await this.getUserTaskSuccess();
            await this.updateStatusTask(true, Date.now());
            await this.setImageData();
            this.onTimeout();
          } else {
            this.onTimeout();
            this.showMessage();
          }
        } else {
          this.onTimeout();
          this.showMessage();
        }
      } else {
        this.onTimeout();
        this.$router.push("/");
      }
    },
    async configProject() {
      const configProject = await Axios.get(`${this.config.url}/project`);

      this.config.project_name = configProject.data[0].project_name;
      this.config.baseImageUrl = configProject.data[0].baseImageUrl;
      this.config.labelingCount = configProject.data[0].labelingCount;
      this.config.labelType = configProject.data[0].labelType;
      this.customerID = configProject.data[0].customerID;
    },
    async setUserData() {
      this.user.name = this.user_login;
      this.user._id = this.user_id;
    },
    async checkDone() {
      try {
        const responseImage = await Axios.get(
          `${this.config.url}/image-data/getCountImage`
        );
        const responseTaskImage = await Axios.get(
          `${this.config.url}/task-image/getCountTaskSuccess`
        );
        if (responseTaskImage.data < responseImage.data) {
          await this.resetStatusTask();
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getImageByUser() {
      try {
        const response = await Axios.get(
          `${this.config.url}/task-image/findImage/user_id=${this.user._id}`
        );

        if (response.data[0] != null) {
          this.image.url = `${this.config.baseImageUrl}${response.data[0].shortcode}.jpg`;
          this.taskImage._id = response.data[0]._id;
          this.taskImage.shortcode = response.data[0].shortcode;
          this.taskImage.status = response.data[0].status;
          this.taskImage.process = response.data[0].process;
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async setImageData() {
      try {
        const response = await Axios.get(
          `${this.config.url}/image-data/shortcode=${this.taskImage.shortcode}`
        );
        this.dataImage._id = response.data[0]._id;
        this.dataImage.shortcode = response.data[0].shortcode;
        this.dataImage.description_english =
          response.data[0].description_english;
        this.taskSuccess.time_start = Date.now();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async updateStatusTask(inputStatus, timeStamp) {
      try {
        await Axios.put(
          `${this.config.url}/task-image/update_status/_id=${this.taskImage._id}`,
          {
            time_start: timeStamp,
            status: inputStatus,
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
    async getUserTaskSuccess() {
      const response = await Axios.get(
        `${this.config.url}/task-success/findByUser/user_id=${this.user._id}&accept=true`
      );
      this.user.count = response.data;
    },
    async onSkip() {
      await this.initState();
    },
    async onSave() {
      const newTags = [];
      this.tags.forEach((data) => newTags.push(data.text));
      console.log(newTags);
      if (this.taskSuccess.description != null) {
        if (newTags.length >= 5) {
          try {
            const desciptionTags = newTags.join(" ");
            await Axios.post(`${this.config.url}/task-success/create`, {
              shortcode: this.taskImage.shortcode,
              description: desciptionTags,
              time_start: this.taskSuccess.time_start,
              time_stop: Date.now(),
              accept: true,
              user_id: this.user._id,
              task_id: this.taskImage._id,
            });
            await this.updateStatusTask(false, 0);
            await this.checkConfig();
            this.taskSuccess.description = "";
            this.tags = [];
            this.initState();
          } catch (error) {
            console.log(error);
          }
        } else {
          this.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "กรุณากรอกอย่างน้อย 5 คำ",
          });
        }
      } else {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "กรุณากรอกข้อมูลในพื้นที่ที่กำหนด",
        });
      }
    },
    async checkConfig() {
      const countSuccess = await Axios.get(
        `${this.config.url}/task-success/findCountByShortcode/shortcode=${this.taskImage.shortcode}`
      );
      if (countSuccess.data == Number(this.config.labelingCount)) {
        try {
          await Axios.put(
            `${this.config.url}/task-image/update_process/_id=${this.taskImage._id}`,
            {
              time_start: 0,
              status: true,
              process: true,
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
    },
    async goProfilePage() {
      await this.updateStatusTask(false, 0);
      this.$router.push({ name: "profile" });
    },
    async resetStatusTask() {
      try {
        await Axios.put(`${this.config.url}/task-image/reset_status_all`, {
          time_start: 0,
          status: false,
          process: false,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      await this.updateStatusTask(false, 0);
      this.$auth
        .signOut()
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {});
    },
    showLoading() {
      this.$q.loading.show({
        spinner: QSpinnerHourglass,
        spinnerColor: "white",
        spinnerSize: 180,
        backgroundColor: "indigo-11",
      });
    },
    showMessage() {
      this.$q
        .dialog({
          title: "Alert",
          message: "งานเสร๊จหมดแล้วจ้า ไม่มีงานให้ทำแล้ววววววว",
        })
        .onOk(() => {
          this.$router.push("/");
        })
        .onCancel(() => {
          this.$router.push("/");
        })
        .onDismiss(() => {
          this.$router.push("/");
        });
    },
    onTimeout() {
      this.timer = setTimeout(() => {
        this.$q.loading.hide();
        this.timer = void 0;
      }, 600);
    },
  },
  beforeDestroy() {
    if (this.timer !== void 0) {
      clearTimeout(this.timer);
      this.$q.loading.hide();
    }
  },
};
</script>

<style scoped src="../css/index.css">
</style>


