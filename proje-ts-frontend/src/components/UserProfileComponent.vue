<template>
  <main>
    <div class="connections-grid">
      <div class="connection" v-for="(connection) in userData!.connections" :key="connection.name" @click="openConnection(connection.name, connection.username)">
        <font-awesome :icon="['fas', 'circle-minus']" @click="removeConnection(connection.name)" class="remove" v-if="editMode"/>
          <img class="connection-logo" :src="require('../assets/' + connection.name + '.png')">
          <span class="connection-name">{{ connection.name.replace(connection.name.charAt(0), connection.name.charAt(0).toUpperCase()) }}</span>
          <span class="connection-username">{{ connection.username }}</span>
      </div>
      <div class="connection" v-if="userData!.connections.length < connectionService.validConnections.length" @click.stop="showNewConnectionModal = !showNewConnectionModal">
        <img class="connection-logo" src="../assets/plus.png">
        <span class="connection-name">Yeni Ekle</span>
      </div>
    </div>
    <div class="qr-wrapper">
      <img :src="qrCode" alt="" class="qr">
    </div>

    <NewConnection class="center" v-if="showNewConnectionModal" @closeModal="closeModal"/>
  </main>
</template>

<script setup lang="ts">
import NewConnection from '@/components/NewConnectionComponent.vue';
import { onMounted, computed, ref, onBeforeUnmount } from "vue";
import { ConnectionService } from '@/services/connection.service';
import { QRService } from '@/services/qr.service';
import { UserService } from '@/services/user.service';

const qrService = QRService.getInstance();
const connectionService = ConnectionService.getInstance();
const qrCode = ref("");
const showNewConnectionModal = ref(false);
const userService = UserService.getInstance();
const userData = computed(() => userService.userData.value);
const editMode = computed(() => userService.editConnections.value);

onMounted(() => {
  qrService.createQR(userData.value!.address!).then(qr => {
    qrCode.value = qr
  });
})

onBeforeUnmount(() => {
  userService.editConnections.value = false;
})

function removeConnection(name: string) {
  userService.removeConnection(name);
}

function openConnection(name: string, username?: string) {
  if (editMode.value || !username) return;
  const url = connectionService.getConnectionUrl(name, username);
  if (!url) return;

  window.open(url);
}

function closeModal() {
  showNewConnectionModal.value = false;
}
</script>

<style scoped>
a {
  text-decoration: none;
}
main {
  display: flex;
  justify-content: center;
  margin: 7vh 3% 0 3%;
  height: 100vh;
}
.connections-grid {
  flex: 4;
  height: 0vh;
  background-color: black;
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  justify-content: start;
  gap: 10px;
}
.qr-wrapper {
  flex: 1;
  height: 80vh;
  background-color:#FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  position: relative;
}
.qr {
  width: 200px;
}
.connection {
  width: 220px;
  height: 190px;
  position: relative;
  /* margin: 10px; */
  background: #FFFFFF;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* margin: 10px; */
  cursor: pointer;
}
.connection img {
  width: 50px;
  height: 50px;
}
.connection-name {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  color: #09203F;
  margin-top: 5px;
  margin-bottom: 10px;
}
.connection-username {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  color: #09203F;
}
.center {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
}
.remove {
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 20px;
  color: #904e4e;
}
.remove:hover {
  color: #8b2929;
}

@media screen and (max-width:1400px) {
  .connections-grid {
    grid-template-columns: auto auto auto auto;
    flex: 3;
  }
}

@media screen and (max-width:1300px) {
  .connections-grid {
    flex: 3.5;
  }
}

@media screen and (max-width:1250px) {
  .connections-grid {
    grid-template-columns: auto auto;
    flex: 1.5;
  }
}

@media screen and (max-width:480px) {
  .connections-grid {
    grid-template-columns: auto auto;
    flex: 1.5;
  }
  .connection {
    width: 90px;
    height: 75px;
    padding: 10px;
  }
  .connection img {
    width: 30px;
    height: 30px;
  }
  .connection-name {
    font-size: 8px;
    margin-top: 3px;
    margin-bottom: 2px;
  }
  .connection-username {
    font-size: 8px;
  }
  .qr {
    width: 130px;
  }
}
</style>