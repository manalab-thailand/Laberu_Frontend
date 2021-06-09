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
              :style="{ backgroundImage: `url(label_1.jpg)` }"
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
                      :options="options"
                      option-value="id"
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
                      @click="save()"
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
import backgroundDisplay from "../components/login_animation";
import { mapGetters } from "vuex";
import { pick } from "lodash";

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
      projectConfig: "project_config/projectConfig",
    }),
  },
  components: { Box, backgroundDisplay },
  data: function () {
    return {
      drawingBox: {
        active: false,
        top: 0,
        left: 0,
        height: 0,
        width: 0,
      },
      boxes: [],
      activeBoxIndex: null,
      options: [
        {
          id: "manholes cover",
          desc: "ฝาท่อ",
        },
        {
          id: "crack",
          desc: "หลุม",
        },
        {
          id: "pothole",
          desc: "รอยแตก",
        },
        {
          id: "bridge-neck",
          desc: "คอสะพาน",
        },
        {
          id: "water",
          desc: "น้ำขัง",
        },
      ],
    };
  },
  mounted() {
    console.log(this.projectConfig);
    console.log(this.databaseUrl);
  },
  methods: {
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
    save() {
      console.log(this.boxes);

      const mapPosition = this.boxes.map((data) => ({
        name: data.label,
        bndbox: {
          xmin: data.left,
          ymin: data.top,
          xmax: data.left + data.width,
          ymax: data.top + data.height,
        },
      }));

      const data = {
        shortcode: "000000078400",
        filename: "000000078400.jpg",
        size: [
          {
            width: "1024",
            height: "576",
          },
        ],
        object: [...mapPosition],
      };

      console.log(data);
    },
  },
};
</script>

<style scoped src="../css/label.css">
</style>
