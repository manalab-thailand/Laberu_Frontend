<template>
  <div>
    <backgroundDisplay></backgroundDisplay>
    <div class="row justify-center">
      <div class="context row">
        <div class="col-9">
          <div class="slider-ctn">
            <div
              style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px"
              id="image-wrapper"
              :style="{ backgroundImage: `url(${this.image.url})` }"
              @mousedown="startDrawingBox"
              @mousemove="changeBox"
              @mouseup="stopDrawingBox"
            >
              <Box
                v-if="drawingBox.active"
                :b-width="drawingBox.width"
                :b-height="drawingBox.height"
                :b-top="drawingBox.top"
                :b-left="drawingBox.left"
              />
              <Box
                v-for="(box, i) in boxes"
                :key="i"
                :b-top="box.top"
                :b-left="box.left"
                :b-label="box.label"
                :b-width="box.width"
                :b-height="box.height"
                :b-active="i === activeBoxIndex"
                :on-select="makeBoxActive"
                :b-index="i"
                :on-delete="removeBox"
              />
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="Object">
            <div
              class="column justify-between bg-labelling-list"
              style="height: 576px"
            >
              <div class="col-11" style="overflow: auto">
                <div class="title-opject">Labelling List</div>
                <div>
                  <div
                    style="display: flex; justify-content: center"
                    v-for="(box, i) in boxes"
                    :key="i"
                    v-bind:class="{ active: i === activeBoxIndex }"
                  >
                    <q-select
                      label="Please Select One"
                      transition-show="flip-up"
                      transition-hide="flip-down"
                      bg-color="white"
                      filled
                      v-model="box.label"
                      :options="dataImage.config"
                      option-value="desc"
                      option-label="desc"
                      emit-value
                      map-options
                      class="q-mt-xs"
                      style="width: 300px"
                      v-on:click="makeBoxActive(i)"
                    />
                    <!-- <div>
                      <a @click="removeBox(i)">X</a>
                    </div> -->
                  </div>
                </div>
              </div>
              <div class="col-1 row q-pt-xs">
                <div class="col-6">
                  <div class="row justify-center">
                    <q-btn
                      rounded
                      color="green"
                      class="text-weight-bold btn-lg"
                      style="width: 90%"
                      label="SKIP"
                      @click="onSkip()"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="row justify-center">
                    <q-btn
                      rounded
                      color="primary"
                      class="text-weight-bold btn-lg"
                      style="width: 90%"
                      label="SAVE"
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
</template>

<script>
import Box from "../components/Box.vue";
import { QSpinnerHourglass } from "quasar";
import backgroundDisplay from "../components/login_animation";
import { mapGetters } from "vuex";
import { pick } from "lodash";
import Axios from "axios";

const getCoursorLeft = (e) => {
  return e.pageX - 78; //78
};

const getCoursorTop = (e) => {
  return e.pageY - 99; //99
};

export default {
  name: "app",
  computed: {
    ...mapGetters({
      databaseUrl: "db_config/databaseUrl",
      getUserConfig: "user_config/getUserConfig",
      projectConfig: "project_config/projectConfig",
    }),
  },
  components: { Box, backgroundDisplay },
  data: function () {
    return {
      user: {
        _id: null,
        name: null,
        count: null,
      },
      image: {
        url: "",
      },
      dataImage: {
        detection: null,
        shortcode: null,
        config: [
          {
            desc: "",
          },
        ],
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
        object: [],
        time_start: null,
        time_stop: null,
        user_id: null,
        task_id: null,
      },
      drawingBox: {
        active: false,
        top: 0,
        left: 0,
        height: 0,
        width: 0,
      },
      boxes: [],
      activeBoxIndex: null,
    };
  },
  async mounted() {
    console.log(this.projectConfig.config);
    console.log(this.getUserConfig);
    await this.initState();
  },
  methods: {
    async initState() {
      this.showLoading();
      if (await this.checkDone()) {
        if (await this.getImageByUser()) {
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
    },
    async checkDone() {
      try {
        const countImageData = await Axios.get(
          `${this.databaseUrl}/imagedata/findCountByProjectId`,
          {
            params: {
              project_id: this.projectConfig._id,
              // project_id: "test_project",
            },
          }
        );
        const countTaskImage = await Axios.get(
          `${this.databaseUrl}/taskimage/findCountImage`,
          {
            params: {
              type: "labelling",
              project_id: this.projectConfig._id,
              // project_id: "test_project",
            },
          }
        );

        if (countTaskImage.data != countImageData.data) {
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
        const taskImage = await Axios.post(
          `${this.databaseUrl}/taskimage/queryImage`,
          {
            type: "labelling",
            user_id: this.getUserConfig._id,
            project_id: this.projectConfig._id,
            // project_id: "test_project",
          }
        );

        if (!taskImage) {
          return false;
        }

        // https://storage.googleapis.com/smooth-street/session-1605784707-1176.jpg

        console.log(taskImage.data[0].shortcode);

        this.image.url = `${this.projectConfig.baseImageUrl}/${taskImage.data[0].shortcode}.jpg`;
        // this.image.url = `https://storage.googleapis.com/smooth-street/${taskImage.data[0].shortcode}.jpg`;
        this.taskImage._id = taskImage.data[0]._id;
        this.taskImage.shortcode = taskImage.data[0].shortcode;
        this.taskImage.status = taskImage.data[0].status;
        this.taskImage.process = taskImage.data[0].process;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async setImageData() {
      try {
        const { data } = await Axios.get(
          `${this.databaseUrl}/imagedata/findOneByShortcode`,
          {
            params: {
              shortcode: this.taskImage.shortcode,
              project_id: this.projectConfig._id,
              // project_id: "test_project",
            },
          }
        );

        this.dataImage.config = this.projectConfig.config;
        this.dataImage.detection = data.detection.size;
        this.taskSuccess.time_start = Date.now();

        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async updateStatusTask(inputStatus, timeStamp) {
      try {
        await Axios.put(`${this.databaseUrl}/taskimage/updateStatusImage`, {
          type: "labelling",
          id: this.taskImage._id,
          time_start: timeStamp,
          status: inputStatus,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async onSkip() {
      this.boxes = [];
      await this.initState();
    },
    async onSave() {
      const checkObject = this.boxes.map((data) =>
        !data.label ? false : true
      );

      if (checkObject.includes(false) != true) {
        try {
          const mapPosition = this.boxes.map((data) => {
            const label = this.dataImage.config.filter(
              (item) => data.label == item.desc
            );

            const realSizeX = this.dataImage.detection.width;
            const realSizeY = this.dataImage.detection.height;

            const xmin = (realSizeX / 100) * ((data.left / 1024) * 100);
            const ymin = (realSizeY / 100) * ((data.top / 576) * 100);

            const xmax =
              (realSizeX / 100) * (((data.left + data.width) / 1024) * 100);
            const ymax =
              (realSizeY / 100) * (((data.top + data.height) / 576) * 100);

            return {
              name: label[0].id,
              bndbox: {
                xmin,
                ymin,
                xmax,
                ymax,
              },
            };
          });

          const data = {
            type: "labelling",
            shortcode: this.taskImage.shortcode,
            filename: `${this.taskImage.shortcode}.jpg`,
            size: [
              {
                width: this.dataImage.detection.width,
                height: this.dataImage.detection.height,
              },
            ],
            object: [...mapPosition],
            time_start: this.taskSuccess.time_start,
            time_stop: Date.now(),
            accept: true,
            user_id: this.getUserConfig._id,
            task_id: this.taskImage._id,
            project_id: this.projectConfig._id,
          };

          await Axios.post(`${this.databaseUrl}/tasksuccess/create`, data);
          await this.updateStatusTask(false, 0);
          await this.checkConfig();
          this.boxes = [];
          this.initState();
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "กรุณาระบุให้ครบทุกอัน",
        });
      }
    },
    async checkConfig() {
      const { data } = await Axios.get(
        `${this.databaseUrl}/tasksuccess/findCountTaskSuccessByShortcode`,
        {
          params: {
            type: "labelling",
            shortcode: this.taskImage.shortcode,
            project_id: this.projectConfig._id,
          },
        }
      );

      if (Number(data) >= Number(this.projectConfig.labellingCount)) {
        try {
          await Axios.put(`${this.databaseUrl}/taskimage/updateProcessImage`, {
            type: "labelling",
            id: this.taskImage._id,
            time_start: 0,
            status: true,
            process: true,
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
    async resetStatusTask() {
      try {
        await Axios.put(`${this.databaseUrl}/taskimage/ResetTaskImage`, {
          type: "labelling",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async save() {
      // await Axios.post(`${this.databaseUrl}/imagedata/create`, {
      //   shortcode: "session-1605784707-1443",
      //   annotation: null,
      //   object: {
      //     size: {
      //       width: 1920,
      //       height: 1080,
      //     },
      //  },
      // project_id: "test_project",
      // });
      // console.log("Add Image Success !!");
      // const { data } = await Axios.get(
      //   "${this.databaseUrl}/imagedata/findAllByProjectId",
      //   {
      //   params: {
      //      project_id: "test_project",
      //     },
      //   }
      // );
      // const mapdata = data.map((item) => ({
      //   shortcode: item.shortcode,
      //   time_start: "0",
      //   status: false,
      //  process: false,
      //  project_id: "test_project",
      // }));
      // console.log(mapdata);
      // await Axios.post("${this.databaseUrl}/taskimage/createInsertMany", {
      //   type: "labelling",
      //   mapdata: mapdata,
      // });
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
    startDrawingBox(e) {
      this.drawingBox = {
        width: 0,
        height: 0,
        top: getCoursorTop(e),
        left: getCoursorLeft(e),
        active: true,
      };
    },
    changeBox(e) {
      if (this.drawingBox.active) {
        this.drawingBox = {
          ...this.drawingBox,
          width: getCoursorLeft(e) - this.drawingBox.left,
          height: getCoursorTop(e) - this.drawingBox.top,
        };
      }
    },
    stopDrawingBox() {
      if (this.drawingBox.active) {
        if (this.drawingBox.width > 5) {
          this.boxes.push({
            ...pick(this.drawingBox, ["width", "height", "top", "left"]),
          });
        }
        this.drawingBox = {
          active: false,
          top: 0,
          left: 0,
          height: 0,
          width: 0,
        };
      }
    },
    makeBoxActive(i) {
      this.activeBoxIndex = i;
    },
    removeBox(i) {
      this.boxes = this.boxes.filter((elem, index) => {
        return index !== i;
      });
      this.activeBoxIndex = null;
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

<style scoped src="../css/label.css">
</style>
