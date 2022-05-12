<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
let string;
export default {
  name: 'my-button'
}
</script>

<style scoped>
.btn {
  border: 1px solid darkcyan;
  padding: 10px 10px;
  background: none;
  color: darkgrey;
}
</style>