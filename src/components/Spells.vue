<template>
    <div>
        <app-spell-filter></app-spell-filter>
        <hr>
        <app-spell v-for="spell in spells" :spell="spell" :key="spell.id"></app-spell>
    </div>
</template>

<script>
    import Spell from './Spell.vue';
    import SpellFilter from './SpellFilters.vue';

    export default {
        components: {
            appSpellFilter: SpellFilter,
            appSpell: Spell
        },
        computed: {
            spells() {
                const filteredSpells = this.$store.getters.filteredSpells;
                if (filteredSpells.length > 0) {
                    return this.$store.getters.filteredSpells;
                } else {
                    return this.$store.getters.allSpells;
                }
            }
        }
    }
</script>

<style>
</style>