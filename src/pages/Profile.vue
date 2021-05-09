<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <background-display></background-display> -->

    <!-- <q-page-container style="padding-top: 0">
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
    </q-page-container> -->
    <!-- <div class="">
      <q-card class="my-card">
    </q-card>
    </div> -->
    <div class="row justify-center">
      <div class="context" style="width: 70%">
        <q-splitter v-model="splitterModel" style="height: auto">
          <template v-slot:before>
            <q-tabs v-model="tab" vertical class="text-teal">
              <q-tab name="general" icon="mail" label="ข้อมูลทั่วไป/General" />
              <q-tab name="stat" icon="alarm" label="สถิติ/Stat" />
            </q-tabs>
          </template>

          <template v-slot:after>
            <q-tab-panels
              v-model="tab"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel name="general">
                <div class="col-12">
                  <div class="row">
                    <div class="col paddingCol">
                      <div class="dataProfile">ชื่อ/Name</div>
                      <div class="profileBG">WATTANA</div>
                    </div>
                    <div class="col paddingCol">
                      <div class="dataProfile">นามสกุล/Surname</div>
                      <div class="profileBG">PONGPAEW</div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col paddingCol">
                      <div class="dataProfile">วันเกิด/DateofBirth</div>
                      <div class="profileBG">27/01/1999</div>
                    </div>
                    <div class="col paddingCol">
                      <div class="dataProfile">อาชีพ/Career</div>
                      <div class="profileBG">นักศึกษา</div>
                    </div>
                    <div class="col paddingCol">
                      <div class="dataProfile">จังหวัด/Province</div>
                      <div class="profileBG">พังงา</div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col paddingCol">
                      <div class="dataProfile">อีเมลล์/Email</div>
                      <div class="profileBG">endnapadad25@gmail.com</div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col paddingCol">
                      <div class="dataProfile">ที่อยู่/Resident</div>
                      <div class="profileBG">
                        หอพักนักศึกษาชาย(ห้องพักG21) 80/1 ม.1 ถ.วิชิตสงคราม
                        ต.กะทู้ อ.กะทู้ จ.ภูเก็ต 83120 โทร.0630809112
                      </div>
                    </div>
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="stat">
                <q-expansion-item
                  dense
                  dense-toggle
                  expand-separator
                  icon="perm_identity"
                  label="Account settings"
                >
                  <q-card>
                    <q-card-section>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Quidem, eius reprehenderit eos corrupti commodi magni
                      quaerat ex numquam, dolorum officiis modi facere maiores
                      architecto suscipit iste eveniet doloribus ullam aliquid.
                    </q-card-section>
                  </q-card>
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
  data() {
    return {
      tab: "general",
      splitterModel: 20,
    };
  },
};
</script>

<style scoped src="../css/profile.css">
</style>