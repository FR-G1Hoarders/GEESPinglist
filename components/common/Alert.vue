<template>
  <div class="mt-3 bg-indigo-300 text-indigo-800 text-left rounded-lg flex">
    <div class="text-2xl bg-indigo-800 text-indigo-300 rounded rounded-r-none font-bold p-5 flex items-center">
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
