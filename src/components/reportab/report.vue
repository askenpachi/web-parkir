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
          <option v-for="staff in staffList" :key="staff.id" :value="staff.id">
            {{ staff.name }}
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
</template>

<script>
export default {
  data() {
    return {
      selectedDateFilter: '',
      dateFilter: '',
      monthFilter: '',
      selectedYear: '',
      staffId: '',
      selectedLocation: '',
      startDate: '',
      endDate: '',
      locations: [
        { id: 1, name: 'Location A' },
        { id: 2, name: 'Location B' },
      ],
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
    };
  },
  computed: {
    startDateLimit() {
      if (this.monthFilter && this.selectedYear) {
        return `${this.selectedYear}-${this.monthFilter}-01`;
      }
      return '';
    },
    startDateMax() {
      if (this.monthFilter && this.selectedYear) {
        const startDate = new Date(`${this.selectedYear}-${this.monthFilter}-01`);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 2);
        return `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).getDate()}`;
      }
      return '';
    },
    endDateLimit() {
      if (this.monthFilter && this.selectedYear) {
        return `${this.selectedYear}-${this.monthFilter}-01`;
      }
      return '';
    },
    endDateMax() {
      if (this.monthFilter && this.selectedYear) {
        const startDate = new Date(`${this.selectedYear}-${this.monthFilter}-01`);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 2);
        return `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).getDate()}`;
      }
      return '';
    },
  },
  methods: {
    getYears() {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 10 }, (_, i) => currentYear - i);
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
};
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
</style>
