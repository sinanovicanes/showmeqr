<template>
    <div class="modal-container">
        <h1>Yeni Bağlantı</h1>

        <font-awesome :icon="['fas', 'circle-xmark']" class="icon" @click.stop="closeModal" />
        
        <div class="inputs">
            <div class="select">
                <img class="connection-logo" v-if="newConnectionType" :src="require('../assets/' + newConnectionType + '.png')">
                <select v-model="newConnectionType">
                    <option :value="connection.name" v-for="(connection) in availableAccounts" :key="connection.name">
                        <img class="connection-logo" :src="require('../assets/' + connection.name + '.png')">
                        <span class="connection-name">{{ connection.name.replace(connection.name.charAt(0), connection.name.charAt(0).toUpperCase()) }}</span>
                    </option>
                </select>
            </div>
            <input v-if="connectionData" type="text" v-model="newConnectionURL" :placeholder="connectionData.format || 'Kullanıcı Adı'">
        </div>
        <button @click.stop="addNewConnection"><span>Ekle</span></button>
    </div>
</template>

<script setup lang="ts">
import { ConnectionService } from '@/services/connection.service';
import { UserService } from '@/services/user.service';
import { defineEmits, computed, ref, watch } from 'vue';

const emit = defineEmits(['closeModal']);
const connectionService = ConnectionService.getInstance();
const userService = UserService.getInstance();
const userData = computed(() => userService.userData.value);
const availableAccounts = computed(() => connectionService.getAvailableConnections(userData.value!.connections));
const newConnectionType = ref();
const connectionData = computed(() => newConnectionType.value && availableAccounts.value.find(item => item.name == newConnectionType.value));
const newConnectionURL = ref();

function getRawFormat(format?: string) {
    if (!format) return "";
    return format.substring(0, format.length - 2);
}

watch(newConnectionType, () => {
    const connection = availableAccounts.value.find(item => item.name == newConnectionType.value);

    newConnectionURL.value = getRawFormat(connection?.format);
})

function closeModal() {
    emit('closeModal');
}

function addNewConnection() {
    if (!newConnectionURL.value) {
        alert("Lütfen geçerli bir bağlantı giriniz");
        return;
    }

    const rawFormat = getRawFormat(connectionData.value.format);

    if (rawFormat && newConnectionURL.value.substring(0, rawFormat.length) != rawFormat) {
        alert("Hatalı bağlantı girdiniz. Bağlantınız " + rawFormat + " şeklinde başlamalı");
        return;
    }

    let userName = newConnectionURL.value;

    if (rawFormat) {
        userName = userName.replace(rawFormat, '');
    }

    userService.newConnection(connectionData.value.name, userName);
    emit('closeModal');
}
</script>

<style scoped>
.modal-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 30px;
    margin: 10px;
    box-shadow: 0px 5px 20px #0000001a;
    border-radius: 20px;
    background: #FFFFFF;
    width: 440px;
}
.select {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 24px;
}
.select img {
    padding-right: 10px;
    width: 50px;
    height: 50px;
}
select {
    cursor: pointer;
}
option {
    cursor: pointer;
}
.inputs {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 10px;
}
.buttons {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 10px;
}
input {
    background: #F3F2F7;
    width: 314px;
    height: 40px;
    margin: 10px;
    padding: 0 10px;
    border-radius: 8px;
    border: none;
}
.inputs label {
    color: #09203F;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
}
select {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 20px;
    border: none;
    box-shadow: 0px 5px 20px #0000001a;

}
button {
    width: 120px;
    height: 40px;
    background: #36BF5D;
    border-radius: 8px;
    border: none;
    color: white;
    margin-top: 10px;
    cursor: pointer;
}
button:hover {
    background-color: #2c9b4c;
}
button span {
    color: #FFFFFF;
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
}
.icon {
    position: absolute;
    top: -5px;
    right: -5px;
    font-size: 30px;
    color: #8b2929;
}
.icon:hover {
    color: #721919;
}

@media screen and (max-width:480px) {
.modal-container {
    width: 220px;
}
.select {
    margin-bottom: 5px;
    font-size: 8px;
}
.select img {
    padding-right: 5px;
    width: 45px;
    height: 45px;
}
input {
    background: #F3F2F7;
    width: 200px;
    height: 30px;
}
button {
    width: 100px;
}
}
</style>