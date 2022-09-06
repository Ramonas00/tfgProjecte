<template>
  <b-container v-if="questCodis" class="pa-left">
    <div v-if="index < questCodis.codis.length">
        <div class="flex-parent-element">
            <div class="flex-child-element" >
                <div><label class="text-green"><strong>{{ questCodis.codis[index].title }}</strong></label></div>
                <div><label class="text-white">{{ questCodis.codis[index].description }}</label></div>
                <div><label class="text-orange">Output esperat: <strong>{{ questCodis.codis[index].outputCode }}</strong></label></div>
            </div>
            <div class="flex-child-element" style="margin:auto;">
                <label style="float: right; font-size: 40px; border: 1px solid grey; border-radius: 7px; padding: 20px 20px; background-color: #282a36;" class="text-white">{{ formatedCountdown }}</label>
                <label style="margin-right: 10px; float: right; font-size: 40px; border: 1px solid grey; border-radius: 7px; padding: 20px 20px; background-color: #282a36;" class="text-white">{{ index+1 }} / {{ questCodis.codis.length }}</label>
            </div>
        </div>
        <b-card
        :class="bytheme"
        class="dracula col-md-12 mb-3 w-100 mt-2 shadow-lg"
        >
        <div class="row">
            <div class="rounded col-md-12 shadow-md mt-2">
            <codemirror v-model="questCodis.codis[index].codes" :options="cmOption" />

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
        <b-button @click="saveTutorial" :disabled="!allowc" variant="success" class="ml-1 float-right mt-1">resoldre</b-button>
        <b-button @click="compile" variant="success" class="ml-1 float-right mt-1">compilar</b-button>
        <b-button class="float-right mx-auto mt-1" variant="danger" @click="reset"><b-icon icon="arrow-counterclockwise"></b-icon></b-button>
        </b-card>
        <div v-if="message">
        <p class="text-green">{{ message }}</p>
        </div>
    </div>

    <div style="height: 160px; border: 1px solid #23252f; border-radius: 7px; padding: 30px 30px; background-color: #282a36;" v-if="index == questCodis.codis.length">
        <div><label style="color:darkgrey"><strong>Ja has acabat el qüestionari</strong></label><label style="float: right;" class="text-white">{{ formatedCountdown }}</label></div>
        <hr style="border: 1px solid #23252f;">
        <div><b-button @click="acabarQuest" class="ml-1 float-left mt-1 boto-crear">Desar qüestionari</b-button></div>
    </div>
  </b-container>
</template>
<script>

import notas from '../components/extra/notas.vue'
import themes from '../components/extra/themes.vue'
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

import * as moment from 'moment'
import 'moment-duration-format'

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
        published: false
      },
      submitted: false,
      questCodis: [],
      allowc: false,
      message: "",
      countdown: 240, // 5min
      timeNeed: 0,
      timeTotal: 0,
      index: 0,
      currentQResolt: 0,
      acabat: false,
    };
  },

  beforeRouteLeave (to, from , next) {
  if (this.acabat) {
    this.countdown=-1;
    next()
  }
  else {
    const answer = window.confirm('Si surts de la pàgina és perdrà la resolució actual!')
    if (answer) {
        this.countdown=-1;
        this.deleteQResoltCuzLeave()
        next()
    } else {
        next(false)
    }
  }
  },

  name: "resoldreQuest",
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
        this.code = this.questCodis.codis[this.index].codes;
        this.$store.commit('compile');
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

   getAssembly() {
     this.$store.commit('getAssembly');
   },
    reset() {
      this.$store.state.output = '';
    },

    async saveTutorial() {
      try {
        const response = await axios.post("http://localhost:8080/resolts", {
          codeAnswer: this.questCodis.codis[this.index].codes,
          outputAnswer: this.output,
          codiId: this.questCodis.codis[this.index].id,
          timeDone: "false",
          timeNeed: this.timeNeed-this.countdown,
        });

        this.timeNeed = this.countdown;

        await axios.post("http://localhost:8080/resoltQResolt", {
          questResoltId: this.currentQResolt,
          resoltId: response.data.id,
        });
        this.index++;
        this.allowc = false;
        this.message = "";
      } catch (err) {
        console.log(err);
      }
    },

    async saveTutorialTimeOut() {
      try {
        await axios.put(`http://localhost:8080/questResolts/${this.currentQResolt}`, {
          timeDone: true,
          timeNeed: this.timeTotal,
          questionariId: this.questCodis.id,
        });
        this.acabat = true;
        this.$router.push("/quests");
      } catch (err) {
        console.log(err);
      }
    },

    async retrieveQuests() {
      try {
        const response = await axios.get(
          `http://localhost:8080/codiQuest/${this.$route.params.id}`
        );
        this.questCodis = response.data[0];
        this.countdown = this.questCodis.codis.length * this.countdown;
        this.timeNeed = this.countdown;
        this.timeTotal = this.countdown;
        const response2 = await axios.post("http://localhost:8080/questResolts", {
          timeDone: false,
          timeNeed: 0,
          questionariId: this.questCodis.id,
        });
        this.currentQResolt = response2.data.id;
      } catch (err) {
        console.log(err);
      }
    },


    async deleteQResoltCuzLeave() {
      try {
        await axios.delete(`http://localhost:8080/questResolts/${this.currentQResolt}`);
      } catch (err) {
        console.log(err);
      }
    },

    async acabarQuest() {
        await axios.put(`http://localhost:8080/questResolts/${this.currentQResolt}`, {
          timeDone: false,
          timeNeed: this.timeTotal - this.countdown,
          questionariId: this.questCodis.id,
        });
        this.acabat = true;
        this.$router.push("/quests");
    }
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

      buffer: {
        get() {        return this.$store.state.buffer;   },
        set(value) {  this.$store.commit('superUpdate',   {type:'buffer', data: value});   }
      },
      output: {
        get() {        return this.$store.state.output;     },
        set(value) {   this.$store.commit('superUpdate',  {type: 'output', data: value});  }
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
      },

      formatedCountdown() {
      return moment.duration(this.countdown, 'seconds').format('m:ss')
     },
},

mounted() {
    this.retrieveQuests();
    

    const stopCountdown = setInterval(() => {
      this.countdown -= 1
      if (this.countdown == -1) clearInterval(stopCountdown)
      if (this.countdown == 0) this.saveTutorialTimeOut()
      if (!this.countdown) clearInterval(stopCountdown)
    }, 1000)

},
  
watch: {
  output: function(value) {
    if (value == this.questCodis.codis[this.index].outputCode) {
      this.message = "La resposta pot se correcta";
      this.allowc = true;
    }
    else {
      this.message = "La resposta és incorrecta";
    }
  },
  code: function(value) {
    this.message = "";
  },
}


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
.pa-left {
    text-align: left;
}
.text-green {
    color: #42b983;
    font-size: 20px;
}
.text-white {
    color: white;
}
.text-orange {
    color: orange;
}
h4 {
    color: darkcyan;
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
