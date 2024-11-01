<template>
    <div class="chart" id="incomeChart">
      <div class="income-filter">
        <label for="incomeFilter">Filter Pendapatan:</label>
        <select v-model="incomeFilter" @change="updateChart">
          <option value="annual">Tahunan</option>
        </select>
      </div>
      <canvas ref="incomeChartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      incomeFilter: String,
      updateIncomeChart: Function,
    },
    methods: {
      updateChart() {
        this.updateIncomeChart();
      },
      mounted() {
        // Inisialisasi chart di sini
        // Contoh: this.drawChart();
      }
    },
  };
  </script>
  
  <style scoped>
  .chart {
    /* Tambahkan gaya sesuai kebutuhan */
  }
  </style>
  