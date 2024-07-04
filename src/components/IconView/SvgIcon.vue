<template>
    <svg :style="{width,height}">
      <use :xlink:href=" prefix + name"</use>
    </svg>
</template>

<script setup lang="ts">

defineProps({
  // 图标前缀
  prefix: {
    type: String,
    default: '#icon-'
  },
  // 图标名称
  name: {
    type: String
  },
  width:{
    type: String,
    default: '20px'
  },
  height:{
    type: String,
    default: '20px'
  }
})

</script>

