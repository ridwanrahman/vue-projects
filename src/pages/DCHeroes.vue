<template>
  <div class="w-full flex">
    <div class="m-auto">
      <div class="mx-10 my-10">
        <h1 class="text-5xl text-center">Dc Heroes</h1>
      </div>
      <ul>
        <li class="list-disc flex justify-between font-medium text-1xl" v-for="(hero, index) in dcHeroes" :key="index">{{hero.name}}</li>
      </ul>
      <form class="mt-10" @submit.prevent>
        <input class="border rounded" v-model="newHero"/>
        <button class="border rounded bg-gradient-to-tr from-red-700 to-pink-500 text-white" type="submit" @click="addHero">Add Hero</button>
      </form>
    </div>
  </div>
    
</template>

<script>

export default {
  data() {
    return {
      newHero: "",
      title: "hi",
      isShowing: true,
      count: 0,
      dcHeroes: [
        {name:'Superwoman'},
        {name:'Flash'},
        {name:'Batman'},
        {name:'Arrow'},
      ]
    }
  },
  methods: {
    addHero() {
      if(this.newHero != "") {
        this.dcHeroes.push({name:this.newHero});
        this.newHero="";
      }
    }
  }
}
</script>

<style>

</style>