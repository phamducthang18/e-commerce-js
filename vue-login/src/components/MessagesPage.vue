<!-- filepath: /home/thangpd/nodejs/vue-login/src/components/MessagesPage.vue -->
<template>
  <div class="messages-page">
    <h2>Messages</h2>
    <div class="message-list">
      <div v-for="message in messages" :key="message.id" class="message">
        <h4>{{ message.sender }}</h4>
        <p>{{ message.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const messages = ref([
  { id: 1, sender: 'Alice', content: 'Hello, how are you?' },
  { id: 2, sender: 'Bob', content: 'Hi, I am good. How about you?' },
]);
</script>

<style scoped>
.messages-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.message-list .message {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>