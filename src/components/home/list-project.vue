<template>
  <div class="row">
    <div class="col-4" v-for="(project, index) in projects">
      <div class="card-container">
        <div
          class="card"
          :style="{ background: bgColorBox(project.labelType) }"
        >
          <div class="card__icon">
            <div class="col-12">
              <div v-if="project.labelType == 'labelling'">
                <div class="row items-ends">
                  <q-icon name="image_search"></q-icon>
                  <span style="padding-left: 5px"></span>
                  <h6>{{ project.labelType }}/ตีกรอบรูปภาพ</h6>
                </div>
              </div>
              <div v-else-if="project.labelType == 'annotation'">
                <div class="row items-ends">
                  <q-icon name="drive_file_rename_outline"></q-icon>
                  <span style="padding-left: 5px"></span>
                  <h6>{{ project.labelType }}/อธิบายรูปภาพ</h6>
                </div>
              </div>
              <div v-else>
                <div class="row items-ends">
                  <q-icon name="grid_view"></q-icon>
                  <span style="padding-left: 5px"></span>
                  <h6>{{ project.labelType }}/จัดหมวดหมู่</h6>
                </div>
              </div>
            </div>
            <div style="padding-top: 0.3rem">
              <h4 class="card__title">{{ project.project_name }}</h4>
              <h6 class="card__title">
                Price/image : {{ project.priceEach }} ฿
              </h6>
            </div>
          </div>
          <div class="card__apply">
            <div class="row justify-end">
              <a class="cursor-pointer" @click="getStarted(project)"
                >Get started <i class="fas fa-arrow-right"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      databaseUrl: "db_config/databaseUrl",
    }),
  },
  data() {
    return {
      projects: [],
    };
  },
  async mounted() {
    await this.getProject();
  },
  methods: {
    ...mapActions({
      setProjectConfig: "project_config/setProjectConfig",
    }),
    async getProject() {
      const response = await Axios.get(
        `${this.databaseUrl}/projectmanagement/findProject`
      );
      this.projects = response.data;
    },
    getStarted(data) {
      this.setProjectConfig({
        _id: data._id,
        config: data.config,
        labellingCount: data.labellingCount,
        baseImageUrl: data.baseImageUrl,
        priceEach: data.priceEach,
      });

      console.log(data.labelType);

      switch (data.labelType) {
        case "annotation":
          this.$router.push({ name: "annotation" });
          break;
        case "labelling":
          this.$router.push({ name: "label" });
          break;
        case "classification":
          this.$router.push({ name: "class" });
          break;
      }
    },
    bgColorBox(type) {
      switch (type) {
        case "labelling": {
          return "linear-gradient(to right, #6782b4, #b1bfd8)";
        }
        case "annotation": {
          return "linear-gradient(to right, #3eadcf, #abe9cd)";
        }
        case "classification": {
          return "linear-gradient(to right, #a88beb, #f8ceec)";
        }
      }
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* div {
  border: dashed;
} */

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.heading-container {
  text-align: center;
}

.heading {
  font-weight: 600;
}

.credit {
  margin: 10px 0px;
  color: #888888;
  font-size: 25px;
  transition: all 0.5s;
}

.credit a {
  color: inherit;
}

a,
.card__exit,
.card__icon {
  position: relative;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
}

a::after {
  position: absolute;
  top: 25px;
  left: 0;
  content: "";
  width: 0%;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.6);
  transition: all 0.5s;
}

a:hover::after {
  width: 100%;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.card {
  margin: 0.5rem 1rem 0.5rem 1rem;
  padding: 0px 10px 0px 10px;
  width: 100%;
  min-height: 200px;
  display: grid;
  grid-template-rows: 20px 50px 1fr 50px;
  border-radius: 10px;
  /* box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.5); */
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transition: all 0.5s;
}

.card:hover {
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
  transform: scale(1.1);
}

.card__exit {
  grid-row: 1/2;
  justify-self: end;
}

.card__icon {
  grid-row: 2/3;
  font-size: 30px;
}

.card__title {
  font-weight: 400;
  color: #ffffff;
}

.card__apply {
  grid-row: 4/5;
  align-self: center;
}

@media (max-width: 1600px) {
  .card-container {
    justify-content: center;
  }
}
</style>