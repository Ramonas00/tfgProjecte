<template>
  <Bar v-if="loaded"
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
import { Bar } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: {
    Bar
  },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
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
      avgTime: [],
      chartData: {
        labels: [
          '0-600',
          '601-1200',
          '1201-1800',
          '1801-2400',
        ],
        datasets: [
          {
            label: "Nº de qüestionaris",
            backgroundColor: '#f87979',
            data: [0, 0, 0, 0]
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
                text: "Temps mitjà emprat per resoldre qüestionaris",
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
        const response = await axios.get("http://localhost:8080/questResolts/avgTime");
        this.avgTime = response.data;
        
        for (let i = 0; i < this.avgTime.length; i++) {
            if(this.avgTime[i].totalTimeNeed <= 600) {
                this.chartData.datasets[0].data[0]++;
            }
            else if(this.avgTime[i].totalTimeNeed >= 601 && this.avgTime[i].totalTimeNeed <= 1200) {
                this.chartData.datasets[0].data[1]++;
            }
            else if(this.avgTime[i].totalTimeNeed >= 1201 && this.avgTime[i].totalTimeNeed <= 1800) {
                this.chartData.datasets[0].data[2]++;
            }
            else {
                this.chartData.datasets[0].data[3]++;
            }
        }
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
