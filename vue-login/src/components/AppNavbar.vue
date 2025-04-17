<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="logo">
        <router-link to="/">MyApp</router-link>
      </div>
      <ul v-if="authStore.isLoggedIn" class="nav-links">
        
        <li><router-link to="/dashboard">Dashboard</router-link></li>
        <li><router-link to="/profile">Profile</router-link></li>
        <li><router-link to="/friend-requests">Friend Requests</router-link></li>
        <li><router-link to="/messages">Messages</router-link></li>
        <li v-if="authStore.isLoggedIn">
          <router-link to="/profile">
            <img src="../assets/icon/user.svg" alt="User Icon" />
            {{ authStore.user?.username }}
          </router-link>
          <button @click="logout">Logout</button>
        </li>
      </ul>
      <ul v-if="!authStore.isLoggedIn" class="nav-links">
        <li>
          <router-link to="/login">Login</router-link>
        </li>
        <li>
          <router-link to="/signup">Signup</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
// import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from "../stores/authStore";
import api from '@/services/api';

const authStore = useAuthStore();
const router = useRouter();

const logout = async () => {
  await api.post("/api/session/logout");
  authStore.logout();
  router.push("/login");
};

// checkSession();

</script>

<style scoped>
/* Navbar container */
.navbar {
  background-color: #6a11cb;
  color: white;
  padding: 10px 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

/* Navbar inner container */
.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

/* Logo styling */
.logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.logo a:hover {
  color: #ffcc00;
}

/* Navigation links */
.nav-links {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 0;
  padding: 0;
}

.nav-links li a {
  margin-right: 10px;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links li a img {
  width: 20px;
  height: 20px;
  margin-top: 5px;
}

.nav-links li a:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffcc00;
}

.nav-links li button {
  background: none;
  border: 1px solid white;
  color: white;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease-in-out;
}

.nav-links li button:hover {
  background-color: white;
  color: #6a11cb;
}

/* Responsive design for smaller screens */
@media (max-width: 768px) {
  .nav-links {
    flex-direction: column;
    gap: 10px;
    background-color: #6a11cb;
    position: absolute;
    top: 60px;
    right: 0;
    width: 100%;
    padding: 10px 0;
    display: none;
  }

  .nav-links.active {
    display: flex;
  }

  .navbar-container {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
