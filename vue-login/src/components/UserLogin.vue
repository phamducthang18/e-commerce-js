/* eslint-disable vue/multi-word-component-names */
<template>
  <div class="login">
    <div class="login-container">
      <h2>Login</h2>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" placeholder="Enter your email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <div class="password-container">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              required
            />
            <button type="button" class="toggle-password" @click="togglePassword">
              <span v-if="showPassword"><img src="../assets/icon/icon-show.svg" alt=""></span>
              <span v-else><img src="../assets/icon/icon-hide.svg" alt=""></span>
            </button>
          </div>
        </div>
        <div class="go_another">Do not have an account <a href="/signup">signup</a></div>
        <button type="submit" class="login-button">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api'; 
import { useRouter } from 'vue-router';
import { useAuthStore } from "../stores/authStore";

const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const router = useRouter();
const errorMessage = ref('');

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
  errorMessage.value = '';
  try {
    const response = await api.post('/api/signin', {
      email: email.value,
      password: password.value,
    });
    // alert(response.data.message);
    if (response.status === 200) {
      authStore.setUser(response.data.user);
      router.push('/dashboard');
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Login failed';
    // alert(error.response?.data?.message || 'Login failed');
  }
};
</script>

<style scoped>
/* Container styling */
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  font-family: Arial, sans-serif;
}

/* Login form container */
.login-container {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

/* Form heading */
.login-container h2 {
  margin-bottom: 20px;
  font-size: 1.8rem;
  color: #333;
}

/* Form group styling */
.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: #555;
}

.form-group input {
  width: 94%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  border-color: #6a11cb;
}

/* Add styles for the password container */
.password-container {
  display: flex;
  align-items: center;
  position: relative;
}

.password-container input {
  flex: 1;
}

.toggle-password {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  position: absolute;
  right: 10px;
  color: #6a11cb;
}

.toggle-password:hover {
  color: #2575fc;
}

/* Login button styling */
.login-button {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  color: #fff;
  background-color: #6a11cb;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.login-button:hover {
  background-color: #2575fc;
  transform: scale(1.05);
}
.go_another {
  margin-top: 5px;
  margin-bottom: 5px;
  left: 0;
  font-size: 0.9rem;
  color: #555;
  text-align: center;
}

.go_another a {
  color: #6a11cb;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.go_another a:hover {
  color: #2575fc;
  text-decoration: underline;
}
.error-message {
  color: red;
  font-size: 0.9rem;
  margin-bottom: 10px;
  text-align: center;
}
</style>