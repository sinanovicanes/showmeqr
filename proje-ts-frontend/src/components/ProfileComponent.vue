<template>
  <main>
    <div class="connections-grid">
      <a :href="getConnectionUrl(connection.name, connection.username)" class="connection" v-for="(connection, i) in connections" :key="i">
        <img class="connection-logo" :src="require('../assets/' + connection.name + '.png')">
        <span class="connection-name">{{ connection.name.replace(connection.name.charAt(0), connection.name.charAt(0).toUpperCase()) }}</span>
        <span class="connection-username">{{ connection.username }}</span>
      </a>
    </div>
  </main>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { ConnectionService } from '@/services/connection.service';
interface Props {
  connections: any[];
}
const props = defineProps<Props>();
const connectionService = ConnectionService.getInstance();

function getConnectionUrl(name: string, username?: string) {
  if (!username) return "";
  return connectionService.getConnectionUrl(name, username);
}
</script>

<style scoped>
a {
  text-decoration: none;
}
main {
  display: flex;
  justify-content: center;
  margin: 7vh 1% 0 1%;
}
.connections-grid {
  width: 93%;
  height: 0;
  background-color: black;
  margin-right: 1%;
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
  justify-content: start;
  gap: 10px;
}
.qr-wrapper {
  width: 25%;
  height: 80vh;
  background-color:#FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
}
.qr {
  width: 200px;
}
.connection {
  width: 220px;
  height: 190px;
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
.center-modal {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
}

@media screen and (max-width:1800px) {
  .connections-grid {
    grid-template-columns: auto auto auto auto auto auto;
  }
}

@media screen and (max-width:1690px) {
  .connections-grid {
    grid-template-columns: auto auto auto auto auto;
  }
}
@media screen and (max-width:1390px) {
  .connections-grid {
    grid-template-columns: auto auto auto auto;
  }
}
@media screen and (max-width:1090px) {
  .connections-grid {
    grid-template-columns: auto auto auto;
  }
}

@media screen and (max-width:480px) {
  .connections-grid {
    grid-template-columns: auto auto;
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
}

@media screen and (max-width:480px) {
  .connections-grid {
    grid-template-columns: auto auto auto;
    background: red;
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
}
</style>