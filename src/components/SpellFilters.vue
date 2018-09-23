<template>
    <div id="spellFilters">
        <div id="filterHeaderLabel">Filters</div>
        <div class="btn-toolbar filterToolbar" role="toolbar">
            <span class="filterLabel">Levels:</span>
            <div class="btn-group mr-2" role="group">
                <button type="button" class="btn" @click="addFilter($event, {level:0})">Cantrip</button>
                <button type="button" class="btn" @click="addFilter($event, {level:1})">1st</button>
                <button type="button" class="btn" @click="addFilter($event, {level:2})">2nd</button>
                <button type="button" class="btn" @click="addFilter($event, {level:3})">3rd</button>
                <button type="button" class="btn" @click="addFilter($event, {level:4})">4th</button>
                <button type="button" class="btn" @click="addFilter($event, {level:5})">5th</button>
                <button type="button" class="btn" @click="addFilter($event, {level:6})">6th</button>
                <button type="button" class="btn" @click="addFilter($event, {level:7})">7th</button>
                <button type="button" class="btn" @click="addFilter($event, {level:8})">8th</button>
                <button type="button" class="btn" @click="addFilter($event, {level:9})">9th</button>
            </div>
        </div>
        <div class="btn-toolbar filterToolbar" role="toolbar">
            <span class="filterLabel">Schools:</span>
            <div class="btn-group mr-2" role="group">
                <button type="button" class="btn" @click="addFilter($event, {school:'Abjuration'})">Abjuration</button>
                <button type="button" class="btn" @click="addFilter($event, {school:'Conjuration'})">Conjuration</button>
                <button type="button" class="btn" @click="addFilter($event, {school:'Divination'})">Divination</button>
                <button type="button" class="btn" @click="addFilter($event, {school:'Enchantment'})">Enchantment</button>
                <button type="button" class="btn" @click="addFilter($event, {school:'Evocation'})">Evocation</button>
                <button type="button" class="btn" @click="addFilter($event, {school:'Illusion'})">Illusion</button>
                <button type="button" class="btn" @click="addFilter($event, {school:'Necromancy'})">Necromancy</button>
                <button type="button" class="btn" @click="addFilter($event, {school:'Transmutation'})">Transmutation</button>
            </div>
        </div>
        <div class="btn-toolbar filterToolbar" role="toolbar">
            <span class="filterLabel">Classes:</span>
            <div class="btn-group mr-2" role="group">
                <button type="button" class="btn" @click="addFilter($event, {className:'Bard'})">Bard</button>
                <button type="button" class="btn" @click="addFilter($event, {className:'Cleric'})">Cleric</button>
                <button type="button" class="btn" @click="addFilter($event, {className:'Druid'})">Druid</button>
                <button type="button" class="btn" @click="addFilter($event, {className:'Paladin'})">Paladin</button>
                <button type="button" class="btn" @click="addFilter($event, {className:'Ranger'})">Ranger</button>
                <button type="button" class="btn" @click="addFilter($event, {className:'Sorcerer'})">Sorcerer</button>
                <button type="button" class="btn" @click="addFilter($event, {className:'Warlock'})">Warlock</button>
                <button type="button" class="btn" @click="addFilter($event, {className:'Wizard'})">Wizard</button>
            </div>
        </div>
        <div class="form-group" id="searchbar">
            <div class="col-sm-12 col-md-12 col-lg-12">
                <input v-model="textFilter" v-on:input="applyFilters" type="search" class="form-control" id="search" placeholder="Spell Name...">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                textFilter: ""
            }
        },
        methods: {
            addFilter(event, filterData) {
                // My way of toggling the look of the buttons. Probably not the best way.
                event.target.classList.toggle("btn-primary");

                if (event.target.classList.contains("btn-primary")) {
                    /* ADD FILTER */

                    // doing this because {level:0} = if(0)
                    if (filterData.level !== undefined) {
                        // Filter based on spell.level
                        this.$store.dispatch('addLevelToLevelFilter', filterData.level);
                    }
                    if (filterData.school) {
                        // Filter based on spell.school.name
                        this.$store.dispatch('addSchoolToSchoolFilter', filterData.school);
                    }
                    if (filterData.className) {
                        // Filter based on spell.classes
                        this.$store.dispatch('addClassToClassFilter', filterData.className);
                    }
                } else {
                    /* REMOVE FILTER */

                    // doing this because {level:0} = if(0)
                    if (filterData.level !== undefined) {
                        // Filter based on spell.level
                        this.$store.dispatch('removeLevelFromLevelFilter', filterData.level);
                    }
                    if (filterData.school) {
                        // Filter based on spell.school.name
                        this.$store.dispatch('removeSchoolFromSchoolFilter', filterData.school);
                    }
                    if (filterData.className) {
                        // Filter based on spell.classes
                        this.$store.dispatch('removeClassFromClassFilter', filterData.className);
                    }
                }

                this.applyFilters();
            },
            applyFilters() {
                const levelFilters = this.$store.getters.levelFilter;
                const schoolFilters = this.$store.getters.schoolFilter;
                const classFilters = this.$store.getters.classFilter;
                let spellList = this.$store.getters.allSpells;

                // Filter based on spell.level
                if (levelFilters.length > 0) {
                    spellList = spellList.filter((spell) => {
                        for (let level of levelFilters) {
                            if (spell.level === level) {
                                return true;
                            }
                        }
                    });
                }

                // Filter based on spell.school.name
                if (schoolFilters.length > 0) {
                    spellList = spellList.filter((spell) => {
                        for (let school of schoolFilters) {
                            if (spell.school.name === school) {
                                return true;
                            }
                        }
                    });
                }

                // Filter based on spell.classes (thus the 2 for loops)
                if (classFilters.length > 0) {
                    spellList = spellList.filter((spell) => {
                        for (let spellClass of spell.classes) {
                            for (let className of classFilters) {
                                if (spellClass.name === className) {
                                    return true;
                                }
                            }
                        }
                    });
                }

                /*
                 *  NOTE: I'm not adding the textFilter to the $store... should I?
                 *  Although I guess that argument could be made for the other filters...
                 */
                // Filter based on text input
                if (this.textFilter) {
                    spellList = spellList.filter((spell) => {
                        return spell.name.toUpperCase().indexOf(this.textFilter.toUpperCase()) > -1;
                    });
                }

                this.$store.dispatch('setFilteredSpells', spellList);
            }
        }
    }
</script>

<style>
    #spellFilters {
        padding: 5px;
    }
    #filterHeaderLabel {
        font-size: 20px;
        text-decoration: underline;
    }
    .filterToolbar {
        padding-left: 30px;
        padding-bottom: 1px;
    }
    .filterLabel {
        font-weight: bold;
        padding-top: 10px;
        padding-right: 5px;
        width: 70px;
    }
    .btn {
        text-align: center;
    }
    #searchbar {
        padding-top: 10px;
    }
    @media screen and (max-width: 600px) {
        #filterHeaderLabel {
            display: none;
        }
        .filterLabel {
            display: none;
        }
    }
</style>