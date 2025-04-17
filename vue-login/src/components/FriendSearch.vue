<!-- filepath: /home/thangpd/nodejs/vue-login/src/components/FriendSearch.vue -->
<template>
  <div class="friend-search">
    <h2>Find Friends</h2>
    <input v-model="searchQuery" type="text" placeholder="Search for friends..." />
    <div v-if="filteredFriends.length" class="friend-list">
      <div v-for="friend in filteredFriends" :key="friend.id" class="friend">
        <img :src="friend.avatar" alt="Avatar" class="avatar" />
        <h4>{{ friend.name }}</h4>
      </div>
    </div>
    <p v-else>No friends found.</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const friends = ref([
  { id: 1, name: 'Alice', avatar: 'https://via.placeholder.com/50' },
  { id: 2, name: 'Bob', avatar: 'https://via.placeholder.com/50' },
]);

const filteredFriends = computed(() =>
  friends.value.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);
</script>

<style scoped>
.friend-search {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.friend-list .friend {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.friend .avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>