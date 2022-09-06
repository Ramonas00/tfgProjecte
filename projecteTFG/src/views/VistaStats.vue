<template>
    <b-container class="list">
        <!-- <div><label><strong>Nº d'exercicis: </strong>{{ exercicis.length }}</label></div>
        <div><label><strong>Nº de qûestionaris: </strong>{{ questionaris.length }}</label></div>
        <div><label><strong>Nº de respostes: </strong>{{ resolts.length }}</label></div>
        <div><label><strong>Nº d'exercicis resolts: </strong>{{ resoltsGroup.length }}</label></div>
        <div><label><strong>Nº de qüestionaris resolts: </strong>{{ questResolts.length }}</label></div> -->

        <div id="buttonId" style="border: 1px solid grey; border-radius: 7px; padding: 15px 15px; background-color: #282a36; margin-bottom: 20px;">
            <b-button @click="activeExercici" class="ml-1 float-center mt-1 boto">Exercici</b-button>
            <b-button @click="activeQuest" class="ml-2 float-center mt-1 boto">Qüestionari</b-button>
            <b-button @click="activeAvg" class="ml-2 float-center mt-1 boto">Mitjanes</b-button>
        </div>

        <div v-if="showExercici" class="flex-parent-element" style="margin: auto; border: 1px solid grey; border-radius: 7px; padding: 45px 15px; background-color: #282a36;">
            <ExerciciChart style="max-width: 600px; max-height: 600px; margin: auto;" class="flex-child-element"/>
            <ExercicisResolts style="max-width: 600px; max-height: 600px; margin: auto" class="flex-child-element"/>
        </div>

        <div v-if="showQuest" class="flex-parent-element" style="margin: auto; border: 1px solid grey; border-radius: 7px; padding: 45px 15px; background-color: #282a36;">
            <QuestChart style="max-width: 600px; max-height: 600px; margin: auto;" class="flex-child-element"/>
            <QuestionarisResolts style="max-width: 600px; max-height: 600px; margin: auto;" class="flex-child-element"/>
        </div>

        <div v-if="showAvg" class="flex-parent-element" style="margin: auto; border: 1px solid grey; border-radius: 7px; padding: 45px 15px; background-color: #282a36;">
            <ExerciciAvgTime style="max-width: 600px; max-height: 600px;" class="flex-child-element"/>
            <QuestAvgTime style="max-width: 600px; max-height: 600px;" class="flex-child-element"/>
        </div>
        
    </b-container>
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

import ExerciciChart from './chart/exercisis.vue'
import QuestChart from './chart/qüestionaris.vue'
import ExercicisResolts from './chart/exercicisResolts.vue'
import QuestionarisResolts from './chart/questionarisResolts.vue'
import ExerciciAvgTime from './chart/exerciciAvgTime.vue'
import QuestAvgTime from './chart/questAvgTime.vue'


export default {
  name: "stats",
  components: { ExerciciChart, QuestChart, ExercicisResolts, QuestionarisResolts, ExerciciAvgTime, QuestAvgTime },
  data() {
    return {
      exercicis: [],
      questionaris: [],
      resolts: [],
      resoltsGroup: [],
      questResolts: [],
      showExercici: false,
      showQuest: false,
      showAvg: false,
    };
  },


  methods: {
    async getAllExercicis() {
      try {
        const response = await axios.get("http://localhost:8080/codis");
        this.exercicis = response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async getAllQuests() {
      try {
        const response = await axios.get("http://localhost:8080/quest");
        this.questionaris = response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async getAllResolts() {
      try {
        const response = await axios.get("http://localhost:8080/resolts");
        this.resolts = response.data;
      } catch (err) {
        console.log(err);
      }
    },

    async getAllExercicisResolts() {
        try {
            const response = await axios.get("http://localhost:8080/resolts/group");
            this.resoltsGroup = response.data;
        } catch (err) {
            console.log(err);
        }
    },

    async getAllQuestsResolts() {
        try {
            const response = await axios.get("http://localhost:8080/questResolts");
            this.questResolts = response.data;
        } catch (err) {
            console.log(err);
        }
    },

    activeExercici() {
        this.showExercici = true;
        this.showQuest = false;
        this.showAvg = false;
    },

    activeQuest() {
        this.showExercici = false;
        this.showQuest = true;
        this.showAvg = false;
    },

    activeAvg() {
        this.showExercici = false;
        this.showQuest = false;
        this.showAvg = true;
    }
  },

  mounted() {
    //this.getAllExercicis();
    //this.getAllQuests();
    //this.getAllResolts();
    //this.getAllExercicisResolts();
    //this.getAllQuestsResolts();
  }
}
</script>

<style scoped>
label {
    color: white;
}

.flex-parent-element {
  display: flex;
}

.flex-child-element {
  flex: 1;
  margin: 10px;
}

.flex-child-element:first-child {
  margin-right: 40px;
}

.boto {
  background-color: transparent;
  color: grey; 
  border: 1px solid grey;
}

.active, .boto:hover {
  background-color: grey;
  color: white;
}
</style>
