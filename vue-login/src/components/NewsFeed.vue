<!-- filepath: /home/thangpd/nodejs/vue-login/src/components/NewsFeed.vue -->
<template>
  <div class="news-feed">
    <h2>News Feed</h2>
    <div v-for="post in posts" :key="post.id" class="post">
      <div class="post-header">
        <img :src="post.user.avatar" alt="Avatar" class="avatar" />
        <h3>{{ post.user.name }}</h3>
      </div>
      <p>{{ post.content }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const posts = ref([
  {
    id: 1,
    user: { name: 'Alice', avatar: 'https://via.placeholder.com/50' },
    content: 'This is a post from Alice.',
  },
  {
    id: 2,
    user: { name: 'Bob', avatar: 'https://via.placeholder.com/50' },
    content: 'This is a post from Bob.',
  },
]);
</script>

<style scoped>
.news-feed {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.post {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>