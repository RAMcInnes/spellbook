import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        hasLoadedAllSpells: false,
        allSpells: [],
        mySpells: [],
    },
    getters: {
        hasLoadedAllSpells: (state ) => {
            return state.hasLoadedAllSpells;
        },
        allSpells: (state) => {
            return state.allSpells;
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
        'ADD_SPELL_TO_MYSPELLS'(state, spell) {
            state.mySpells.push(spell);
        },
    },
    actions: {
        setHasLoaded: (context, hasLoaded) => {
            context.commit("SET_HAS_LOADED_ALL_SPELLS", hasLoaded);
        },
        loadSpells: (context) => {
            Vue.http.get('http://www.dnd5eapi.co/api/spells')
                .then(response => response.json())
                .then(spells => {
                    for (let spell of spells.results) {
                        Vue.http.get(spell.url)
                            .then(response => response.json())
                            .then(spell => {
                                context.commit('ADD_SPELL_TO_ALLSPELLS', spell);
                        });
                    }
            });
        },
        addSpelltoMySpellbook: (context, spell) => {
            context.commit('ADD_SPELL_TO_MYSPELLS', spell);
        }
    }
});