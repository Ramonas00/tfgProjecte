<template>
  <div style="text-align: left;">
    <div v-if="tutorials.length == 0">
      <label style="margin-left: 50px;" class="text-white">No hi ha cap exercici creat de moment</label>
    </div>
    <div style="max-width: 1000px; margin: auto; border: 1px solid #23252f; border-radius: 7px; padding: 20px 20px; background-color: #282a36;" v-else class=" row flex-parent-element">
      <div class="flex-child-element">
        <h4 style="color: darkcyan;">Llista dels exercicis</h4>
        <hr style="border: 2px solid darkcyan; margin-bottom: 15px;">
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
        <button class="mt-3 ml-0 btn btn-sm btn-danger" v-b-modal.borarModal>
          Borar tot
        </button>  
      </div>

      <b-modal style="background-color: #282a36; padding: 50px 50px;" :hide-footer="true" :hide-header="true" no-close-on-backdrop no-close-on-esc  id="borarModal">
        <p style="margin-bottom: 10px">Estàs segur en borar tots els exercicis?</p>
        <hr>
        <button style="margin-top: 10px;" class="btn btn-outline-secondary ml-1 float-right mt-1" variant="outline-secondary" @click="$bvModal.hide('borarModal')">Cancela</button>
        <button style="margin-top: 10px;" class="btn btn-outline-secondary ml-1 float-right mt-1" variant="outline-secondary" @click="$bvModal.hide('borarModal'); removeAllTutorials()">Si</button>
      </b-modal>

      <div style="border: 1px solid #23252f; border-radius: 7px; padding: 20px 20px; background-color: #242630; margin: auto" class="flex-child-element">
        <div v-if="currentTutorial">
          <div class="text-blanco">
            <label><strong>Títol:</strong></label> {{ currentTutorial.title }}
          </div>
          <hr style="border: 1px solid gray">
          <div class="text-blanco">
            <label><strong>Dificultat:</strong></label> {{ currentTutorial.dificulty }}
          </div>
          <hr style="border: 1px solid gray">
          <div class="text-blanco">
            <label><strong>Descripcció:</strong></label> {{ currentTutorial.description }}
          </div>
          <hr style="border: 1px solid gray">
          <div class="text-blanco">
            <label><strong>Output:</strong></label> {{ currentTutorial.outputCode }}
          </div>
          <hr style="border: 1px solid gray">

          <button style="border:0px" class="btn btn-info ml-1 float-left mt-1 btn-sm" @click="$router.push(`/codis/${currentTutorial.id}`)" >Editar</button>
          <button style="border:0px" class="btn btn-success ml-1 float-left mt-1 btn-sm" v-b-modal.modalNotif @click="$('#myModal').data('modalNotif').$backdrop.css('background-color','orange')" >Resoldre</button>

          <b-modal style="background-color: #282a36; padding: 50px 50px;" :hide-footer="true" :hide-header="true" no-close-on-backdrop no-close-on-esc  id="modalNotif">
            <p style="margin-bottom: 10px">Tindràs 4 minuts en resoldre l'exercici!</p>
            <hr>
            <button style="margin-top: 10px;" class="btn btn-outline-secondary ml-1 float-right mt-1" variant="outline-secondary" v-b-modal.modal-3 @click="$bvModal.hide('modalNotif'); resoldreExercici()">Seguir</button>
          </b-modal>
        </div>
        <div v-else>
          <br />
          <p style="text-align: center;" class="text-blanco">Selecciona un exercici de la llista</p>
        </div>
      </div>     
    </div>
    <div style="margin-top: 10px">
      <div style="margin: auto; max-width: 1000px; border: 1px solid #23252f; border-radius: 7px; padding: 20px 20px; background-color: #282a36;" v-if="currentTutorial">
        <div style="max-width: 750px; margin: auto;">
            <b-card
            class="dracula col-md-12 mb-3 w-100 mt-2 shadow-lg"
            >
              <div class="codi-style rounded col-md-12 shadow-md mt-2"> <codemirror v-model="currentTutorial.codes" /> </div>
            </b-card>
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
  name: "tutorials-list",
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    async retrieveTutorials() {
      try {
        const response = await axios.get("http://localhost:8080/codis");
        this.tutorials = response.data;
      } catch (err) {
        console.log(err);
      }
    },

    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },
    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = index;
    },

    async removeAllTutorials() {
      try {
        await axios.delete(`http://localhost:8080/codis`);
        await axios.delete(`http://localhost:8080/resolts`);
        this.refreshList();
      } catch (err) {
        console.log(err);
      }
    },

    resoldreExercici() {
      this.$router.push(`/exercici/${this.currentTutorial.id}`)
    }
    
  },
  mounted() {
    this.retrieveTutorials();
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
  max-width: 1000px;
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

hr {
  margin-top: 10px;
  margin-bottom: 10px;
}


label {
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>