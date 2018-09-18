import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        hasLoadedAllSpells: false,
        allSpells: [],
        filteredSpells: [],
        levelFilter: [],
        schoolFilter: [],
        classFilter: [],
        mySpells: [],
    },
    getters: {
        hasLoadedAllSpells: (state) => {
            return state.hasLoadedAllSpells;
        },
        allSpells: (state) => {
            return state.allSpells;
        },
        filteredSpells: (state) => {
            return state.filteredSpells;
        },
        levelFilter: (state) => {
            return state.levelFilter;
        },
        schoolFilter: (state) => {
            return state.schoolFilter;
        },
        classFilter: (state) => {
            return state.classFilter;
        },
        mySpells: (state) => {
            return state.mySpells;
        },
    },
    mutations: {
        'SET_HAS_LOADED_ALL_SPELLS'(state, hasLoaded) {
            state.hasLoadedAllSpells = hasLoaded;
        },
        'ADD_SPELL_TO_ALLSPELLS'(state, spell) {
            state.allSpells.push(spell);
        },
        'SET_FILTEREDSPELLS'(state, spells) {
            state.filteredSpells = spells.slice(0);
        },
        'ADD_LEVEL_TO_LEVELFILTER'(state, level) {
            state.levelFilter.push(level);
        },
        'REMOVE_LEVEL_FROM_LEVELFILTER'(state, levelIndex) {
            state.levelFilter.splice(levelIndex, 1);
        },
        'ADD_SCHOOL_TO_SCHOOLFILTER'(state, school) {
            state.schoolFilter.push(school);
        },
        'REMOVE_SCHOOL_FROM_SCHOOLFILTER'(state, schoolIndex) {
            state.schoolFilter.splice(schoolIndex, 1);
        },
        'ADD_CLASS_TO_CLASSFILTER'(state, className) {
            state.classFilter.push(className);
        },
        'REMOVE_CLASS_FROM_CLASSFILTER'(state, classNameIndex) {
            state.classFilter.splice(classNameIndex, 1);
        },
        'ADD_SPELL_TO_MYSPELLS'(state, spell) {
            state.mySpells.push(spell);
        },
    },
    actions: {
        loadAllSpells: (context) => {
            let allPromises = [];
            Vue.http.get('http://www.dnd5eapi.co/api/spells')
                .then(response => response.json())
                .then(spells => {
                    for (let spell of spells.results) {
                        const spellPromise = Vue.http.get(spell.url)
                            .then(response => response.json())
                            .then(spell => {
                                context.commit('ADD_SPELL_TO_ALLSPELLS', spell);
                            });
                        allPromises.push(spellPromise);
                    }
                    // Make sure all ADD_SPELL_TO_ALLSPELLS have been called first
                    Promise.all(allPromises).then(() => {
                        context.commit('SET_HAS_LOADED_ALL_SPELLS', true);
                    });
                });
        },
        setFilteredSpells: (context, spells) => {
            context.commit('SET_FILTEREDSPELLS', spells);
        },
        addLevelToLevelFilter: (context, level) => {
            context.commit('ADD_LEVEL_TO_LEVELFILTER', level);
        },
        removeLevelFromLevelFilter: (context, level) => {
            const levelIndex = context.getters.levelFilter.indexOf(level);
            context.commit('REMOVE_LEVEL_FROM_LEVELFILTER', levelIndex);
        },
        addSchoolToSchoolFilter: (context, school) => {
            context.commit('ADD_SCHOOL_TO_SCHOOLFILTER', school);
        },
        removeSchoolFromSchoolFilter: (context, school) => {
            const schoolIndex = context.getters.schoollFilter.indexOf(school);
            context.commit('REMOVE_SCHOOL_FROM_SCHOOLFILTER', schoolIndex);
        },
        addClassToClassFilter: (context, className) => {
            context.commit('ADD_CLASS_TO_CLASSFILTER', className);
        },
        removeClassFromClassFilter: (context, className) => {
            const classNameIndex = context.getters.classFilter.indexOf(className);
            context.commit('REMOVE_CLASS_FROM_CLASSFILTER', classNameIndex);
        },
        addSpellToMySpellbook: (context, spell) => {
            context.commit('ADD_SPELL_TO_MYSPELLS', spell);
        }
    }
});