<template>
    <div class="col-md-4">
        <div class="card" style="width: 30rem;">
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
    </div>
</template>

<script>
export default {
     props: ['spell'],
     computed: {
         level() {
             switch(this.spell.level) {
                case 0:
                    return "Cantrip"
                    break;
                case 1:
                   return "1st Level"
                   break;
                case 2:
                    return "2nd Level"
                    break;
                case 3:
                    return "3rd Level"
                    break;
                case 4:
                    return "4th Level"
                    break;
                case 5:
                    return "5th Level"
                    break;
                case 6:
                    return "6th Level"
                    break;
                case 7:
                    return "7th Level"
                    break;
                case 8:
                    return "8th Level"
                    break;
                case 9:
                    return "9th Level"
                    break;
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
     }
}
</script>

<style>

</style>
