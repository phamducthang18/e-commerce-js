<template>
  <footer class="footer">
    <div class="footer-container">
      <p>&copy; 2025 MyApp. All rights reserved.</p>
      <ul class="footer-links">
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
        <li><router-link to="/privacy">Privacy Policy</router-link></li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background-color: #333;
  color: white;
  padding: 20px 0;
  text-align: center;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer p {
  margin: 0;
  font-size: 0.9rem;
}

.footer-links {
  list-style: none;
  display: flex;
  gap: 15px;
  margin: 10px 0 0;
  padding: 0;
}

.footer-links li a {
  color: #ffcc00;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.footer-links li a:hover {
  color: white;
}

@media (max-width: 768px) {
  .nav-links {
    flex-direction: column;
    gap: 10px;
  }

  .footer-links {
    flex-direction: column;
    gap: 10px;
  }
}
</style>