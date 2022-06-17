<template>
    <nav class="navbar">
        <div class="menu-stuff">
            <img src="../assets/logo.png" alt="">
            <h1>Show Me QR</h1>
        </div>
        <div class="dropdown">
            <div class="dropdown-trigger" @click.stop="showSettings = !showSettings" v-if="userData">
                <span>{{ userData?.username }}</span>
                <!-- <img :src="profilePicture" /> -->
            </div>
            <div v-else class="buttons">
                <router-link to="/">
                    <button class="login"><span>Giriş yap</span></button>
                    <button class="register"><span>Kayıt ol</span></button>
                </router-link>
            </div>
            <div class="options" v-if="userData && showSettings">
                <router-link to="/" v-if="currentRouter.fullPath != '/'" class="option">
                    <font-awesome :icon="['fas', 'user']" class="icon" />
                    <span>Profilim</span>
                </router-link>
                <div class="option" v-if="currentRouter.fullPath == '/'" @click.stop="toggleEditMode">
                    <font-awesome :icon="['fas', 'pencil']" class="icon" />
                    <span>{{ editMode ? 'Düzenlemeyi Bitir' : 'Bağlantıları Düzenle' }}</span>
                </div>
                <div class="option logout" @click.stop="logout">
                    <font-awesome :icon="['fas', 'arrow-right-from-bracket']" class="icon" />
                    <span>Çıkış Yap</span>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { UserService } from '@/services/user.service';
import { useRouter } from 'vue-router'

const router = useRouter();
const currentRouter = computed(() => router.currentRoute.value);
const showSettings = ref(false);
const userService = UserService.getInstance();
const userData = computed(() => userService.userData.value);
const profilePicture = computed(() => userService.getProfilePicture());
const editMode = computed(() => userService.editConnections.value);

function logout() {
    userService.logOut();
}

function toggleEditMode() {
    userService.editConnections.value = !editMode.value;
    console.log(editMode.value);
}

window.addEventListener('click', () => {
    if (showSettings.value) {
        showSettings.value = false;
    }
});
</script>

<style scoped>
.navbar {
    position: relative;
    width: 95%;
    height: 82px;
    left: 2.5%;
    top: 4vh;
    background-color: #FFFFFF;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.menu-stuff {
    display: flex;
    align-items: center;
}
.menu-stuff img {
    width: 38.08px;
    padding-left: 20px;
}
.menu-stuff h1 {
    padding-left: 20px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 45px;
    color: #09203F;
}
.dropdown {
    display: flex;
    position: relative;
}
.dropdown-trigger {
    display: flex;
    align-items: center;
    cursor: pointer
}
.dropdown-trigger span {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    line-height: 38px;
    color: #09203F;
    padding-right: 20px;
    white-space: nowrap;
}
.dropdown-trigger img {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    margin-right: 20px;
}
.options {
    display: flex;
    justify-content: center;
    width: 250px;
    background-color: #979797;
    box-shadow: 0px 5px 20px #0000001a;
    border-radius: 20px;
    border: 0.5px solid #0000001a;
    background: #FFFFFF;
    flex-direction: column;
    z-index: 1;
    overflow: hidden;

    position: absolute;
    top: 52px;
    right: 0px;
}
.option {
    position: relative;
    padding: 2.5px;
    border-bottom: 0.1px solid #979797;
    display: flex;
    align-items: center;
    padding-bottom: 1%;
    cursor: pointer;
}
.option:hover {
    background-color: #e0dfdf;
}
.option span {
    color: #09203F;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 27px;
    margin-left: 2%;
    text-decoration: none;
}
.option svg {
    width: 25px;
    padding-left: 5%;
}
.logout {
    background-color: #904e4e;
}
.logout span, .logout .icon {
    color: #FFFFFF;
}
.logout:hover {
    background-color: #8b2929;
}
.buttons {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    cursor: pointer
}
button {
    width: 100px;
    height: 40px;
    background: #36BF5D;
    border-radius: 8px;
    border: none;
    color: white;
    cursor: pointer;
}
button:hover {
    background-color: #2c9b4c;
}
button span {
    color: #FFFFFF;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 27px;
}
.login {
    margin-right: 20px;
}
.register {
    background-color: #36afbf;
    margin-right: 20px;
}
.register:hover {
    background-color: #2c8e9b;
}
.icon {
    color: black;
}

@media screen and (max-width:480px) {
.menu-stuff h1 {
    font-size: 20px;
}
.dropdown-trigger span {
    font-size: 20px;
}
.buttons {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    cursor: pointer
}
button {
    width: 70px;
    height: 25px;
}
button span {
    font-size: 12px;
}
.login {
    margin-right: 5px;
}
}
</style>