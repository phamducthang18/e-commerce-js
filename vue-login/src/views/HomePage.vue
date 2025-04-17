<template>
  <div class="home">
    <h1>Welcome to the Login System</h1>
    <div class="links">
      <router-link to="/login" class="button">Login</router-link>
      <router-link to="/signup" class="button">Signup</router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* Container styling */
.home {
  text-align: center;
  margin-top: 50px;
  font-family: Arial, sans-serif;
}

/* Heading styling */
.home h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
}

/* Links container */
.links {
  display: flex;
  justify-content: center;
  gap: 20px;
}

/* Button styling */
.button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #0056b3;
}
</style>