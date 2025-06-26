<template>
  <div class="Stat">
    <span class="Stat__heading"><slot name="name"></slot></span>
    <span class="Stat__figure"><slot name="figure"></slot></span>
  </div>
</template>

<style lang="scss" scoped>
.Stat__heading,
.Stat__figure {
  display: block;
  text-align: center;
}

.Stat__heading {
  font-weight: 300;
  color: #808080;
  font-size: 1.2rem;
}

.Stat__figure {
  font-size: 3rem;
  font-weight: 600;
  color: #0f6e6e;
}
</style>
