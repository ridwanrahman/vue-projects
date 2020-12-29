<template>
    <nav class="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white px-4 py-4">
        <router-link 
            v-for="name in list" 
            :key="name" 
            class="mx-2" 
            :to="name.to">
            {{ name.title }}
        </router-link>
        
    </nav>
</template>

<script>
export default {
    data() {
        return {
            list: [
                {title:"Home", to:"/"},
                {title:"DC Heroes", to:"/dc-heroes"},
                {title:"Calendar", to:"/calendar"},
                {title:"Markdown", to:"/markdown"},
                {title:"ObjectDetection", to:"/object-detection"},
            ]
        }
    }

}
</script>

<style>

</style>