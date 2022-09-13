<template>
  <div>
    <Scatter
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :width="width"
      :height="height"
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
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
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
      default: "scatter-chart",
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

      min_x_value = Math.min(-30, min_x_value);
      min_x_value = Math.floor(min_x_value / 10) * 10;
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
