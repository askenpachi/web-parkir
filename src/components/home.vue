<template>
  <div class="dashboard">
    <div class="header">
      <h2>Dashboard Parkir</h2>
    </div>
    <div class="statistics">
      <div class="card" v-for="stat in statistics" :key="stat.label">
        <h3>{{ stat.label }}</h3>
        <p class="value">{{ stat.value }}</p>
        <p class="description">{{ stat.description }}</p>
      </div>
    </div>
    <div class="filters">
      <div class="filter">
        <label for="vehicleFilter">Filter Kendaraan:</label>
        <select v-model="vehicleFilter" @change="updateVehicleChart">
          <option value="daily">Harian</option>
          <option value="weekly">Mingguan</option>
        </select>
      </div>
    </div>
    <div class="charts">
      <div class="chart" id="vehicleComparisonChart">
        <canvas ref="vehicleChartCanvas"></canvas>
      </div>
      <div class="chart" id="incomeChart">
        <!-- Income Chart Filter di sini -->
        <div class="income-filter">
          <label for="incomeFilter">Filter Pendapatan:</label>
          <select v-model="incomeFilter" @change="updateIncomeChart">
            <option value="annual">Tahunan</option>
          </select>
        </div>
        <canvas ref="incomeChartCanvas"></canvas>
      </div>
    </div>
  </div>
 
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import { fetchkendaraan } from '../service/chart.service';

const incomeChartCanvas = ref<HTMLCanvasElement | null>(null);
const vehicleChartCanvas = ref<HTMLCanvasElement | null>(null);
const incomeFilter = ref('weekly');
const vehicleFilter = ref('daily'); // Default to 'daily' for vehicle chart

const statistics = [
  { label: 'Pendapatan', value: 'Rp. 0,00', description: 'Weekly: Rp 220.000.000,00' },
  { label: 'Pemasukan', value: 'Rp. 0,00', description: 'Weekly: Rp 10.000.000,00' },
  { label: 'Keuntungan bersih', value: 'Rp. 0,00', description: '' },
  { label: 'Karyawan', value: '0', description: '' },
];

let incomeChart: Chart | null = null;
let vehicleChart: Chart | null = null;

// Fetch kendaraan data
const fetchKendaraanData = async () => {
  try {
    const jenis_kendaraan = 'string'; 
    const jumlah_kendaraan = 'number';
    const kendaraanData = await fetchkendaraan(jenis_kendaraan, jumlah_kendaraan);
    const vehicleComparisonChart = {
      labels: kendaraanData.map((item: { jenis_kendaraan: string }) => item.jenis_kendaraan),
      datasets: [{
        data: kendaraanData.map((item: { jumlah_kendaraan: number }) => item.jumlah_kendaraan),
        backgroundColor: ['#FF5733', '#33C1FF', '#FFBD33'],
      }],
    };
    createVehicleChart(vehicleComparisonChart);
  } catch (error) {
    console.error('Error fetching kendaraan data:', error);
  }
};

onMounted(() => {
  createIncomeChart();
  fetchKendaraanData();
});

function createIncomeChart() {
  if (incomeChartCanvas.value) {
    incomeChart = new Chart(incomeChartCanvas.value, {
      type: 'line',
      data: getIncomeChartData(),
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
        },
      },
    });
  }
}

function createVehicleChart(data) {
  if (vehicleChartCanvas.value) {
    vehicleChart = new Chart(vehicleChartCanvas.value, {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
        },
      },
    });
  }
}

function getIncomeChartData() {
  const labels = incomeFilter.value === 'daily'
    ? ['Hari ini']
    : incomeFilter.value === 'weekly'
      ? ['Hari 1', 'Hari 2', 'Hari 3', 'Hari 4', 'Hari 5', 'Hari 6', 'Hari 7']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

  const dataSet1 = incomeFilter.value === 'daily'
    ? [5]
    : incomeFilter.value === 'weekly'
      ? [5, 10, 15, 20, 25, 30, 35]
      : [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160];

  const dataSet2 = incomeFilter.value === 'daily'
    ? [3]
    : incomeFilter.value === 'weekly'
      ? [3, 8, 13, 18, 23, 28, 33]
      : [40, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145, 155];

  const dataSet3 = incomeFilter.value === 'daily'
    ? [7]
    : incomeFilter.value === 'weekly'
      ? [7, 12, 17, 22, 27, 32, 37]
      : [60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170];

  return {
    labels,
    datasets: [
      {
        label: 'Pendapatan 1',
        data: dataSet1,
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
      },
      {
        label: 'Pendapatan 2',
        data: dataSet2,
        borderColor: '#FF5733',
        backgroundColor: 'rgba(255, 87, 51, 0.2)',
      },
      {
        label: 'Pendapatan 3',
        data: dataSet3,
        borderColor: '#33C1FF',
        backgroundColor: 'rgba(51, 193, 255, 0.2)',
      },
    ],
  };
}

function updateIncomeChart() {
  if (incomeChart) {
    incomeChart.data = getIncomeChartData();
    incomeChart.update();
  }
}

function updateVehicleChart() {
  fetchKendaraanData();
}
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dashboard {
  width: 100%;
  max-width: 1200px;
  margin: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h2 {
  font-size: 28px;
  font-weight: bold;
  color: #333;
}

.footer {
  text-align: center;
  margin-top: 30px;
  padding: 20px 0;
  background-color: #2c3e50;
  color: #fff;
  border-top: 2px solid #5dade2;
}
.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.filter label {
  margin-right: 10px;
  font-weight: bold;
}

.filter select {
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.statistics {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.card h3 {
  font-size: 20px;
  color: #666;
  margin-bottom: 10px;
}

.card p.value {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin: 10px 0;
}

.card p.description {
  font-size: 14px;
  color: #888;
}

.charts {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.income-filter {
  top: -40px;
  position: absolute;
  left: 5px;
  background-color: #fff;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.chart {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex: 1 1 300px;
  height: 300px;
  position: relative;
}

.chart canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
