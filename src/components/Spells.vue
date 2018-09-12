<template>
    <div> Filters
        <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups"> <b>Levels</b> 
            <div class="btn-group mr-2" role="group" aria-label="First group">
                <button type="button" class="btn btn-secondary">0</button>
                <button type="button" class="btn btn-secondary">1</button>
                <button type="button" class="btn btn-secondary">2</button>
                <button type="button" class="btn btn-secondary">3</button>
                <button type="button" class="btn btn-secondary">4</button>
                <button type="button" class="btn btn-secondary">5</button>
                <button type="button" class="btn btn-secondary">6</button>
                <button type="button" class="btn btn-secondary">7</button>
                <button type="button" class="btn btn-secondary">8</button>
                <button type="button" class="btn btn-secondary">9</button>
            </div>
        </div>
        <br>
        <app-spell v-for="spell in spells" :spell="spell" :key="spell.id"></app-spell>
    </div>
</template>

<script>
    import Spell from './Spell.vue';

    export default {
        components: {
            appSpell: Spell
        },
        computed: {
            spells() {
                return this.$store.getters.allSpells;
            }
        }
    }
</script>