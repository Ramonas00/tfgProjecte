<template>
  <b-container>
    <div style="border: 1px solid #23252f; border-radius: 7px; padding: 30px 30px; background-color: #282a36;" v-if="!preguntat">
      <h5 style="color: darkgrey;">Selecciona si crear un exercici o un qüestionari</h5>
      <hr style="border: 1px solid #23252f;">
      <b-button @click="newExercici" class="ml-1 float-center mt-1 boto-crear">Exercici</b-button>
      <b-button v-b-modal.modalNotif @click="$('#myModal').data('modalNotif').$backdrop.css('background-color','orange')" class="ml-2 float-center mt-1 boto-crear">Qüestionari</b-button>
    </div>

    <b-modal style="background-color: #282a36; padding: 50px 50px;" :hide-footer="true" :hide-header="true" no-close-on-backdrop no-close-on-esc  id="modalNotif">
      <p style="margin-bottom: 10px">En la creació del qüestionari només podràs afegir 10 exercicis com a màxim</p>
      <hr>
      <button style="margin-top: 10px;" class="btn btn-outline-secondary ml-1 float-right mt-1" variant="outline-secondary" v-b-modal.modal-3 @click="$bvModal.hide('modalNotif'); newQuestionari()">Seguir</button>
    </b-modal>

    <div v-if="preguntatQ">
      <div style="border: 1px solid #23252f; border-radius: 7px; padding: 30px 30px; background-color: #282a36;" v-if="!questCreat" class="form-group">
        <h5 style="color: darkgrey;">Tria un títol per al qüestionari a crear</h5>
        <hr style="border: 1px solid #23252f;">
        <div class="d-flex">
          <input style="max-width:inherit"
            type="text"
            class="form-control"
            id="titleQ"
            required
            v-model="titleQ"
            name="titleQ"
            placeholder="Nom del qúestionari"
          />
          <b-button @click="createQuest" class="boto-crear ml-3">Següent</b-button>       
        </div>
      </div>
      
      <div v-if="questCreat && exerCreats<10">
        <div style="border: 1px solid #23252f; border-radius: 7px; padding: 30px 30px; background-color: #282a36;">
          <h4 style="color: orangered; font-size: 20px;">Tens un màxim de 10 exercicis per crear o afegir</h4>
          <h4>Exercici {{exerCreats+1}}</h4>
        </div>
        <b-card
        :class="bytheme"
        class="dracula col-md-12 mb-3 w-100 mt-2 shadow-lg"
        >
          <div class="row">
            <div class="rounded col-md-12 shadow-md mt-2">
              <codemirror v-model="code" :options="cmOption" />

            </div>
            <b-card
              class="w-100 mt-2"
              style="background:rgba(0,0,0,0); max-height: 120px; min-height: 120px; overflow-y:auto; border:none;"
            >
              <b-badge variant="danger" class="text-white"
                >output:
                <b-icon icon="file-earmark-arrow-down" variant="white"></b-icon>
              </b-badge>
              <br />
              <span class="text-white" style="font-family:monospace;">
                {{ output }}
              </span>
            </b-card>
          </div>
          <b-button @click="newTutorial" v-b-modal.modal-1 :disabled="!allowc" variant="success" class="ml-1 float-right mt-1">crear</b-button>
          <b-button @click="compile" variant="success" class="ml-1 float-right mt-1">compilar</b-button>
          <b-button class="float-right mx-auto mt-1" variant="danger" @click="reset"><b-icon icon="arrow-counterclockwise"></b-icon></b-button>
        </b-card>

        <div v-if="tutorials.length > 0">
          <b-button @click="traureExercicis" v-b-modal.modal-2 variant="success" class="ml-1 float-left mt">Afegir exercici</b-button>
        </div>

        <div v-if="exerCreats>=1">
          <b-button @click="$router.push(`/quests`)" v-b-modal.modal-2 variant="success" class="ml-1 float-right mt">Acabar creació</b-button>
        </div>

        <b-modal id="modal-1" title="Crear exercici">
          <div class="submit-form">
            <div v-if="!submitted">
              <div class="form-group">
                <label for="title">Títol</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  required
                  v-model="tutorial.title"
                  name="title"
                />
              </div>
              <div class="form-group">
                <label for="dificulty">Dificultat</label>
                <input
                  class="form-control"
                  id="dificulty"
                  required
                  v-model="tutorial.dificulty"
                  name="dificulty"
                />
              </div>
              <div class="form-group">
                <label for="description">Descripcció</label>
                <input
                  class="form-control"
                  id="description"
                  required
                  v-model="tutorial.description"
                  name="description"
                />
              </div>
              <div class="form-group">
                <label for="output">Output</label>
                <input
                  class="form-control"
                  id="output"
                  required
                  v-model="tutorial.outputCode"
                  name="output"
                />
                <!-- <b-button v-b-modal.modal-2 variant="warning" class="ml-1 float-right mt-1">Afegir Output</b-button> -->
              </div>
              <div class="form-group">
                <input
                  type="hidden"
                  class="form-control"
                  id="codes"
                  v-model="tutorial.codes"
                  name="codes"
                  value="code"
                />
              </div>
              <button @click="saveExercici" class="btn btn-success">Afegir</button>
            </div>
            <div v-else>
              <h4>S'ha afegit correctament</h4>
              <button class="btn btn-success" @click="newTutorial">Afegir més</button>
            </div>
          </div>
        </b-modal>

        <b-modal :hide-footer="true" id="modal-2" size="lg" title="Afegir exercici existent">
          <ul style="max-height:250px; overflow-y: auto;" class="list-group">
            <li class="list-group-item"
              :class="{ active: index == currentIndex }"
              v-for="(tutorial, index) in tutorials"
              :key="index"
              @click="setActiveTutorial(tutorial, index)"
            >
              {{ tutorial.title }}
            </li>
          </ul>
          <button style="margin-top: 10px;" class="btn btn-success ml-1 float-right mt-1" v-b-modal.modal-3 >Veure més</button>
          <button style="margin-top: 10px;" class="btn btn-success ml-1 float-right mt-1" @click="()=>{saveCreatedExercici(); $bvModal.hide('modal-2');}">Afegir</button>
        </b-modal>

        <b-modal :hide-footer="true" id="modal-3" size="lg" title="Informació de l'exercici">
          <div v-if="currentTutorial">
            <div class="text-black">
              <label><strong>Títol:</strong></label> {{ currentTutorial.title }}
            </div>
            <div class="text-black">
              <label><strong>Dificultat:</strong></label> {{ currentTutorial.dificulty }}
            </div>
            <div class="text-black">
              <label><strong>Descripcció:</strong></label> {{ currentTutorial.description }}
            </div>
            <div class="text-black">
              <label><strong>Output:</strong></label> {{ currentTutorial.outputCode }}
            </div>
          </div>
        </b-modal>
      </div>

      <div v-if="exerCreats==10">
        <h4>Ja s'han afegit 10 exercicis al qüestionari</h4>
      </div>
    </div>


    <div v-if="preguntatE">
      <b-card
        :class="bytheme"
        class="dracula col-md-12 mb-3 w-100 mt-2 shadow-lg"
      >
        <div class="row">
          <div class="rounded col-md-12 shadow-md mt-2">
            <codemirror v-model="code" :options="cmOption" />

          </div>
          <b-card
            class="w-100 mt-2"
            style="background:rgba(0,0,0,0); max-height: 120px; min-height: 120px; overflow-y:auto; border:none;"
          >
            <b-badge variant="danger" class="text-white"
              >output:
              <b-icon icon="file-earmark-arrow-down" variant="white"></b-icon>
            </b-badge>
            <br />
            <span class="text-white" style="font-family:monospace;">
              {{ output }}
            </span>
          </b-card>
        </div>
        <b-button @click="newTutorial" v-b-modal.modal-1 :disabled="!allowc" variant="success" class="ml-1 float-right mt-1">crear</b-button>
        <b-button @click="compile" variant="success" class="ml-1 float-right mt-1">compilar</b-button>
        <b-button class="float-right mx-auto mt-1" variant="danger" @click="reset"><b-icon icon="arrow-counterclockwise"></b-icon></b-button>
      </b-card>

      <b-modal :hide-footer="true" id="modal-1" title="Crear exercici">
        <div class="submit-form">
          <div v-if="!submitted">
            <div class="form-group">
              <label for="title">Títol</label>
              <input
                type="text"
                class="form-control"
                id="title"
                required
                v-model="tutorial.title"
                name="title"
              />
            </div>
            <div class="form-group">
              <label for="dificulty">Dificultat</label>
              <input
                class="form-control"
                id="dificulty"
                required
                v-model="tutorial.dificulty"
                name="dificulty"
              />
            </div>
            <div class="form-group">
              <label for="description">Descripcció</label>
              <input
                class="form-control"
                id="description"
                required
                v-model="tutorial.description"
                name="description"
              />
            </div>
            <div class="form-group">
              <label for="output">Output</label>
              <input
                class="form-control"
                id="output"
                required
                v-model="tutorial.outputCode"
                name="output"
              />
              <!-- <b-button v-b-modal.modal-2 variant="warning" class="ml-1 float-right mt-1">Afegir Output</b-button> -->
            </div>
            <div class="form-group">
              <input
                type="hidden"
                class="form-control"
                id="codes"
                v-model="tutorial.codes"
                name="codes"
                value="code"
              />
            </div>
            <button @click="saveTutorial" class="btn btn-success">Afegir</button>
          </div>
          <div v-else>
            <h4>S'ha afegit correctament</h4>
            <button style="margin-top: 10px;" class="btn btn-success ml-1 float-right mt-1" @click="preguntat=false; preguntatE=false">Acabar</button>
            <button style="margin-top: 10px;" class="btn btn-success ml-1 float-right mt-1" @click="newTutorial">Afegir més</button>
          </div>
        </div>
      </b-modal>

      <b-modal id="modal-2" size="lg" title="Afegir Output">
        <b-card
          :class="bytheme"
          class="dracula col-md-12 mb-3 w-100 mt-2 shadow-lg"
        >
          <div class="row">
            <div class="rounded col-md-12 shadow-md mt-2">
              <codemirror v-model="codeOut" :options="cmOption" />

            </div>
            <b-card
              class="w-100 mt-2"
              style="background:rgba(0,0,0,0); max-height: 120px; min-height: 120px; overflow-y:auto; border:none;"
            >
              <b-badge variant="danger" class="text-white"
                >output:
                <b-icon icon="file-earmark-arrow-down" variant="white"></b-icon>
              </b-badge>
              <br />
              <span class="text-white" style="font-family:monospace;">
                {{ outputOut }}
              </span>
            </b-card>
          </div>>
          <b-button @click="compileOut" variant="success" class="ml-1 float-right mt-1">compilar</b-button>
          <b-button class="float-right mx-auto mt-1" variant="danger" @click="reset"><b-icon icon="arrow-counterclockwise"></b-icon></b-button>
        </b-card>
      </b-modal>
    </div>
  </b-container>
</template>
<script>

import notas from './extra/notas.vue'
import themes from './extra/themes.vue'
import {mapGetters} from 'vuex'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

import 'codemirror/theme/dracula.css'
import 'codemirror/theme/yonce.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/base16-light.css'


import 'codemirror/mode/clike/clike.js'
import 'codemirror/keymap/sublime.js'

import axios from "axios";

export default {  

  data() {
    return{
      tutorial: {
        id: null,
        title: "",
        dificulty: "",
        codes: "",
        description: "",
        outputCode: "",
      },
      submitted: false,
      allowc: false,
      preguntat: false,
      preguntatE: false,
      preguntatQ: false,
      questCreat: false,
      titleQ: "",
      exerCreats: 0,
      questionari: null,
      tutorials: [],
      currentIndex: -1,
      currentTutorial: null,
      creacioAcabat: false,
    };
  },

  beforeRouteLeave (to, from , next) {
    const answer = window.confirm('Si surts de la pàgina és perdrà la resolució actual!')
    if (answer) {

      next()
    } else {
      next(false)
    }

  },

  name: "basecanvas",
  components: {
    notas,
    themes,
    codemirror
  },

  created() {
    this.charge();
    this.$root.$on('Theme',()=>{
      this.$forceUpdate();
    });
  },

  methods: {
    charge() {
      this.$store.commit('charge');
    },

    compile() {
        this.allowc = true;
        this.$store.commit('compile');
    },

    compileOut() {
        this.allowc = true;
        this.$store.commit('compileOut');
    },

    guardar(){
        this.$codeList.push('code');
    },
    state() {
      this.$store.commit('charge');
    },
     
   download() {
     this.$store.commit('download');
   },

    downloadOut() {
     this.$store.commitOut('downloadOut');
   },

   getAssembly() {
     this.$store.commit('getAssembly');
   },
    reset() {
      this.$store.state.output = '';
    },
    async saveTutorial() {
      try {
        await axios.post("http://localhost:8080/codis", {
          title: this.tutorial.title,
          codes: this.code,
          dificulty: this.tutorial.dificulty,
          description: this.tutorial.description,
          outputCode: this.tutorial.outputCode,
        });
        this.tutorial.title = "";
        //this.code = "";
        this.tutorial.dificulty = "";
        this.tutorial.description = "";
        this.submitted = true;
        //this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
    
    newTutorial() {
      this.submitted = false;
      this.tutorial = {};
    },

    newExercici() {
      this.preguntatE = true;
      this.preguntat = true;
    },

    newQuestionari() {
      this.preguntatQ = true;
      this.preguntat = true;
    },

    async createQuest() {
      this.questCreat = true;

      try {
        const response = await axios.post("http://localhost:8080/quest", {
          title: this.titleQ,
        });
        this.questionari = response.data.id;
        this.titleQ = "";
      } catch (err) {
        console.log(err);
      }
    },

    async saveExercici() {
      this.exerCreats = this.exerCreats + 1;

      try {
        const response = await axios.post("http://localhost:8080/codis", {
          title: this.tutorial.title,
          codes: this.code,
          dificulty: this.tutorial.dificulty,
          description: this.tutorial.description,
          outputCode: this.tutorial.outputCode,
        });
        this.tutorial.title = "";
        this.tutorial.dificulty = "";
        this.tutorial.description = "";
        this.submitted = true;

        await axios.post("http://localhost:8080/codiQuest", {
          questionariId: this.questionari,
          codiId: response.data.id,
        })
      } catch (err) {
        console.log(err);
      }
    },

    async saveCreatedExercici() {
      this.exerCreats = this.exerCreats + 1;

      try {
          await axios.post("http://localhost:8080/codiQuest", {
          questionariId: this.questionari,
          codiId: this.currentTutorial.id,
        });
      } catch (err) {
        console.log(err);
      }
    },

    async traureExercicis() {
      try {
        const response = await axios.get("http://localhost:8080/codis");
        this.tutorials = response.data;
      } catch (err) {
        console.log(err);
      }
    },

    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = index;
    },

    async deleteQuestCreat() {
      try {
        await axios.delete(`http://localhost:8080/quest/${this.questionari}`);
      } catch (err) {
        console.log(err);
      }
    }

  },

  mounted() {
      this.traureExercicis();
      this.code = `#include <iostream>

  int main() {
    
    
    
  return 0;
  }`;
  this.output ="";
  },

  
  computed: {

     ...mapGetters([
        'time',
        'seed',
        'cmOption'
     ]),
       
       flags: {
         get() {       return this.$store.state.cxxflags; },
         set(value) {  this.$store.commit('superUpdate', {type: 'flags', data:value }); }
       },

      standar: {
        get() {       return this.$store.state.standar;   },
        set(value) {  this.$store.commit('superUpdate',   {type: 'standar', data: value}); }
      },

      code: {
        get() {        return this.$store.state.code;     },
        set(value) {   this.$store.commit('superUpdate',  {type: 'code', data: value});  }
      },

      codeOut: {
        get() {        return this.$store.state.codeOut;     },
        set(value) {   this.$store.commit('superUpdate',  {type: 'codeOut', data: value});  }
      },

      buffer: {
        get() {        return this.$store.state.buffer;   },
        set(value) {  this.$store.commit('superUpdate',   {type:'buffer', data: value});   }
      },
      output: {
        get() {        return this.$store.state.output;     },
        set(value) {   this.$store.commit('superUpdate',  {type: 'output', data: value});  }
      },
      outputOut: {
        get() {        return this.$store.state.outputOut;     },
        set(value) {   this.$store.commit('superUpdate',  {type: 'outputOut', data: value});  }
      },
      temp: {
        get() {        return this.$store.state.temp;     },
        set(value) {   this.$store.commit('superUpdate',  {type: 'temp', data: value});  }
      },
      optimizar: {
        get() {        return this.$store.state.optimizar;     },
        set(value) {   this.$store.commit('superUpdate',  {type: 'optimizar', data: value});  }
      },

      bytheme() {
          return this.$store.state.bytheme;
      }
},

  

};
</script>






<style scoped>

.dracula {
  background: rgb(40, 42, 54);
  min-height: 530px;
}
.monokai {
  background: rgb(39, 40, 34);
}
.yonce {
  background: rgb(28, 28, 28);
}
.base16-dark { 
  background: rgb(21, 21, 21);
}
.default {
  background: rgb(199, 200, 204);
}

h4 {
  color: #42b983;
}

.text-black {
  color: black
}

.boto-crear {
  background-color: transparent;
  color: grey; 
  border: 1px solid grey;
}

.boto-crear:hover {
  background-color: grey;
  color: white;
}

</style>
