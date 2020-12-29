<template>
    <div class="w-full flex">
        <div class="m-auto">
            <h1 class="text-5xl text-center my-5">Vue Calendar</h1>
            <section class="mx-2 my-4 flex justify-between">
                <h2 class="font-bold">{{currentMonthName}}</h2>
                <h2 class="font-bold">{{currentYear}}</h2>
            </section>
            <section class="flex text-center">
                <p class="" style="width:14.28%" v-for="num in days" :key="num">{{num}}</p>
            </section>
            <section class="flex flex-wrap my-2">
                <p class="text-center"
                    style="width: 14.28%"
                    v-for="num in startDay()" :key="num">
                </p>
                <p class="text-center" 
                    style="width:14.28%"
                    :class="currentDateClass(num)"
                    v-for="num in daysInMonth()" :key="num">{{num}}
                    
                </p>
            </section>
            <section class="flex justify-between my-6">
                <button class="px-2 border rounded" @click="previous">Prev</button>
                <button class="px-2 border rounded" @click="next">Next</button>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentDate: new Date().getUTCDate(),
            currentMonth: new Date().getMonth(),
            currentYear: new Date().getFullYear(),
            days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        }
    },
    methods: {
        daysInMonth() {
            return new Date(this.currentYear, this.currentMonth+1, 0).getDate();
        },
        startDay() {
            return new Date(this.currentYear, this.currentMonth,1).getDay();
        },
        next() {
            if(this.currentMonth == 11) {
                this.currentMonth = 0;
                this.currentYear++;
            } else {
                this.currentMonth++;
            }
        },
        previous() {
            if(this.currentMonth == 0) {
                this.currentMonth = 12;
                this.currentYear--;
            }
            this.currentMonth--;
        },
        currentDateClass(num) {
            const calendarFullDate = new Date(this.currentYear, this.currentMonth, num).toDateString();
            const currentFullDate = new Date().toDateString();
            return  calendarFullDate== currentFullDate ? 'text-yellow-600':'';
        }
    },
    computed: {
        currentMonthName() {
            return new Date(this.currentYear, this.currentMonth).toLocaleString("default",{month:"long"})
        }
    }
}
</script>

<style>

</style>