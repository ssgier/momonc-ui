<template>
  <div>
    <Scatter
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :width="width"
      :height="height"
      :cssClasses="cssClasses"
      :styles="styles"
      :plugins="plugins"
    />
  </div>
</template>

<script>
import { store } from "../store.js";
import { Scatter } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  ScatterController,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  ScatterController
);

export default {
  name: "CandidateEvolutionChart",
  components: {
    Scatter,
  },
  methods: {
    convertTimeToRelativeFromNow(time) {
      return time - this.processingState.timeElapsed;
    },
  },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showWindowLengthSeconds: 60,
      processingState: store.state.processingState,
    };
  },
  computed: {
    computeMinXValue() {
      let min_x_value = -this.showWindowLengthSeconds;
      if (!this.processingState.candidateEvalQueue.isEmpty()) {
        min_x_value = Math.max(
          min_x_value,
          this.convertTimeToRelativeFromNow(
            this.processingState.candidateEvalQueue.peek().start_time
          )
        );
      }

      min_x_value = Math.min(-10, min_x_value);
      return min_x_value;
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        scales: {
          x: {
            grid: {
              display: false,
            },
            title: {
                display: true,
                text: "Time [s]",
            },
            min: this.computeMinXValue,
            max: 0,
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      };
    },
    chartData() {
      let dataCandidateEvals = [];
      let dataBestSeen = [];
      let bestSeenVal = undefined;

      const candidateEvalQueue = this.processingState.candidateEvalQueue;
      candidateEvalQueue._list.forEach((evalReport) => {
        evalReport = evalReport.data;
        if (evalReport.obj_func_val) {
          dataCandidateEvals.push({
            x: this.convertTimeToRelativeFromNow(evalReport.start_time),
            y: evalReport.obj_func_val,
          });
          dataCandidateEvals.push({
            x: this.convertTimeToRelativeFromNow(evalReport.completion_time),
            y: evalReport.obj_func_val,
          });
          dataCandidateEvals.push({ x: null, y: null });

          if (!bestSeenVal || evalReport.obj_func_val < bestSeenVal) {
            if (bestSeenVal) {
              dataBestSeen.push({
                x: this.convertTimeToRelativeFromNow(
                  evalReport.completion_time
                ),
                y: bestSeenVal,
              });
              dataBestSeen.push({
                x: null,
                y: null
              });
            }
            dataBestSeen.push({
              x: this.convertTimeToRelativeFromNow(evalReport.completion_time),
              y: evalReport.obj_func_val,
            });
            bestSeenVal = evalReport.obj_func_val;
          }
          dataBestSeen.push({
            x: this.convertTimeToRelativeFromNow(evalReport.completion_time),
            y: bestSeenVal,
          });
        }
      });

      return {
        datasets: [
          {
            type: "line",
            label: "Best Seen",
            fill: false,
            borderColor: "#008080",
            backgroundColor: "#008080",
            data: dataBestSeen,
            borderWidth: 3,
            radius: 0,
            showLine: true,
          },
          {
            type: "scatter",
            label: "Candidate Evaluations",
            fill: false,
            borderColor: "#cccccc",
            backgroundColor: "#cccccc",
            borderWidth: 2,
            pointRadius: 0,
            radius: 1,
            data: dataCandidateEvals,
            showLine: true,
          },
        ],
      };
    },
  },
};
</script>
