import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import ItemCard from './components/ItemCard.vue'

const app = createApp(App)
app.component('item-card', ItemCard)
app.use(router).mount('#app')