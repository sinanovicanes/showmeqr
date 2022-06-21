<template>
    <section>
    <main>
        <div class="home-container">
            <div class="img-container">
                <img src="../assets/iphone_back_1.png" alt="">
            </div>
            <div class="form-container">
                <h1>Show Me QR</h1>
                <div v-if="selectedPage == 'login'">
                    <div class="inputs">
                        <label>Kullanıcı adı veya e-posta</label>
                        <input type="text" v-model="username">
                        <label>Şifre</label>
                        <span class="sp" @click="showPassword = !showPassword">{{ showPassword ? 'Gizle' : 'Göster' }}</span>
                        <input :type="showPassword ? 'text' : 'password'" v-model="password">
                    </div>
                    <div id="fpassword" @click="changePage('fpassword')">Şifremi unuttum</div>
                    <div class="buttons">
                        <button @click.stop="login"><span>Giriş Yap</span></button>
                    </div>
                    <div class="changePage">
                        <span>Hesabın mı yok? <span class="action" @click="changePage('register')">Kayıt ol</span></span>
                    </div>
                </div>
                <div v-else-if="selectedPage == 'register'">
                    <div class="inputs">
                        <label>Kullanıcı adı</label>
                        <input type="text" v-model="username">
                        <label>E-Posta</label>
                        <input type="email" v-model="mail">
                        <label>Şifre</label>
                        <input type="password" v-model="password">
                        <label>Şifre tekrar</label>
                        <input type="password" v-model="password2">
                    </div>
                    <div class="buttons">
                        <button @click.stop="register"><span>Kayıt Ol</span></button>
                    </div>
                    <div class="changePage">
                        <span>Zaten hesabın var mı? <span class="action" @click="changePage('login')">Giriş Yap</span></span>
                    </div>
                </div>
                <div v-else>
                    <div class="inputs">
                        <label>E-Posta</label>
                        <input type="mail" v-model="mail">
                    </div>
                    <div class="buttons">
                        <button @click.stop="resetMail"><span>Mail Gönder</span></button>
                    </div>
                    <div class="changePage">
                        <span><span class="action" @click="changePage('login')">Geri</span></span>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <footer>
        © Copyright 2022
    </footer>
    </section>
</template>

<script setup lang="ts">
import { UserService } from "@/services/user.service";
import { ref } from "vue";
const username = ref("");
const mail = ref("");
const password = ref("");
const password2 = ref("");
const selectedPage = ref("login");
const showPassword = ref(false);
const userService = UserService.getInstance();
let timeOutId: any;

function resetValues() {
    username.value = "";
    password.value = "";
    password2.value = "";
    mail.value = "";
    password.value = "";
    showPassword.value = false;
}

function login() {
    if (username.value.length < 4 || username.value.length > 24) {
        alert("Kullanıcı adınız en az 4 en fazla 24 karakter uzunluğunda olabilir");
        resetValues();
        return;
    } else if (password.value.length < 4 || password.value.length > 24) {
        alert("Girilen şifre en az 4 en fazla 24 karakter uzunluğunda olabilir");
        resetValues();
        return;
    }

    userService.login({
        username: username.value,
        password: password.value
    }).then(result => {
        if (!result) {
            alert("Kullanıcı adınız veya şifreniz hatalı");
        }
    })
}

function register() {
    if (username.value.length < 4 || username.value.length > 24) {
        alert("Kullanıcı adınız en az 4 en fazla 24 karakter uzunluğunda olabilir");
        resetValues();
        return;
    } else if (password.value.length < 4 || password.value.length > 24) {
        alert("Girilen şifre en az 4 en fazla 24 karakter uzunluğunda olabilir");
        resetValues();
        return;
    } else if (password.value !== password2.value) {
        alert("Girdiğiniz şifreler birbirleri ile eşleşmiyor");
        resetValues();
        return;
    }

    userService.register({
        username: username.value,
        password: password.value,
        mail: mail.value
    }).then(result => {
        if (!result) {
            alert("Bu kullanıcı adı veya mail adresi zaten kullanılıyor");
        }
    })
}

function resetMail() {
    if (!mail.value) alert("Lütfen geçerli bir mail adresi girin");

    userService.resetMail({
        mail: mail.value
    }).then(result => {
        if (result) {
            alert("Hesabınıza sıfırlama maili gönderildi");
            timeOutId = setTimeout(() => {
                changePage("login");
            }, 2000);
        } else {
            alert("Hesabınız bulunamadı");
        }
    })
}

function changePage(page: string) {
    selectedPage.value = page;
    resetValues();
    if (timeOutId) {
        clearTimeout(timeOutId);
        timeOutId = undefined;
    }
}

</script>

<style scoped>
section {
    min-height: 100vh;
    overflow: hidden;
    background: #E5E5E5;
}
main {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 90vh;
}
.home-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.img-container img {
    width: 354px;
    height: 342px;
}
.form-container {
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
.inputs {
    display: flex;
    position: relative;
    flex-direction: column;
}
.inputs label {
    position: relative;
    color: #09203F;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    left: 5%;
    top: 10px;
}
button {
    width: 334px;
    height: 50px;
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
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
}
h1 {
    color: #09203F;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 45px;
}
.changePage {
    display: flex;
    align-items: center;
    justify-content: center;
}
.changePage span {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #09203F;
}
span .action {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 550;
    font-size: 16px;
    line-height: 24px;
    text-align: right;
    text-decoration-line: underline;
    color: #09203F;
    cursor: pointer;
}
footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 21px;
    color: #222222;
}
#fpassword {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-decoration-line: underline;
    color: #09203F;
    cursor: pointer;
    display: flex;
    align-items: right;
    justify-content: right;
    margin-right: 10px;
}
.sp {
    position: absolute;
    right: 6%;
    bottom: 13%;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 16px;
    color: #09203F;
    cursor: pointer;
}

@media screen and (max-width:480px) {
    .img-container {
        display: none;
    }
}
</style>