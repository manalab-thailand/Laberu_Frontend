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
              <q-tab-panel name="general" style="background-color: #393A3F">
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

              <q-tab-panel name="stat" style="background-color: #393A3F">
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
                        <div class="totalMoneyText">6 รูป</div>
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section>
                    <div class="row">
                      <div class="col">
                        <div class="totalText">ผ่าน</div>
                      </div>
                      <div class="col">
                        <div class="totalMoneyText">6 รูป</div>
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section>
                    <div class="row">
                      <div class="col">
                        <div class="totalText">ไม่ผ่าน</div>
                      </div>
                      <div class="col">
                        <div class="totalMoneyText">6 รูป</div>
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section>
                    <div class="row">
                      <div class="col">
                        <div class="totalText">เป็นจำนวนเงิน</div>
                      </div>
                      <div class="col">
                        <div class="totalMoneyText">48.50 บาท</div>
                      </div>
                    </div>
                  </q-card-section>
                </q-expansion-item>
                <!-- <q-expansion-item
                  class="statMenu"
                  dense
                  dense-toggle
                  expand-separator
                  label="Label Image"
                  style="margin-top: 20px"
                > -->
                  <!-- <q-card style="background-color: #4f4b4b">
                    <q-card-section>
                      <div class="row" style="margin-top: 15px">
                        <div class="col">
                          <div class="totalText">ทำไปแล้ว</div>
                        </div>
                        <div class="col">
                          <div class="totalMoneyText">6 รูป</div>
                        </div>
                      </div>
                    </q-card-section>
                    <q-card-section>
                      <div class="row">
                        <div class="col">
                          <div class="totalText">ผ่าน</div>
                        </div>
                        <div class="col">
                          <div class="totalMoneyText">6 รูป</div>
                        </div>
                      </div>
                    </q-card-section>
                    <q-card-section>
                      <div class="row">
                        <div class="col">
                          <div class="totalText">ไม่ผ่าน</div>
                        </div>
                        <div class="col">
                          <div class="totalMoneyText">6 รูป</div>
                        </div>
                      </div>
                    </q-card-section>
                    <q-card-section>
                      <div class="row">
                        <div class="col">
                          <div class="totalText">เป็นจำนวนเงิน</div>
                        </div>
                        <div class="col">
                          <div class="totalMoneyText">48.50 บาท</div>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card> -->
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
      menu: "Annotation",
    };
  },
};
</script>

<style scoped src="../css/profile.css">
</style>