<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="navbar-header">
            <router-link to="/" class="navbar-brand">My Spellbooks</router-link>
        </div>
        <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="/spells">All Spells</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/createASpell">Create-A-Spells</a>
                </li>
            </ul>   
        </div>
    </nav>
</template>

<script>
    export default {
     
    }
</script>