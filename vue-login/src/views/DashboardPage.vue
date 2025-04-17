<template>
  <div class="dashboard">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="logo">
        <router-link to="/">🏠</router-link>
      </div>
      <ul class="menu">
        <li><router-link to="/overview">Overview</router-link></li>
        <li><router-link to="/analytics">Analytics</router-link></li>
        <li><router-link to="/products">Products</router-link></li>
        <li><router-link to="/orders">Orders</router-link></li>
      </ul>
    </aside>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Search Bar -->
      <div class="search-bar">
        <input type="text" placeholder="Search" />
        <button>🔍</button>
      </div>

      <!-- Overview Section -->
      <div class="overview">
        <div class="card" v-for="(metric, index) in metrics" :key="index">
          <h3>{{ metric.title }}</h3>
          <p>{{ metric.value }}</p>
          <small>{{ metric.change }}</small>
        </div>
      </div>

      <!-- Platform View Chart -->
      <div class="platform-view">
        <h2>Platform View</h2>
        <canvas id="platform-chart" width="400" height="200"></canvas>
      </div>

      <!-- Revenue Section -->
      <div class="revenue">
        <h2>Total Revenue</h2>
        <p class="revenue-value">${{ totalRevenue }}</p>
        <canvas id="revenue-chart" width="400" height="200"></canvas>
      </div>

      <!-- Additional Widgets -->
      <div class="widgets">
        <div class="widget">
          <h3>Your Top Platform</h3>
          <p>Shopify</p>
        </div>
        <div class="widget">
          <h3>Your Most User by Country</h3>
          <p>United States</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

const metrics = ref([
  { title: 'Product Viewed', value: '411.9K', change: '2.9% ↑' },
  { title: 'Product Shared', value: '230.4K', change: '13.3% ↑' },
  { title: 'Added to Cart', value: '20.9K', change: '4.3% ↓' },
  { title: 'Checked Out', value: '410.54K', change: '30.2% ↑' },
]);

const totalRevenue = ref(991761.12);

onMounted(() => {
  // Platform View Chart
  const platformCanvas = document.getElementById('platform-chart');
  if (platformCanvas) {
    const platformCtx = platformCanvas.getContext('2d');
    new Chart(platformCtx, {
      type: 'bar',
      data: {
        labels: ['Shopee', 'Tokopedia', 'Amazon', 'Lazada'],
        datasets: [
          {
            label: 'Views',
            data: [200900, 90120, 65170, 55120],
            backgroundColor: ['#6a11cb', '#2575fc', '#ff9800', '#f44336'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
      },
    });
  }

  // Revenue Chart
  const revenueCanvas = document.getElementById('revenue-chart');
  if (revenueCanvas) {
    const revenueCtx = revenueCanvas.getContext('2d');
    new Chart(revenueCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Revenue',
            data: [500000, 600000, 700000, 800000, 900000, 991761],
            borderColor: '#6a11cb',
            backgroundColor: 'rgba(106, 17, 203, 0.2)',
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
      },
    });
  }
});
</script>

<style scoped>
/* Layout */
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  height: 100vh;
  font-family: Arial, sans-serif;
}

/* Sidebar */
.sidebar {
  background-color: #f4f4f4;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar .logo {
  font-size: 1.5rem;
  text-align: center;
}

.sidebar .menu {
  list-style: none;
  padding: 0;
}

.sidebar .menu li {
  margin: 10px 0;
}

.sidebar .menu li a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.sidebar .menu li a:hover {
  color: #6a11cb;
}

/* Main Content */
.main-content {
  padding: 20px;
  overflow-y: auto;
}

.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-bar input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.search-bar button {
  padding: 10px;
  background-color: #6a11cb;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #2575fc;
}

/* Overview Section */
.overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.card h3 {
  margin-bottom: 10px;
  color: #6a11cb;
}

.card p {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.card small {
  color: #888;
}

/* Platform View */
.platform-view {
  margin-bottom: 20px;
}

/* Revenue Section */
.revenue {
  margin-bottom: 20px;
}

.revenue-value {
  font-size: 2rem;
  font-weight: bold;
  color: #6a11cb;
}

/* Widgets */
.widgets {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.widget {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>
