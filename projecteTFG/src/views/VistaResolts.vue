<template>
  <div style="text-align: left;">
    <div v-if="exercicis.length == 0">
      <label style="margin-left: 50px;" class="text-white">No hi ha cap exercici resolt de moment</label>
    </div>
    <div style="max-width: 1000px; margin: auto; border: 1px solid #23252f; border-radius: 7px; padding: 20px 20px; background-color: #282a36;" class=" row flex-parent-element" v-else>
      <div class="flex-child-element" style="border: 1px solid #23252f; border-radius: 7px; padding: 20px 20px; background-color: #242630;">
          <h4 style="color: darkcyan;">Llista dels exercicis resolts</h4>
          <hr style="border: 2px solid darkcyan; margin-bottom: 15px;">
          <ul style="max-height:250px; overflow-y: auto;" class="list-group">
            <li class="list-group-item"
              :class="{ active: index == currentIndex }"
              v-for="(exercici, index) in exercicis"
              :key="index"
              @click="setActiveExercici(exercici, index)"
            >
              {{ exercici.title }}
            </li>
          </ul>       
      </div>
      <div class="flex-child-element" style="border: 1px solid #23252f; border-radius: 7px; padding: 20px 20px; background-color: #242630; margin: auto" >
          <div v-if="currentExercici">
            <div v-if="resolts.length>0">
              <ul style="max-height:250px; overflow-y: auto;" class="list-group">
                <li class="list-group-item"
                    :class="{ active: indexResolts == currentIndexResolts }"
                    v-for="(resolt, indexResolts) in resolts"
                    :key="indexResolts"
                    @click="setActiveResolt(resolt, indexResolts)"
                >
                  Resolució {{ indexResolts + 1 }}
                </li>
              </ul>
            </div>
            <div v-else>
              <p style="text-align: center;" class="text-blanco">No hi ha cap resolució per aquest exercici</p>
            </div>
          </div>
          <div v-else>
            <br />
            <p style="text-align: center;" class="text-blanco">Selecciona un exercici de la llista</p>
          </div>
      </div>
    </div>
    <div style="margin-top: 10px">
      <div style="margin: auto; max-width: 1000px; border: 1px solid #23252f; border-radius: 7px; padding: 20px 20px; background-color: #282a36;" class="flex-parent-element" v-if="currentResolt">
        <div style="max-width: 600px; margin: auto;" class="flex-child-element">
          <b-card
          class="dracula col-md-12 mb-3 w-100 mt-2 shadow-lg"
          >
          <div class="codi-style rounded col-md-12 shadow-md mt-2"> <codemirror v-model="currentResolt.codeAnswer" /> </div>
          </b-card>
        </div>
        <div class="second-element" style="margin: auto">
          <div class="text-blanco">
              <label><strong>Output esperat:</strong></label> {{ currentExercici.outputCode }}
          </div>
          <hr style="border: 1px solid gray">
          <div class="text-blanco">
              <label><strong>Output resposta:</strong></label> {{ currentResolt.outputAnswer }}
          </div>
          <hr style="border: 1px solid gray">
          <div class="text-blanco">
              <label><strong>Resolt el:</strong></label> {{ currentResolt.createdAt | formatDate }}
          </div>
          <hr style="border: 1px solid gray">
          <button style="border:0px; margin-top: 10px;" class="btn btn-danger ml-1 float-left mt-1"
            @click="borrarResposta">
            Borar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import 'codemirror/lib/codemirror.css'

import 'codemirror/theme/dracula.css'
import 'codemirror/theme/yonce.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/base16-light.css'


import 'codemirror/mode/clike/clike.js'
import 'codemirror/keymap/sublime.js'

export default {
  name: "resolts-list",
  data() {
    return {
      resolts: [],
      exercicis: [],
      currentResolt: null,
      currentExercici: null,
      currentIndex: -1,
      currentIndexResolts: -1,
      title: ""
    };
  },
  methods: {
    async retrieveExercici() {
      try {
        const response = await axios.get("http://localhost:8080/codis");
        this.exercicis = response.data;
        
      } catch (err) {
        console.log(err);
      }
    },

    refreshList() {
      this.retrieveExercici();
      this.currentExercici = null;
      this.currentResolt = null;
      this.currentIndex = -1;
      this.currentIndexResolts =  -1;
    },

    async setActiveExercici(exercici, index) {
      try {
        const response = await axios.get(`http://localhost:8080/resolts/answered/${exercici.id}`);
        this.resolts = response.data;
        this.currentExercici = exercici;
        this.currentIndex = index;
        this.currentIndexResolts =  -1;
        this.currentResolt = null;
      } catch (err) {
        console.log(err);
      }
    },

    async setActiveResolt(resolt, indexResolts) {
        this.currentResolt = resolt;
        this.currentIndexResolts = indexResolts;
    },

    async removeAllTutorials() {
      try {
        await axios.delete(`http://localhost:8080/resolts`);
        this.refreshList();
      } catch (err) {
        console.log(err);
      }
    },
    
    async borrarResposta() {
      try {
        await axios.delete(`http://localhost:8080/resolts/${this.currentResolt.id}`);
        this.refreshList();
      } catch (err) {
        console.log(err);
      }
    },
    
  },
  mounted() {
    this.retrieveExercici();
  }
  
};
</script>
<style scoped>
.list {
  text-align: left;
  max-width: 1500px;
  margin: auto;
}

h4 {
    color: #42b983;
}

.text-blanco {
    color: white;
}

.codi-style {
  max-width: 700px;
}

.flex-parent-element {
  display: flex;
}

.flex-child-element {
  flex: 1;
  margin: 10px;
}

.flex-child-element:first-child {
  margin-right: 20px;
}

.second-element {
  flex: 0 0 300px;
}

hr {
  margin-top: 10px;
  margin-bottom: 10px;
}


label {
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>