<template>
    <div class="container">
        <app-header></app-header>
        <div class="row">
            <div class="col-12">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from './components/Header.vue';
    export default {
        components: {
            appHeader: Header
        },
        created() {
            const spellsLoaded = this.$store.getters.hasLoadedAllSpells;
            if (spellsLoaded === false) {
                this.$store.dispatch('setHasLoaded', true);
                this.$store.dispatch('loadSpells');
            }
        }
    }
</script>

<style>
    body {
        padding: 30px;
    }
</style>
