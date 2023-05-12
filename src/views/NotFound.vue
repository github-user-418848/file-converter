<template>
    <div class="not-found">
        <h2>Not Found</h2>
        <a href="/">Return to main page</a>
    </div>
</template>
<script>
    export default {
        name: 'NotFound',
    }
</script>
<style>

.not-found {
    min-height: 320px;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border: 1px solid lightgray;
    margin: 1rem auto .5rem;
    max-width: clamp(12.5rem, 12.5rem + 26.0417vw, 43.75rem);
}

</style>