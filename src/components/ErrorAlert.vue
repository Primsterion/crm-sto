<template>
  <div class="error-alert">
        <p>{{text}}</p>
    </div>
</template>

<script>
export default {
    name: 'ErrorAlert',
    props: {
        text: String
    }
}
</script>

<style>
    .error-alert{
        width: 100%;
        background-color: rgb(226, 76, 76);
        color: #fff;
        border: 1px solid #e00;
        padding-left: 20px;
    }
</style>