<style scoped>
    .demo {
        background-color: blue;
    }
</style>

<script>
    export default {
        name: 'First Component',
        props: {
            msg: String
        }
    }
</script>

<template>
    <div class="demo">
        <h1>{{msg}}</h1>
    </div>
</template>