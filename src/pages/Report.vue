<template>
  <div class="report-container">
    <h2><i class="fas fa-file-excel"></i> Download Report</h2>
    <form @submit.prevent="downloadReport">
      <div class="filters">
        <select v-model="selectedDateFilter">
          <option value="">Select Filter</option>
          <option value="daily">Harian</option>
          <option value="monthly">Bulanan</option>
        </select>

        <select v-if="selectedDateFilter === 'monthly'" v-model="monthFilter">
          <option value="">Select Month</option>
          <option v-for="month in months" :key="month.value" :value="month.value">
            {{ month.name }}
          </option>
        </select>

        <select v-if="selectedDateFilter === 'monthly'" v-model="selectedYear">
          <option value="">Select Year</option>
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>

        <input
          type="date"
          v-if="selectedDateFilter === 'daily'"
          v-model="dateFilter"
        />

        <select v-model="selectedLocation">
          <option value="">Select Location</option>
          <option v-for="location in locations" :key="location.id" :value="location.id">
            {{ location.name }}
          </option>
        </select>

        <select v-model="staffId">
          <option value="">Select Petugas</option>
          <option v-for="staff in staffList" :key="staff.ID" :value="staff.ID">
            {{ staff.Name }}
          </option>
        </select>

        <input
          type="date"
          v-if="selectedDateFilter === 'monthly' && monthFilter && selectedYear"
          v-model="startDate"
          :min="startDateLimit"
          :max="startDateMax"
          placeholder="Start Date"
        />
        <input
          type="date"
          v-if="selectedDateFilter === 'monthly' && monthFilter && selectedYear"
          v-model="endDate"
          :min="startDate"
          :max="endDateMax"
          placeholder="End Date"
        />
      </div>
      <button type="submit" class="download-button"><i class="fas fa-download"></i> Download Excel</button>
    </form>
  </div>
  <footer class="footer">
      <p>© 2024 PT.TEKNOLOGI MULIA SEJAHTERA</p>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getPetugasList, getLocationList } from '../service/report.service';

export default defineComponent({
  data() {
    return {
      selectedDateFilter: '' as string,
      dateFilter: '' as string,
      monthFilter: '' as string,
      selectedYear: '' as string,
      staffId: '' as string,
      selectedLocation: '' as string,
      startDate: '' as string,
      endDate: '' as string,
      startDateLimit: '' as string,
      endDateMax: '' as string,
      months: [
        { value: '01', name: 'January' },
        { value: '02', name: 'February' },
        { value: '03', name: 'March' },
        { value: '04', name: 'April' },
        { value: '05', name: 'May' },
        { value: '06', name: 'June' },
        { value: '07', name: 'July' },
        { value: '08', name: 'August' },
        { value: '09', name: 'September' },
        { value: '10', name: 'October' },
        { value: '11', name: 'November' },
        { value: '12', name: 'December' },
      ],
      years: this.getYears(),
      staffList: [] as Array<{ ID: string, Name: string }>,
      locations: [] as Array<{ id: string, name: string }>, // Variabel untuk daftar lokasi
    };
  },
  mounted() {
    this.fetchPetugasList();
    this.fetchLocationList(); // Panggil method untuk mengambil lokasi
  },
  watch: {
    monthFilter(newMonth: string) {
      if (this.selectedYear && newMonth) {
        this.calculateDateLimits(newMonth, this.selectedYear);
      }
    },
    selectedYear(newYear: string) {
      if (this.monthFilter && newYear) {
        this.calculateDateLimits(this.monthFilter, newYear);
      }
    },
  },
  methods: {
    getYears(): string[] {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 10 }, (_, i) => String(currentYear - i));
    },
    async fetchPetugasList() {
      try {
        const data = await getPetugasList(1, 10);
        console.log('Fetched Petugas Data:', data);
        this.staffList = data.data || [];
      } catch (error) {
        console.error('Failed to load petugas list:', error);
      }
        },
        async fetchLocationList() {
      try {
        const data = await getLocationList(1, 10); // Sesuaikan pagination jika perlu
        console.log('Fetched Location Data:', data);
        this.locations = data.data || [];
      } catch (error) {
        console.error('Failed to load location list:', error);
      }
    },
    calculateDateLimits(month: string, year: string) {
      const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      const endDate = new Date(parseInt(year), parseInt(month) + 2, 0); // End of the 3rd month

      this.startDateLimit = this.formatDate(startDate);
      this.endDateMax = this.formatDate(endDate);
    },
    formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    downloadReport() {
      const filters = {
        dateFilter: this.dateFilter,
        monthFilter: this.monthFilter,
        staffId: this.staffId,
        selectedLocation: this.selectedLocation,
        startDate: this.startDate,
        endDate: this.endDate,
      };
      console.log('Downloading report with filters:', filters);
    },
  },
});
</script>

<style scoped>
.report-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  font-size: 26px;
  color: #333;
  margin-bottom: 25px;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
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
  flex-direction: column;
  gap: 20px;
}

.filters select,
.filters input {
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.filters select:focus,
.filters input:focus {
  border-color: #007bff;
  outline: none;
}

.download-button {
  padding: 14px 30px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  font-weight: bold;
  margin-top: 15px;
}

.download-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

@media (max-width: 600px) {
  .report-container {
    padding: 30px;
  }

  h2 {
    font-size: 22px;
  }

  .download-button {
    font-size: 16px;
  }
}
</style>



