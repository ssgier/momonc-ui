<template>
  Best Seen
  <table class="w-100">
    <thead>
      <tr>
        <th>Start</th>
        <th>Evaluation Time</th>
        <th>Obj. Func. Value</th>
        <th>Params</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(tableRowItem, index) in this.tableRowItems" :key="index">
        <td style="text-align: left">{{ tableRowItem.startTime }}</td>
        <td>{{ tableRowItem.evaluationTime }}</td>
        <td>{{ tableRowItem.objFuncVal }}</td>
        <td><button class="btn">Save</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { store } from "@/store";
import dateFormat from "dateformat";
export default {
  name: "BestSeenTable",
  data() {
    return {
      bestSeenCandidates: store.state.processingState.bestSeenCandidates,
    };
  },
  computed: {
    tableRowItems() {
      return this.bestSeenCandidates.map((evalReport) => ({
        startTime: dateFormat(new Date(evalReport.start_unix_timestamp * 1000), "yyyy-mm-dd HH:MM:ss"),
        evaluationTime:
          (evalReport.completion_time - evalReport.start_time).toFixed(1) + "s",
        objFuncVal: evalReport.obj_func_val.toExponential(3),
      }));
    },
  },
};
</script>
