import { createApp } from 'vue'
import App from "./App"
import components from '@/components/UI/index'
import router from "@/router/router";

const app = createApp(App)

components.forEach(myComponent =>{
    app.component(myComponent.name, myComponent)
})

app.use(router).mount('#app')
