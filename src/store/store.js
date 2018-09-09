import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        spells: [],
    },
    getters: {
        spells: (state) => {
            return state.spells;
        }
    },
    mutations: {
        'SET_SPELLS'(state, spells) {
            state.spells = spells;
        },
        'ADD_SPELL'(state, spell) {
            state.spells.push(spell);
        },
    },
    actions: {
        loadSpells: (context) => {
            Vue.http.get('http://www.dnd5eapi.co/api/spells')
                .then(response => response.json())
                .then(spells => {
                    for (let spell of spells.results) {
                        Vue.http.get(spell.url)
                            .then(response => response.json())
                            .then(spell => {
                                context.commit('ADD_SPELL', spell);
                        });
                    }
            });
        }
    }
});