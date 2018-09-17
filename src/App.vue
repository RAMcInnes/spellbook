<template>
    <div class="container">
        <app-header></app-header>
                <div v-if="!spellsLoaded">
            <app-loader></app-loader>
            <p>Please wait while the spells are transcribed</p>
        </div>
        <div class="row">
            <div class="col-12">
                <router-view></router-view>
            </div>
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
            this.$store.dispatch('loadSpells');
        }
    }
</script>

<style>
    body {
        padding: 30px;
    }
</style>
