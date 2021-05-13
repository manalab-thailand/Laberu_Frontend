<template>
  <q-layout view="lHh Lpr lFf">
    <backgroundDisplay></backgroundDisplay>
    <div class="context">
      <div class="big-bg">
        <div class="row items-center">
          <div class="col-6" style="padding: 1rem 0">
            <div class="imgArea float-right">
              <div class="container-inner">
                <img
                  class="Zoom"
                  :src="this.image.url"
                  style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px"
                />
                <!-- <img
                  class="Zoom"
                  src="../images/image_5.jpg"
                  style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px"
                /> -->
              </div>
            </div>
          </div>
          <div class="col-6 row justify-center" style="padding: 1rem 0">
            <div style="width: 90%">
              <div class="bg-color-input">
                <div class="col">
                  <q-card>
                    <q-card-actions vertical>
                      <div style="align-item-center">
                        <div style="margin-top: 0">
                          <q-list class="rounded-borders">
                            <q-expansion-item
                              default-opened
                              label="Guide"
                              icon="link"
                              style="font-weight: bold; font-size: 16px"
                            >
                              <q-card style="padding: 0px 20px 10px 20px">
                                <q-card-section>
                                  {{ this.dataImage.description_english }}
                                </q-card-section>
                              </q-card>
                            </q-expansion-item>
                          </q-list>
                        </div>
                      </div>
                    </q-card-actions>
                  </q-card>
                </div>
                <div class="col" style="margin-top: 6rem">
                  <div class="row">
                    <div class="col-6">
                      <q-dialog v-model="tutorDialog">
                        <q-card style="width: 75rem; max-width: 80vw">
                          <q-card-section class="row q-pa-none">
                            <div class="col"></div>
                            <div class="col text-center">
                              <div class="text-h6 q-mt-sm">คู่มือการใช้งาน</div>
                            </div>
                            <div class="col">
                              <q-btn
                                class="q-pa-xs float-right"
                                icon="close"
                                flat
                                round
                                dense
                                v-close-popup
                              />
                            </div>
                          </q-card-section>
                          <q-card-section class="row justify-center">
                            <q-img
                              src="../images/tutorImage.png"
                              width="100%"
                              height="100%"
                            />
                          </q-card-section>
                        </q-card>
                      </q-dialog>
                      <div class="row justify-center q-mr-sm">
                        <q-btn
                          class="exampleBtnText exampleBtn1 text-black"
                          color="white"
                          label="คู่มือการใช้งาน/Tutorial"
                          @click="tutorDialog = true"
                        />
                      </div>
                    </div>
                    <div class="col-6">
                      <q-dialog v-model="expDialog">
                        <q-card style="width: 800px; max-width: 80vw">
                          <q-card-section class="row q-pa-none">
                            <div class="col"></div>
                            <div class="col text-center">
                              <div class="text-h6 text-weight-bold q-mt-sm">
                                ตัวอย่างที่ 1
                              </div>
                            </div>
                            <div class="col">
                              <q-btn
                                class="q-pa-xs float-right"
                                icon="close"
                                flat
                                round
                                dense
                                v-close-popup
                              />
                            </div>
                          </q-card-section>
                          <q-card-section class="row justify-center q-pa-none">
                            <q-img
                              src="../images/example_img.jpg"
                              width="50%"
                              height="50%"
                            />
                          </q-card-section>
                          <q-card-section class="q-pa-none">
                            <div class="col-12">
                              <div class="row">
                                <div class="col-6">
                                  <div class="text-header">
                                    ตัวอย่างการกรอกข้อมูลที่ผิด
                                  </div>
                                  <div class="title-example-incorrect">
                                    ( ประโยคไม่มีความสัมพันธ์กัน / ไม่เป็นประโยค
                                    )
                                  </div>
                                  <div class="text-example-incorrect">
                                    1. โต๊ะวงกลม คนแก่ คนหลายคน
                                    ด้านหลังเป็นภูเขา สีเขียว
                                  </div>
                                  <div class="title-example-incorrect">
                                    ( เขียนคำผิด / สะกดคำไม่ถูกต้อง )
                                  </div>
                                  <div class="text-example-incorrect">
                                    2. ชายแก้ กล้ำลัง รีไว ให้ผู้ชั่ย ซองคน กลับ
                                    ผู้หญิง 1คน
                                  </div>
                                  <div class="title-example-incorrect">
                                    ( ไม่มีการเว้นวรรคคำ )
                                  </div>
                                  <div class="text-example-incorrect">
                                    3. คน4คนยืนอยู่รอบโต๊ะถือแก้วไวน์
                                  </div>
                                  <div class="title-example-incorrect">
                                    ( ประโยคสั้นไป )
                                  </div>
                                  <div class="text-example-incorrect">
                                    4. คน กำ ลัง ริน ไวน์
                                  </div>
                                </div>
                                <div class="col-6" style="margin-bottom: 1rem">
                                  <div class="text-header">
                                    ตัวอย่างการกรอกข้อมูลที่ถูก
                                  </div>
                                  <div class="text-example-correct">
                                    1. คน 4คน ยืนอยู่ รอบโต๊ะ ถือแก้วไวน์
                                  </div>
                                  <div class="text-example-correct">
                                    2. กลุ่มคน กำลัง ถือแก้ว ชิมไวน์ อยู่รอบโต๊ะ
                                    ที่ทำจากไม้
                                  </div>
                                  <div class="text-example-correct">
                                    3. ชายแก่ กำลัง รินไวน์ ให้ผู้ชาย 2คน กับ
                                    ผู้หญิง 1คน
                                  </div>
                                  <div class="text-example-correct">
                                    4. ชายแก่ กำลัง รินไวน์ ให้กับ ผู้ชาย 2คน
                                    คนหนึ่งใส่แว่น คนที่สอง ใส่แว่น และใส่หมวก
                                  </div>

                                  <div class="row" style="height: 30%">
                                    <div class="title-waring self-end">
                                      * พิมพ์ประโยคบรรยายรูปภาพหนึ่งประโยค
                                      โดยประโยคต้องแยกเป็นคำอย่างน้อย 5 คำ
                                      แต่ละคำต้องเว้นวรรคด้วยการกด Enter
                                      ดังตัวอย่าง
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </q-card-section>
                        </q-card>
                      </q-dialog>
                      <div class="row justify-center q-ml-sm">
                        <q-btn
                          class="exampleBtnText exampleBtn2"
                          color="black"
                          label="ตัวอย่าง/Example"
                          @click="expDialog = true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col q-mt-sm">
                  <q-card style="width: 100%">
                    <q-card-actions vertical>
                      <div class="col-12 q-pa-xs" style="width: 100%">
                        <BootstrapVueTags
                          :value="descriptionTags"
                          @changeMessage="descriptionTags = $event"
                        />
                      </div>
                    </q-card-actions>
                  </q-card>
                </div>
                <div class="col q-mt-sm">
                  <div class="row">
                    <div class="col-6">
                      <div class="row justify-center q-mr-sm">
                        <q-btn
                          class="exampleBtnText skipBtn text-white"
                          label="ข้าม/Skip"
                          @click="onSkip()"
                        />
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="row justify-center q-ml-sm">
                        <q-btn
                          class="exampleBtnText exampleBtn1"
                          color="red-7"
                          label="บันทึก/Save"
                          @click="onSave()"
                        />
                      </div>
                    </div>
                  </div>
                </div>
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
import BootstrapVueTags from "../components/form_tag";
import backgroundDisplay from "../components/login_animation";

const eventsHub = new Vue();

const options = {
  eventEmitter: eventsHub,
  idleTime: 600000,
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
    BootstrapVueTags,
    backgroundDisplay,
  },
  data() {
    return {
      descriptionTags: [],
      expDialog: false,
      tutorDialog: false,
      config: {
        url: "https://laberu-ptrmd2zvzq-as.a.run.app",
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
    await this.configProject();
    await this.setUserData();
    await this.initState();
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
      this.descriptionTags = [];
      await this.initState();
    },
    async onSave() {
      const validateTags = [];
      this.descriptionTags.forEach((data) => validateTags.push(data));
      if (validateTags.length >= 5) {
        try {
          const desciptionTags = validateTags.join(" ");
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
          this.descriptionTags = [];
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


