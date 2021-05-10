<template>
  <q-layout view="hhh lpR fFf">
    <div v-if="currentPage == null">
      <q-header elevated class="bg-cyan">
        <q-toolbar class="text-black bg-white">
          <div class="row justify-between" style="width: 100%">
            <div class="row items-center">
              <q-avatar>
                <img src="../images/icon.png" />
              </q-avatar>
              <q-toolbar-title class="text-h5 text-weight-bold">
                Laberu.ai
              </q-toolbar-title>
            </div>
          </div>
        </q-toolbar>
      </q-header>
    </div>
    <div v-else>
      <q-header elevated class="bg-cyan">
        <q-toolbar class="text-black bg-white">
          <div class="row justify-between" style="width: 100%">
            <div class="row items-center">
              <q-avatar>
                <img src="../images/icon.png" />
              </q-avatar>
              <q-toolbar-title class="text-h5 text-weight-bold">
                Laberu.ai
              </q-toolbar-title>
              <q-separator vertical size="2px" color="black" />
              <q-btn
                color="white"
                text-color="black"
                label="หน้าหลัก"
                class="text-weight-bold q-mx-sm"
              />
              <q-separator vertical size="2px" color="black" />
              <q-btn
                color="white"
                text-color="black"
                label="โปรไฟล์"
                class="text-weight-bold q-mx-sm"
              />
              <q-separator vertical size="2px" color="black" />
            </div>
            <div class="row items-center">
              <div class="text-h6 text-weight-bold q-mr-md">
                Laberu.dev@gmail.com
              </div>
              <q-separator vertical size="2px" color="black" />
              <q-btn
                color="white"
                text-color="black"
                label="ออกจากระบบ"
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
export default {
  name: "MainLayout",
  data() {
    return {
      currentPage: 20,
    };
  },
  methods: {},
  updated() {
    if (
      this.$router.currentRoute.fullPath == "/" ||
      this.$router.currentRoute.fullPath == "/register" ||
      this.$router.currentRoute.fullPath == "/admin"
    ) {
      this.currentPage = null;
    } else {
      this.currentPage = this.$router.currentRoute.fullPath;
    }
  },
};
</script>