<template>
  <q-layout view="lHh Lpr lFf">
    <backgroundDisplay></backgroundDisplay>

    <div class="q-pa-md" style="padding: 8rem 12rem 0rem 12rem">
      <div class="q-gutter-y-md" style="max-width: auto">
        <q-card>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab class="text-violet" name="users" label="User" />
            <q-tab class="text-violet" name="images" label="Image" />
          </q-tabs>

          <q-separator />

          <q-tab-panels
            v-model="tab"
            animated
            class="bg-white text-black"
            transition-prev="scale"
            transition-next="scale"
          >
            <q-tab-panel name="users">
              <Usertabs></Usertabs>
            </q-tab-panel>

            <q-tab-panel name="images">
              <Imagetabs></Imagetabs>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-layout>
</template>
<script>
import backgroundDisplay from "../components/admin/adminBG";
import Usertabs from "../components/admin/user_tabs.vue";
import Imagetabs from "../components/admin/image_tabs.vue";
export default {
  components: {
    backgroundDisplay,
    Usertabs,
    Imagetabs,
  },
  data() {
    return {
      tab: "users",
    };
  },
};
</script>

<style scoped src="../css/admin.css">
</style>