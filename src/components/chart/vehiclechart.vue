<template>
    <div class="chart" id="vehicleComparisonChart">
      <div class="filter">
        <label for="vehicleFilter">Filter Kendaraan:</label>
        <select v-model="vehicleFilter" @change="updateChart">
          <option value="daily">Harian</option>
          <option value="weekly">Mingguan</option>
        </select>
      </div>
      <canvas ref="vehicleChartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      vehicleFilter: String,
      updateVehicleChart: Function,
    },
    methods: {
      updateChart() {
        this.updateVehicleChart();
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
  