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
      processingState: store.state.processingState,
    };
  },
  computed: {
    computeMinXValue() {
      let min_x_value = -0;
      if (!this.processingState.candidateEvalQueue.isEmpty()) {
        min_x_value = Math.min(
          min_x_value,
          this.convertTimeToRelativeFromNow(
            this.processingState.candidateEvalQueue.peek().start_time
          )
        );
      }

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

      const candidateEvalQueue = this.processingState.candidateEvalQueue;

      if (
        !candidateEvalQueue.isEmpty() &&
        candidateEvalQueue.peek().best_seen_obj_func_val_before
      ) {
        dataBestSeen.push({
          x: this.computeMinXValue,
          y: candidateEvalQueue.peek().best_seen_obj_func_val_before,
        });
      }

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

          const terminateSegment =
            evalReport.best_seen_obj_func_val_before &&
            evalReport.obj_func_val < evalReport.best_seen_obj_func_val_before;
          const drawCurrentAsBestSeen =
            !evalReport.best_seen_obj_func_val_before ||
            evalReport.obj_func_val < evalReport.best_seen_obj_func_val_before;

          if (drawCurrentAsBestSeen) {
            if (terminateSegment) {
              dataBestSeen.push({
                x: this.convertTimeToRelativeFromNow(
                  evalReport.completion_time
                ),
                y: evalReport.best_seen_obj_func_val_before,
              });
              dataBestSeen.push({
                x: null,
                y: null,
              });
            }
            dataBestSeen.push({
              x: this.convertTimeToRelativeFromNow(evalReport.completion_time),
              y: evalReport.obj_func_val,
            });
          }
        }
      });

      if (dataBestSeen.length) {
        dataBestSeen.push({
          x: 0,
          y: dataBestSeen[dataBestSeen.length - 1].y,
        });
      }

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
