<template>
    <div id="spellFilters">
        <span id="filterHeaderLabel">Filters</span>
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
            </div>
        </div>
        <div class="btn-toolbar filterToolbar" role="toolbar">
            <span class="filterLabel">Classes:</span>
            <div class="btn-group mr-2" role="group">
                <button type="button" class="btn" @click="addFilter($event, {className:'Bard'})">Bard</button>
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
                <input type="search" class="form-control" id="search" placeholder="Spell Name...">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                spells: this.$store.getters.allSpells,
                filteredSpells: []
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

                this.applyFilter();
            },
            applyFilter() {
                const levelFilters = this.$store.getters.levelFilter;
                const schoolFilters = this.$store.getters.schoolFilter;
                const classFilters = this.$store.getters.classFilter;

                // Use filteredSpells unless it is empty, then use allSpells as base.
                const spellList = this.$store.getters.filteredSpells.length > 0 ? this.$store.getters.filteredSpells.slice(0) : this.$store.getters.allSpells.slice(0);
                let filterList = [];


                // ONLY USE APPLY FILTER WHEN NEEDED (spellList vs filterList?)


                // eslint-disable-next-line
                console.log("---INIT---", filterList);


                // Filter based on spell.level
                if (levelFilters.length > 0) {
                    // I'm referencing spellList here. This is probably a problem. 
                    filterList = spellList.filter((spell) => {
                        for (let level of levelFilters) {
                            if (spell.level === level) {
                                return true;
                            }
                        }
                    });
                }

                // eslint-disable-next-line
                console.log("POST LEVEL",filterList);

                // Filter based on spell.school.name
                if (schoolFilters.length > 0) {
                    filterList = filterList.filter((spell) => {
                        for (let school of schoolFilters) {
                            if (spell.school.name === school) {
                                return true;
                            }
                            return false;
                        }
                    });
                }

                // eslint-disable-next-line
                console.log("POST SCHOOL",filterList);

                if (classFilters.length > 0) {
                     // Filter based on spell.classes (thus the 2 for loops)
                    // CHECK IF 2 FOR LOOPS WORK
                    filterList = filterList.filter((spell) => {
                        for (let className of classFilters) {
                            for (let spellClass of spell.classes) {
                                if (spellClass === className) {
                                    return true;
                                }
                                return false;
                            }
                        }
                    });
                }
                
                // eslint-disable-next-line
                console.log("POST CLASS",filterList);

                this.$store.dispatch('setFilteredSpells', filterList);
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
        width: 65px;
    }
    .btn {
        text-align: center;
    }
    #searchbar {
        padding-top: 10px;
    }
</style>