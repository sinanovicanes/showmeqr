import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './global/global.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleMinus, faUser, faPencil, faArrowRightFromBracket, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faCircleMinus, faUser, faPencil, faArrowRightFromBracket, faCircleXmark);

createApp(App).component('font-awesome', FontAwesomeIcon).use(router).mount('#app');