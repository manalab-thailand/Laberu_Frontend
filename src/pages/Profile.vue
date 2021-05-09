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
      <div class="context" style="width: 80%">
        <q-splitter v-model="splitterModel" style="height: auto">
          <template v-slot:before>
            <q-tabs v-model="tab" vertical class="text-teal">
              <q-tab name="general" icon="mail" label="ข้อมูลทั่วไป/General" />
              <q-tab name="stat" icon="alarm" label="สถิติ/Stat" />
              <q-tab name="payment" icon="movie" label="โอนเงิน/Payment" />
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
              </q-tab-panel>

              <q-tab-panel name="stat">
                <div class="text-h4 q-mb-md">Alarms</div>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                  praesentium cumque magnam odio iure quidem, quod illum numquam
                  possimus obcaecati commodi minima assumenda consectetur culpa
                  fuga nulla ullam. In, libero.
                </p>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                  praesentium cumque magnam odio iure quidem, quod illum numquam
                  possimus obcaecati commodi minima assumenda consectetur culpa
                  fuga nulla ullam. In, libero.
                </p>
              </q-tab-panel>

              <q-tab-panel name="payment">
                <div class="text-h4 q-mb-md">Movies</div>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                  praesentium cumque magnam odio iure quidem, quod illum numquam
                  possimus obcaecati commodi minima assumenda consectetur culpa
                  fuga nulla ullam. In, libero.
                </p>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                  praesentium cumque magnam odio iure quidem, quod illum numquam
                  possimus obcaecati commodi minima assumenda consectetur culpa
                  fuga nulla ullam. In, libero.
                </p>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                  praesentium cumque magnam odio iure quidem, quod illum numquam
                  possimus obcaecati commodi minima assumenda consectetur culpa
                  fuga nulla ullam. In, libero.
                </p>
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