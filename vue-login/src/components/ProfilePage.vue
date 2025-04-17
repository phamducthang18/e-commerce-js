<!-- filepath: /home/thangpd/nodejs/vue-login/src/components/ProfilePage.vue -->
<template>
    <div class="profile-page">
      <div class="profile-header">
        <img :src="user.avatar" alt="Avatar" class="avatar" />
        <h2>{{ user.name }}</h2>
        <p>{{ user.bio }}</p>
      </div>
      <div class="profile-content">
        <h3>Posts</h3>
        <div v-for="post in posts" :key="post.id" class="post">
          <h4>{{ post.title }}</h4>
          <p>{{ post.content }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const user = ref({
    name: 'John Doe',
    avatar: 'https://via.placeholder.com/150',
    bio: 'This is a short bio about the user.',
  });
  
  const posts = ref([
    { id: 1, title: 'First Post', content: 'This is the content of the first post.' },
    { id: 2, title: 'Second Post', content: 'This is the content of the second post.' },
  ]);
  </script>
  
  <style scoped>
  .profile-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .profile-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  
  .profile-content .post {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  </style>