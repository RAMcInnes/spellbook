<template>
    <div class="container">
        <app-header></app-header>
        <br>
        <div v-if="!spellsLoaded">
            <app-loader></app-loader>
            <p>Please wait while the spells are transcribed</p>
        </div>
        <div v-else class="row">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import { MikePad } from 'vue-loading-spinner'
    import Header from './components/Header.vue';
    export default {
        components: {
            appLoader: MikePad,
            appHeader: Header
        },
        computed: {
            spellsLoaded() {
                return this.$store.getters.hasLoadedAllSpells;
            }
        },
        created() {
            this.$store.dispatch('loadAllSpells');
            // This may seem weird, but I am setting filteredSpells = allSpells here.
            // This is because allSpells will never change, but filteredSpells will.
            const spellList = this.$store.getters.allSpells;
            this.$store.dispatch('setFilteredSpells', spellList);
        }
    }
</script>

<style>
    body {
        padding-top: 10px;
        padding-bottom: 10px;
        background-color: lightslategrey;
    }
</style>