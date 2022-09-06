<template>
    <Doughnut v-if="loaded"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
    />
</template>

<script>
import axios from "axios";
import { Doughnut } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'DoughnutChart',
  components: {
    Doughnut
  },
  props: {
    chartId: {
      type: String,
      default: 'doughnut-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loaded: false,
      resolts: [],
      resoltsOnTime: [],
      chartData: {
        labels: ['A temps', 'Temps exedit'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651'],
            data: [2, this.resolts]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                color: 'white',
                display: true,
                text: "Resolucions dels exercicis",
            },
            legend: {
                labels: {
                    color: 'white'
                }
            }
        },
      }
    }
  },

  async mounted() {
    try {
        const response = await axios.get("http://localhost:8080/resolts");
        this.resolts = response.data;
        const response2 = await axios.get("http://localhost:8080/resolts/onTime");
        this.resoltsOnTime = response2.data;
        this.resolts = this.resolts.length - this.resoltsOnTime.length;
        this.chartData.datasets[0].data[1] = this.resolts;
        this.chartData.datasets[0].data[0] = this.resoltsOnTime.length;
        this.loaded = true;
    } catch (err) {
        console.log(err);
    }
  },

  methods: {
    async getAllResolts() {
      
    },
    async getAllResoltsOnTime() {
      try {
        
    
      } catch (err) {
        console.log(err);
      }
    },
  }
}
</script>