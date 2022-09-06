<template>
  <div style="text-align: left;">
    <div v-if="quests.length == 0">
      <label style="margin-left: 50px;" class="text-white">No hi ha cap qûestionari creat de moment</label>
    </div>
    <div style="max-width: 1000px; margin: auto; border: 1px solid #23252f; border-radius: 7px; padding: 20px 20px; background-color: #282a36;" v-else class=" row flex-parent-element">
      <div class="flex-child-element">
        <h4 style="color: darkcyan;">Llista dels qüestionaris</h4>
        <hr style="border: 2px solid darkcyan; margin-bottom: 15px;">
        <ul style="max-height:250px; overflow-y: auto;" class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(quest, index) in quests"
            :key="index"
            @click="setActiveQuest(quest, index)"
          >
            {{ quest.title }}
          </li>
        </ul>
        <button style="margin-left: 0px;" class="m-3 btn btn-sm btn-danger" v-b-modal.borarModal>
          Borar tot
        </button>
      </div>

      <b-modal style="background-color: #282a36; padding: 50px 50px;" :hide-footer="true" :hide-header="true" no-close-on-backdrop no-close-on-esc  id="borarModal">
        <p style="margin-bottom: 10px">Estàs segur en borar tots els qüestionaris?</p>
        <hr>
        <button style="margin-top: 10px;" class="btn btn-outline-secondary ml-1 float-right mt-1" variant="outline-secondary" @click="$bvModal.hide('borarModal')">Cancela</button>
        <button style="margin-top: 10px;" class="btn btn-outline-secondary ml-1 float-right mt-1" variant="outline-secondary" @click="$bvModal.hide('borarModal'); removeAllQuests()">Si</button>
      </b-modal>

      <div style="border: 1px solid #23252f; border-radius: 7px; padding: 20px 20px; background-color: #242630; margin: auto" class="flex-child-element">
        <div v-if="currentQuest && relations">
          <div class="text-blanco">
            <label><strong>Títol:</strong></label> {{ currentQuest.title }}
          </div>
          <hr style="border: 1px solid gray">
          <div class="text-blanco">
            <label><strong>Nº d'exercicis:</strong></label> {{ relations.codis.length }}
          </div>
          <hr style="border: 1px solid gray">
          <div class="text-blanco">
            <label><strong>Vegades resolt:</strong></label> {{ timesAnswered }}
          </div>
          <hr style="border: 1px solid gray">
          <button style="border:0px" class="btn btn-danger ml-1 float-left mt-1 btn-sm"
            @click="borrarQuest"
          >
            Borar
          </button>
          <button style="border:0px" class="btn btn-info ml-1 float-left mt-1 btn-sm" v-b-modal.modal-2 >Veure més</button>
          <button style="border:0px" class="btn btn-success ml-1 float-left mt-1 btn-sm" @click="$router.push(`/questionari/${currentQuest.id}`)" >Resoldre</button>

        </div>
        <div v-else>
          <br />
          <p style="text-align: center;" class="text-blanco">Selecciona un qüestionari de la llista</p>
        </div>
      </div>     
    </div>

     <b-modal :hide-footer="true" id="modal-2" size="lg" title="Exercicis del qüestionari">
          <ul style="max-height:250px; overflow-y: auto;" class="list-group">
            <li class="list-group-item"
              :class="{ active: index == currentRelationIndex }"
              v-for="(relation, index) in relations.codis"
              :key="index"
              @click="setActiveRelation(relation, index)"
              v-b-modal.modal-3
            >
              {{ relation.title }}
            </li>
          </ul>
        </b-modal>

        <b-modal :hide-footer="true" id="modal-3" size="lg" title="Informació de l'exercici">
          <div v-if="currentRelation">
            <div class="text-black">
              <label><strong>Títol:</strong></label> {{ currentRelation.title }}
            </div>
            <div class="text-black">
              <label><strong>Dificultat:</strong></label> {{ currentRelation.dificulty }}
            </div>
            <div class="text-black">
              <label><strong>Descripcció:</strong></label> {{ currentRelation.description }}
            </div>
            <div class="text-black">
              <label><strong>Output:</strong></label> {{ currentRelation.outputCode }}
            </div>
          </div>
        </b-modal>
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
  name: "quests-list",
  data() {
    return {
      quests: [],
      relations: [],
      currentQuest: null,
      currentIndex: -1,
      title: "",
      currentRelation: null,
      currentRelationIndex: -1,
      timesAnswered: 0,
    };
  },
  methods: {
    async retrieveQuests() {
      try {
        const response = await axios.get("http://localhost:8080/quest");
        this.quests = response.data;
      } catch (err) {
        console.log(err);
      }
    },

    refreshList() {
      this.retrieveQuests();
      this.currentQuest = null;
      this.currentIndex = -1;
      this.currentRelationIndex = -1;
    },

    async setActiveQuest(quest, index) {
      try {
        const response = await axios.get(`http://localhost:8080/codiQuest/${quest.id}`);
        this.relations = response.data[0];
        this.currentQuest = quest;
        this.currentIndex = index;

        const response2 = await axios.get(`http://localhost:8080/questResolts/group/${quest.id}`);
        this.timesAnswered = response2.data.length;
      } catch (err) {
        console.log(err);
      }
    },

    async removeAllQuests() {
      try {
        await axios.delete(`http://localhost:8080/quest`);
        await axios.delete(`http://localhost:8080/questResolts`);
        this.refreshList();
      } catch (err) {
        console.log(err);
      }
    },

    async borrarQuest() {
      try {
        await axios.delete(`http://localhost:8080/codiQuest/byQuest/${this.currentQuest.id}`);
        await axios.delete(`http://localhost:8080/quest/${this.currentQuest.id}`);
        this.refreshList();
      } catch (err) {
        console.log(err);
      }
    },

    setActiveRelation(relation, index) {
      this.currentRelation = relation;
      this.currentRelationIndex = index;
    },
  },
  mounted() {
    this.retrieveQuests();
  }
  
};
</script>
<style scoped>
.list {
  text-align: left;
  max-width: 750px;
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

hr {
  margin-top: 10px;
  margin-bottom: 10px;
}


label {
  margin-top: 0px;
  margin-bottom: 0px;
}
</style>