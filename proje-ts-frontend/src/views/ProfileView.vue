<template>
  <section>
    <NavComponent />
    <ProfileComponent :connections="connections" />
  </section>
</template>

<script setup lang="ts">
import { axios } from '@/api/axios';
import NavComponent from '@/components/NavComponent.vue';
import ProfileComponent from '@/components/ProfileComponent.vue';
import { ref } from '@vue/reactivity';
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { UserService } from "@/services/user.service";
const userService = UserService.getInstance();
const userData = computed(() => userService.userData.value);
const connections = ref([]);

onMounted(async () => {
  const route = useRouter().currentRoute.value;
  
  connections.value = await getUserConnections(route.params.id as string);

  if (!userData.value) {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (username && password) {
          userService.login({
            username,
            password
        }).then(result => {
            if (!result) {
              localStorage.clear();
            }
        })
    }
  }
})

async function getUserConnections(address: string) {
  const response = await axios.post("/GetUserConnections", {
    address
  });

  return response.data || [];
}

const devData = [
  {name: "github", username: "elit10"},
  {name: "instagram", username: "_onurgok_"},
  {name: "twitter", username: "Crayz_Onur"},
  // {name: "spotify", username: "Deneme"},
  // {name: "snapchat", username: "Deneme"},
  {name: "steam", username: "OnurGok"}
]
</script>

<style scoped>
section {
  background-color: #E5E5E5;
  width: 100vw;
  height: 100vh;
}
</style>