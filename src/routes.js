import Spellbooks from './components/Spellbooks.vue';
import MySpellbook from './components/MySpellbook.vue';
import SpellLibrary from './components/SpellLibrary.vue';

export const routes = [
    { path: '/', component: Spellbooks },
    { path: '/mySpellbook', component: MySpellbook },
    { path: '/spellLibrary', component: SpellLibrary },
];