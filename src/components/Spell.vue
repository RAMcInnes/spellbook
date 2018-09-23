<template>
    <div id="cardID" class="card">
        <div class="card-body">
            <div class="card-title">
                <span id="spellTitle">{{ spell.name }}</span>
                <button v-if="inMySpellbook" class="btn btn-danger btn-lg float-right" @click="removeFromMySpellbook">Remove Spell</button>
                <button v-else class="btn btn-success btn-lg float-right" @click="addToMySpellbook">Add Spell</button>
            </div>
            <h6 class="card-subtitle mb-2 text-muted">{{ spell.level | levelName }} - {{ spell.school.name }}</h6>
            <div class="card-text">
                <span><b>Casting Time: </b>{{ spell.casting_time }}</span>
                <br>
                <span><b>Range: </b>{{ spell.range }}</span>
                <br>
                <span><b>Components: </b>{{ components }}</span>
                <br>
                <span><b>Duration: </b>{{ spell.duration }}</span>
                <br>
                <span><b>Classes: </b>{{ classes }}</span>
                <br>
            </div>
                <button
                        class="btn btn-info descriptionButton"
                        data-toggle="collapse"
                        :data-target="'#spellDescription' + spell.index">
                        Description
                </button>
                <div class="collapse" :id="'spellDescription' + spell.index">
                    <div class="card card-body">
                        {{ spell.desc[0] }}
                    </div>
                </div>

        </div>
    </div>
</template>

<script>
export default {
     props: ['spell'],
     data() {
         return {
             spellAdded: false
         }
     },
     filters: {
         levelName(level) {
            switch(level) {
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
                default:
                    return "100000th LEVEL!";
             }
         }
     },
     computed: {
        inMySpellbook() {
             let mySpellList = this.$store.getters.mySpells;

             for (let spellListSpell of mySpellList) {
                 if (spellListSpell.name === this.spell.name) {
                    return spellListSpell.name.toUpperCase().indexOf(this.spell.name.toUpperCase()) > -1;
                 }
             }

             return false;
         },
         components() {
             return this.spell.components.join(', '); // + '| this.spell.material';
         },
         classes() {
             // I would also like to use .join(', ') here, but I need to access classes.className
             let classString = '';
             for (let spellClass of this.spell.classes) {
                 classString += spellClass.name + ', ';
             }
             return classString;
         }
     },
     methods: {
         addToMySpellbook() {
            if (!this.spellAdded) {
                const spell = {
                    name: this.spell.name,
                    level: this.spell.level,
                    school: { name: this.spell.school.name },
                    casting_time: this.spell.casting_time,
                    range: this.spell.range,
                    components: this.spell.components,
                    material: this.spell.material,
                    duration: this.spell.duration,
                    classes: this.spell.classes,
                    desc: this.spell.desc,
                    index: this.spell.index
                }
                this.$store.dispatch('addSpellToMySpellbook', spell);
                this.spellAdded = true;
            }
         },
         removeFromMySpellbook() {
            this.$store.dispatch('removeSpellFromMySpellbook', this.spell);
         }
     }
}
</script>

<style>
    #cardID {
        display: inline-block;
        width: 50%;

    }
    #spellTitle {
        font-size: 35px;
        font-weight: bold;
    }
    .descriptionButton {
        margin-top: 5px;
    }
</style>
