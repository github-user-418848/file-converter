<template>
    <div class="card">
        <label for="rdo_code">RDO Code: </label>
        <input type="text" name="rdo_code" id="rdo_code">
    </div>
</template>

<script>

export default {
    name: "RdoInputCard",
}

</script>

<style>
.card {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: .8rem;
    max-width: clamp(12.5rem, 12.5rem + 26.0417vw, 43.75rem);
    width: 100%;
    margin: 0 auto;
    justify-content: space-between;
    border: 1.5px solid lightgray;
}

input {
    background-color: white;
    color: black;
    outline: none;
    border: 1px solid rgb(124, 124, 124);
    padding: 10px;
    width: 65%;
}
</style>