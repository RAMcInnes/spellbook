import Home from './components/Home.vue';
import AllSpells from './components/Spells.vue';
import CreateASpell from './components/CreateASpell.vue';

export const routes = [
    { path: '/', component: Home },
    { path: '/spells', component: AllSpells },
    { path: '/createASpell', component: CreateASpell },
];