<template>
  <q-layout view="hhh lpR fFf">
    <div v-if="currentPage == null">
      <q-header elevated class="bg-cyan" style="position: fixed">
        <q-toolbar class="text-black bg-white">
          <div class="row justify-between" style="width: 100%">
            <div class="row items-center">
              <q-avatar>
                <img src="../images/icon.png" />
              </q-avatar>
              <q-toolbar-title class="text-h5 text-weight-bold">
                Laberu.tech
              </q-toolbar-title>
            </div>
          </div>
        </q-toolbar>
      </q-header>
    </div>
    <div v-else>
      <q-header elevated class="bg-cyan" style="position: fixed">
        <q-toolbar class="text-black bg-white shadow-2">
          <div class="row justify-between" style="width: 100%">
            <div class="row items-center">
              <q-avatar>
                <img src="../images/icon.png" />
              </q-avatar>
              <q-toolbar-title class="text-h5 text-weight-bold">
                Laberu.tech
              </q-toolbar-title>
              <q-separator dark vertical inset color="grey" />
              <q-btn
                color="white"
                text-color="black"
                label="หน้าหลัก"
                class="text-weight-bold q-mx-sm"
                @click="linkPage('home')"
              />
              <q-separator dark vertical inset color="grey" />
              <q-btn
                color="white"
                text-color="black"
                label="โปรไฟล์"
                class="text-weight-bold q-mx-sm"
                @click="linkPage('profile')"
              />
            </div>
            <div class="row items-center">
              <div class="text-h7 text-weight-bold q-mr-md">
                {{ this.user.email }}
              </div>
              <q-separator dark vertical inset color="grey" />
              <q-btn
                color="white"
                text-color="black"
                label="ออกจากระบบ"
                @click="logout()"
                class="text-weight-bold"
              />
            </div>
          </div>
        </q-toolbar>
      </q-header>
    </div>

    <router-view />
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MainLayout",
  watch: {
    user_email(val) {
      this.user.email = val;
    },
  },
  data() {
    return {
      currentPage: null,
      user: {
        email: "",
      },
    };
  },
  methods: {
    linkPage(targetPage) {
      this.$router.push({ name: targetPage });
    },
    logout() {
      this.$auth.signOut().then(() => {
        this.$router.push("/");
      });
    },
  },
  updated() {
    if (
      this.$router.currentRoute.fullPath == "/" ||
      this.$router.currentRoute.fullPath == "/register" ||
      this.$router.currentRoute.fullPath == "/admin" ||
      this.$router.currentRoute.fullPath == "/createaccount"
    ) {
      this.currentPage = null;
    } else {
      this.currentPage = this.$router.currentRoute.fullPath;
    }
  },
};
</script>