<template>
  <section>
    <div v-if="!userData">
      <HomeComponent />
    </div>
    <div v-else>
      <NavComponent />
      <ProfileComponent />
    </div>
  </section>
</template>

<script setup lang="ts">
import HomeComponent from "../components/HomeComponent.vue";
import ProfileComponent from "../components/UserProfileComponent.vue";
import NavComponent from "../components/NavComponent.vue";
import { UserService } from "@/services/user.service";
import { computed, onMounted } from "vue";

const userService = UserService.getInstance();
const userData = computed(() => userService.userData.value);

onMounted(() => {
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


</script>

<style scoped>
section {
  background-color: #E5E5E5;
}
</style>