<template>
  <q-layout view="lHh Lpr lFf">
    <backgroundDisplay></backgroundDisplay>
    <div class="context">
      <div class="big-bg">
        <div class="row items-center">
          <div class="col-6" style="padding: 1rem 0">
            <div class="imgArea float-right">
              <div class="container-inner">
                <!-- <img
                  class="Zoom"
                  :src="this.image.url"
                  style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px"
                /> -->
                <img
                  class="Zoom"
                  src="../images/image_5.jpg"
                  style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px"
                />
              </div>
            </div>
          </div>
          <div class="col-6 row justify-center" style="padding: 1rem 0">
            <div style="width: 90%">
                <div class="col q-mt-sm">
                  <div class="row">
                    <div class="col-6">
                      <div class="row justify-center q-mr-sm">
                        <q-btn
                          class="exampleBtnText skipBtn text-white"
                          label="ข้าม/Skip"
                        />
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="row justify-center q-ml-sm">
                        <q-btn
                          class="exampleBtnText exampleBtn1"
                          color="red-7"
                          label="บันทึก/Save"
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
import { mapGetters } from "vuex";
import Axios from "axios";
import Vue from "vue";
import IdleVue from "idle-vue";
import backgroundDisplay from "../components/login_animation";

const eventsHub = new Vue();

const options = {
  eventEmitter: eventsHub,
  idleTime: 900000,
};

Vue.use(IdleVue, options);

export default {
  computed: {
    ...mapGetters({
      databaseUrl: "db_config/databaseUrl",
      getUserConfig: "user_config/getUserConfig",
      projectConfig: "project_config/projectConfig",
    }),
  },
  components: {
    backgroundDisplay,
  },
};
</script>

<style scoped src="../css/index.css">
</style>


