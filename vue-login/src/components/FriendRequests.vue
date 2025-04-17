<!-- filepath: /home/thangpd/nodejs/vue-login/src/components/FriendRequests.vue -->
<template>
    <div class="friend-requests">
    <h1>Friend Requests</h1>
    <div v-if="requests.length > 0" class="requests-list">
        <div v-for="request in requests" :key="request.id" class="request-item">
        <img :src="request.avatar" alt="Avatar" class="avatar" />
        <div class="request-info">
            <h3>{{ request.requester }}</h3>
        </div>
        <div class="request-actions">
            <button @click="acceptRequest(request.id)" class="accept-button">Accept</button>
            <button @click="declineRequest(request.id)" class="decline-button">Decline</button>
        </div>
        </div>
    </div>
    <p v-else>No friend requests at the moment.</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

const requests = ref([]);

const fetchRequests = async () => {
try {
    const response = await api.get('/api/friends/requests');
    requests.value = response.data.requests;
} catch (error) {
    console.error('Error fetching friend requests:', error);
    requests.value = [];
}

};


onMounted(fetchRequests);

const acceptRequest = async(id) => {
    
    try {
        const response = await api.put(`/api/friends/request/${id}`,{
            status: 'accepted'
        });
        if (response.status === 200) {
            requests.value = requests.value.filter((request) => request.id !== id);
        } else {
            alert('Failed to accept friend request.');
        }
    } catch (error) {
        console.error('Error accepting friend request:', error);
    }
    
};

const declineRequest = (id) => {
    requests.value = requests.value.filter((request) => request.id !== id);
    alert(`Friend request declined for ID: ${id}`);
};
</script>

<style scoped>
.friend-requests {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

.requests-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.request-item {
    display: flex;
    align-items: center;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
}

.request-info {
    flex: 1;
}

.request-actions {
    display: flex;
    gap: 10px;
}

.accept-button {
    padding: 8px 12px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.accept-button:hover {
    background-color: #45a049;
}

.decline-button {
    padding: 8px 12px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.decline-button:hover {
    background-color: #e53935;
}
</style>
