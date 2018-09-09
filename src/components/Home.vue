<template>
    <div class="col-md-4">
        <div class="card" style="width: 30rem;">
            <div class="card-body">
                <h1 class="card-title">{{ name }}</h1>
                <h6 class="card-subtitle mb-2 text-muted">{{ levelSchool }}</h6>
                <div class="card-text">
                    <span><b>Casting Time:</b> {{ castingTime }}</span>
                    <br>
                    <span><b>Range:</b> {{ range }}</span>
                    <br>
                    <span><b>Components:</b> {{ components }}</span>
                    <br>
                    <span><b>Duration:</b> {{ duration }}</span>
                    <br>
                    <span><b>Classes: </b> {{ classes }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: "Fireball",
                levelSchool: "3rd Level Evocation",
                castingTime: "1 Action",
                range: "150 feet",
                components: "V S M (A tiny ball of bat guano and sulfur)",
                duration: "Instantaneous",
                classes: "Sorcerer, Wizard"
            }
        }
    }
</script>

<style>

</style>
