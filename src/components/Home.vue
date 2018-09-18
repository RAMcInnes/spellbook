<template>
    <div>
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
                return this.$store.getters.mySpells;
            }
        }
    }
</script>

<style>
</style>