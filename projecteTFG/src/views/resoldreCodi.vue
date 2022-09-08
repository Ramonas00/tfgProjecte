<template>
  <b-container class="pa-left">
    <div class="flex-parent-element">
      <div v-if="current" class="flex-child-element" >
        <div><label class="text-green"><strong>{{ current.title }}</strong></label></div>
        <div><label class="text-white">{{ current.description }}</label></div>
        <div><label class="text-orange">Output esperat: <strong>{{ current.outputCode }}</strong></label></div>
      </div>
      <div class="flex-child-element" style="margin:auto;"><label style="float: right; font-size: 40px; border: 1px solid grey; border-radius: 7px; padding: 20px 20px; background-color: #282a36;" class="text-white">{{ formatedCountdown }}</label></div>
    </div>
    <b-card
      :class="bytheme"
      class="dracula col-md-12 mb-3 w-100 mt-2 shadow-lg"
    >
      <div class="row">
        <div v-if="current" class="rounded col-md-12 shadow-md mt-2">
          <codemirror v-model="current.codes" :options="cmOption" />

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
      current: null,
      allowc: false,
      message: "",
      countdown: 240, // 4min
      timeNeed: 0,
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
      next()
    } else {
      next(false)
    }
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
        this.code = this.current.codes;
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
        await axios.post("http://localhost:8080/resolts", {
          codeAnswer: this.current.codes,
          outputAnswer: this.output,
          codiId: this.current.id,
          timeDone: "false",
          timeNeed: this.timeNeed-this.countdown,
        });
        this.acabat = true;
        this.$router.push("/llista");
      } catch (err) {
        console.log(err);
      }
    },

    async saveTutorialTimeOut() {
      try {
        await axios.post("http://localhost:8080/resolts", {
          codeAnswer: this.current.codes,
          outputAnswer: this.output,
          codiId: this.current.id,
          timeDone: "true",
          timeNeed: this.timeNeed,
        });
        this.acabat = true;
        this.$router.push("/llista");
      } catch (err) {
        console.log(err);
      }
    },

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
    this.getTutorial(this.$route.params.id);
    this.timeNeed = this.countdown;

    this.code = `#include <iostream>

    int main() {
      
      
      
    return 0;
    }`;
    this.output ="";

    const stopCountdown = setInterval(() => {
      this.countdown -= 1
      if (this.countdown == -1) clearInterval(stopCountdown)
      if (this.countdown == 0) this.saveTutorialTimeOut()
      if (!this.countdown) clearInterval(stopCountdown)
    }, 1000)

},
  
watch: {
  output: function(value) {
    if (value == this.current.outputCode) {
      this.message = "La resposta pot ser correcta";
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
</style>
