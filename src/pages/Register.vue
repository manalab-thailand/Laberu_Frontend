<template>
  <q-layout view="lHh Lpr lFf">
    <backgroundDisplay></backgroundDisplay>

    <q-page-container style="padding-top: 0">
      <div class="context">
        <div class="fixed-center">
          <q-card class="regisCard">
            <q-form @submit="onSubmit" class="q-gutter-md">
              <div class="row">
                <div class="col">
                  <q-input
                    filled
                    color="grey-3"
                    label-color="primary"
                    outlined
                    v-model="fname"
                    label="ชื่อ / Name"
                    :rules="[
                      (val) => (val && val.length > 0) || 'กรุณาใส่ชื่อ',
                    ]"
                  >
                    <template v-slot:append>
                      <q-icon name="person" color="primary" />
                    </template>
                  </q-input>
                </div>
                <div style="margin: 0 10px"></div>
                <div class="col">
                  <q-input
                    filled
                    color="grey-3"
                    label-color="primary"
                    outlined
                    v-model="lname"
                    label="นามสกุล / Surname"
                    :rules="[
                      (val) => (val && val.length > 0) || 'กรุณาใส่นามสกุล',
                    ]"
                  >
                    <template v-slot:append>
                      <q-icon name="person" color="primary" />
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <q-input
                    label="วันเกิด / DOB"
                    label-color="primary"
                    filled
                    v-model="birth"
                    mask="####-##-##"
                    :rules="[
                      (val) => (val && val.length == 10) || 'กรุณาใส่วันเกิด',
                    ]"
                  >
                    <template v-slot:append>
                      <q-icon
                        name="event"
                        class="cursor-pointer"
                        color="primary"
                      >
                        <q-popup-proxy
                          ref="qDateProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            label-color="primary"
                            v-model="birth"
                            @input="() => $refs.qDateProxy.hide()"
                          ></q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div style="margin: 0 10px"></div>
                <div class="col">
                  <q-input
                    filled
                    color="grey-3"
                    label-color="primary"
                    outlined
                    v-model="phone_number"
                    label="เบอร์โทรศัพท์ / Phone number"
                    :rules="[
                      (val) =>
                        (val &&
                          val.length == 10 &&
                          val.match(/^[0-9]+$/) != null) ||
                        'เบอร์โทรศัพท์ไม่ถูกต้อง',
                    ]"
                  >
                    <template v-slot:append>
                      <q-icon name="phone" color="primary" />
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <q-select
                    filled
                    color="grey-3"
                    label-color="primary"
                    outlined
                    v-model="career"
                    :options="career_th"
                    transition-show="jump-up"
                    transition-hide="jump-up"
                    label="อาชีพ / Career"
                    :rules="[
                      (val) => (val && val.length > 0) || 'กรุณาใส่อาชีพ',
                    ]"
                  >
                  </q-select>
                </div>
                <div style="margin: 0 10px"></div>
                <div class="col">
                  <q-select
                    filled
                    color="grey-3"
                    label-color="primary"
                    transition-show="jump-up"
                    transition-hide="jump-up"
                    v-model="province"
                    :options="province_th"
                    label="จังหวัด / Province"
                    :rules="[
                      (val) => (val && val.length > 0) || 'กรุณาใส่จังหวัด',
                    ]"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <q-input
                    filled
                    color="grey-3"
                    label-color="primary"
                    outlined
                    transition-show="jump-up"
                    transition-hide="jump-up"
                    v-model="studentId"
                    label="Student ID ( not require )"
                  />
                </div>
              </div>
              <q-toggle
                v-model="accept"
                label="I accept the license and terms"
              />
              <div class="regisCol" align="center">
                <q-btn
                  class="q-mt-xs btnRegis"
                  type="submit"
                  outline
                  color="primary"
                  label="REGISTER"
                />
              </div>
            </q-form>
          </q-card>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import backgroundDisplay from "../components/login_animation";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { QSpinnerFacebook } from "quasar";
import Axios from "app/node_modules/axios";
export default {
  computed: {
    ...mapGetters({
      databaseUrl: "db_config/databaseUrl",
      getUserRegister: "user_config/getUserRegister",
    }),
  },
  data() {
    return {
      fname: null,
      lname: null,
      birth: null,
      career: null,
      province: null,
      location: null,
      phone_number: null,
      accept: false,
      studentId: null,
      career_th: [
        "การเกษตร",
        "การศึกษา",
        "การแพทย์",
        "การเงินและธุรกิจ",
        "การท่องเที่ยว",
        "การคมนาคม",
        "ข้าราชการ",
        "กฏหมาย",
      ],
      province_th: [
        "กรุงเทพฯ",
        "กระบี่",
        "กาญจนบุรี",
        "กาฬสินธุ์",
        "กำแพงเพชร",
        "ขอนแก่น",
        "จันทบุรี",
        "ฉะเชิงเทรา",
        "ชลบุรี",
        "ชัยนาท",
        "ชัยภูมิ",
        "ชุมพร",
        "เชียงใหม่",
        "เชียงราย",
        "ตรัง",
        "ตราด",
        "ตาก",
        "นครนายก",
        "นครปฐม",
        "นครพนม",
        "นครราชสีมา",
        "นครศรีธรรมราช",
        "นครสวรรค์",
        "นนทบุรี",
        "นราธิวาส",
        "น่าน",
        "บึงกาฬ",
        "บุรีรัมย์",
        "ปทุมธานี",
        "ประจวบคีรีขันธ์",
        "ปราจีนบุรี",
        "ปัตตานี",
        "พระนครศรีอยุธยา",
        "พะเยา",
        "พังงา",
        "พัทลุง",
        "พิจิตร",
        "พิษณุโลก",
        "เพชรบุรี",
        "เพชรบูรณ์",
        "แพร่",
        "ภูเก็ต",
        "มหาสารคาม",
        "มุกดาหาร",
        "แม่ฮ่องสอน",
        "ยโสธร",
        "ยะลา",
        "ร้อยเอ็ด",
        "ระนอง",
        "ระยอง",
        "ราชบุรี",
        "ลพบุรี",
        "ลำปาง",
        "ลำพูน",
        "เลย",
        "ศรีสะเกษ",
        "สกลนคร",
        "สงขลา",
        "สตูล",
        "สมุทรปราการ",
        "สมุทรสงคราม",
        "สมุทรสาคร",
        "สระแก้ว",
        "สระบุรี",
        "สิงห์บุรี",
        "สุโขทัย",
        "สุพรรณบุรี",
        "สุราษฎร์ธานี",
        "สุรินทร์",
        "หนองคาย",
        "หนองบัวลำภู",
        "อ่างทอง",
        "อำนาจเจริญ",
        "อุดรธานี",
        "อุตรดิตถ์",
        "อุทัยธานี",
        "อุบลราชธานี",
      ],
    };
  },
  components: {
    backgroundDisplay,
  },
  methods: {
    ...mapActions({
      setUserConfig: "user_config/setUserConfig",
    }),
    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You need to accept the license and terms first",
        });
      } else {
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted",
        });

        this.showLoading();
        this.createAccount();
      }
    },
    async createAccount() {
      try {
        await Axios.post(`${this.databaseUrl}/user-laberu/create`, {
          firstname: this.fname,
          lastname: this.lname,
          email: this.getUserRegister.email,
          birth: this.birth,
          phonenumber: this.phone_number,
          career: this.career,
          province: this.province,
          studentId: this.studentId,
          location: this.location,
          status: "user",
          uid: this.getUserRegister.uid,
        }).then(async (response) => {
          this.onTimeout();
          await this.getUserID();
          this.$router.push({ name: "home" });
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getUserID() {
      try {
        const user = await this.$axios.get(
          `${this.databaseUrl}/user-laberu/checkuserActive`,
          {
            params: {
              uid: this.getUserUid,
            },
          }
        );

        this.setUserConfig({
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          birth: user.birth,
          email: user.email,
          phonenumber: user.phonenumber,
          career: user.career,
          location: user.location,
          province: user.province,
          studentId: this.studentId,
          status: user.status,
          uid: user.uid,
        });
      } catch (error) {
        console.log(error);
      }
    },
    showLoading() {
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: "yellow",
        spinnerSize: 180,
        backgroundColor: "blue-8",
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

<style>
.btnRegis {
  display: block;
  width: 50%;
  height: 3rem;
  border: none;
  padding: 0px 28px;
  cursor: pointer;
}
.regisCol {
  padding: 0px 0 0 0;
}
.regisText {
  text-align: left;
  font-size: 20px;
  font-weight: 400;
}
.navUsername {
  color: black;
}
.paddingCol {
  padding: 15px 30px 15px 30px;
}
.regisCard {
  width: 700px;
  padding: 30px 30px 30px 30px;
}
.q-pa-md {
  padding: 16px 16px;
  margin: -20px 0 0 0;
}
.q-textarea .q-field__native {
  resize: none;
  padding-top: 17px;
  min-height: 52px;
}
.toolbarT {
  height: 80px;
  background: #f8f8f8;
}
.titleName {
  color: #666877;
}
.my-card {
  width: 400px;
  border-radius: 10px;
}
.context {
  width: 100%;
  position: absolute;
  top: 10rem;
}
</style>