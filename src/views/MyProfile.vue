<template>
    <div class="h-full w-auto">
        <profile v-for="info in informations" :key="info.id" :info="info" class="containter">
        </profile>
    </div>
</template>

<script>
import Profile from '../components/Profile.vue'

export default {
    data(){
        return{
            url: "http://localhost:5000/informations",
            informations:[]
        }
    },
    components:{
        Profile
    },
    methods:{
        async getInformations(){
            try{
                const res = await fetch(this.url)
                const data = await res.json()
                return data
            }catch(error){
                console.log(`Could not get informations! ${error}`)
            }
        },
    },
    async created(){
        this.informations = await this.getInformations()
    }
}
</script>