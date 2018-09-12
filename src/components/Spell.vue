<template>
        <div class="card" @click="addToSpellbook">
            <div class="card-body">
                <h1 class="card-title">{{ spell.name }}</h1>
                <h6 class="card-subtitle mb-2 text-muted">{{ level }} - {{ spell.school.name }}</h6>
                <div class="card-text">
                    <span><b>Casting Time:</b> {{ spell.casting_time }}</span>
                    <br>
                    <span><b>Range:</b> {{ spell.range }}</span>
                    <br>
                    <span><b>Components:</b> {{ components }}</span>
                    <br>
                    <span><b>Duration:</b> {{ spell.duration }}</span>
                    <br>
                    <span><b>Classes: </b> {{ classes }}</span>
                </div>
            </div>
        </div>
</template>

<script>
export default {
     props: ['spell'],
     computed: {
         level() {
             switch(this.spell.level) {
                case 0:
                    return "Cantrip";
                case 1:
                    return "1st Level";
                case 2:
                    return "2nd Level";
                case 3:
                    return "3rd Level";
                case 4:
                    return "4th Level";
                case 5:
                    return "5th Level";
                case 6:
                    return "6th Level";
                case 7:
                    return "7th Level";
                case 8:
                    return "8th Level";
                case 9:
                    return "9th Level";
             }
         },
         components() {
             let componentString = '';
             for (let component of this.spell.components) {
                 componentString += component + ", ";
             }
             if (this.spell.material) {
                 componentString += this.spell.material;
             }
             return componentString;
         },
         classes() {
             let classString = '';
             for (let spellClass of this.spell.classes) {
                 classString += spellClass.name + ', ';
             }
             return classString;
         }
     },
     methods: {
         addToSpellbook() {
            // console.log("element",element);
            const spell = {
                name: this.spell.name,
                level: this.spell.level,
                school: { name: this.spell.school.name },
                casting_time: this.spell.casting_time,
                range: this.spell.range,
                components: this.spell.components,
                duration: this.spell.duration,
                classes: this.spell.classes
            }
            this.$store.dispatch('addSpelltoMySpellbook', spell);
         }
     }
}
</script>

<style>
    .card {
        display: inline-block;
        width: 50%;
        height: 100%;
    }
    .card:hover {
        background-color: lightgreen;
        background-image: url("https://png.icons8.com/metro/50/000000/plus.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 15%;
    }
    .added {
        background-color: lightgray;
        opacity: .5;
    }
</style>
