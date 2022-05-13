import { createApp } from 'vue'
import App from "./App"
import components from '@/components/UI/index'
import router from "@/router/router";
import directives from "@/directives/index";
import store from "@/store/index"

const app = createApp(App)

components.forEach(myComponent =>{
    app.component(myComponent.name, myComponent)
})
directives.forEach(myDirective =>{
    app.directive(myDirective.name, myDirective)
})

app.use(router).use(store).mount('#app')
