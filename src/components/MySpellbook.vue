<template>
    <div>
        <div v-if="spells.length == 0">Add spells from the Spell Library to your spellbook</div>
        <app-spell v-else v-for="spell in spells" :spell="spell" :key="spell.id"></app-spell>
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
                return this.$store.getters.mySpells;
            }
        }
    }
</script>

<style>
</style>