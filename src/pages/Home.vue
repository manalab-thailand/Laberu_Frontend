<template>
  <q-layout view="lHh Lpr lFf">
    <backgroundDisplay></backgroundDisplay>
    <div class="row justify-center">
      <div class="context">
        <div class="text-h2 text-right text-white title-list">
          <p style="text-shadow: rgba(149, 165, 166, 1) 5px 2px">
            Laberu Project List
          </p>
        </div>
        <div class="areaListItem">
          <listproject></listproject>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script>
import backgroundDisplay from "../components/login_animation";
import listproject from "../components/home/list-project.vue";
export default {
  components: {
    backgroundDisplay,
    listproject,
  },
};
</script>

<style scoped src="../css/home.css">
</style>