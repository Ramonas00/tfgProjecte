<template>
  <div v-if="current" class="edit-form">
    <form class="text-blanco">
      <div style="border: 1px solid #23252f; border-radius: 7px; padding: 15px 15px; background-color: #282a36; margin-bottom: 10px;" class="form-group">
        <label for="title">Títol</label>
        <input type="text" class="form-control" id="title"
          v-model="current.title"
        />
      </div>
      <div style="border: 1px solid #23252f; border-radius: 7px; padding: 15px 15px; background-color: #282a36; margin-bottom: 10px;" class="form-group">
        <label for="codes">Codi</label>
        <textarea class="form-control" id="codes" rows="15"
          v-model="current.codes"></textarea>
      </div>
      <div style="border: 1px solid #23252f; border-radius: 7px; padding: 15px 15px; background-color: #282a36; margin-bottom: 10px;" class="form-group">
        <label for="dificulty">Dificultat</label>
        <input type="text" class="form-control" id="dificulty"
          v-model="current.dificulty"
        />
      </div>
      <div style="border: 1px solid #23252f; border-radius: 7px; padding: 15px 15px; background-color: #282a36; margin-bottom: 10px;" class="form-group">
        <label for="description">Descripcció</label>
        <input type="text" class="form-control" id="description"
          v-model="current.description"
        />
      </div>
    </form>
    <button class="btn btn-danger mr-2 btn-sm"
      @click="deleteTutorial"
    >
      Borar
    </button>
    <button type="submit" class="btn btn-success btn-sm"
      @click="updateTutorial"
    >
      Guardar
    </button>
    <button type="submit" class="btn btn-info btn-sm float-right"
      @click="$router.push(`/llista`)"
    >
      Tornar
    </button>
    <p style="margin-top: 10px;" class="green-text">{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>No es cap exercici</p>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "tutorial",
  data() {
    return {
      current: null,
      message: ''
    };
  },
  methods: {
    async getTutorial() {
      try {
        const response = await axios.get(
          `http://localhost:8080/codis/${this.$route.params.id}`
        );
        //this.current.title = response.data.title;
        //this.current.codes = response.data.codes;
        //this.current.dificulty = response.data.dificulty;
        //this.current.description = response.data.description;
        this.current = response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async updateTutorial() {
      try {
        await axios.put(
          `http://localhost:8080/codis/${this.$route.params.id}`,
          {
            title: this.current.title,
            codes: this.current.codes,
            dificulty: this.current.dificulty,
            description: this.current.description
          }
        );
        this.productName = "";
        this.productPrice = "";
        this.message = "S'ha modificat correctament";
        //this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },

    async deleteTutorial() {
      try {
        await axios.delete(`http://localhost:8080/resolts/byExercici/${this.$route.params.id}`);
        await axios.delete(`http://localhost:8080/codis/${this.$route.params.id}`);
        this.$router.push("/llista");
      } catch (err) {
        console.log(err);
      }
    },
    
  },
  mounted() {
    this.message = '';
    this.getTutorial(this.$route.params.id);
  }
};
</script>
<style scoped>
.edit-form {
  text-align: left;
  max-width: 700px;
  margin: auto;
}

.text-blanco {
    color: white;
}

h4 {
    color: #42b983;
}

.green-text {
    color: green
}
</style>