<template>
  <div class="mt-3 bg-pink-700 text-pink-200 text-left rounded-lg flex border-pink-800">
    <div class="text-2xl bg-pink-800 text-pink-300 rounded-lg rounded-r-none font-bold p-5 flex items-center">
      <span>!</span>
    </div>
    <div class="p-3 flex-1">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Alert',
  }
</script>
