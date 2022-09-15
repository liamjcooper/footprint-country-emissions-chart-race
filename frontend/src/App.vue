<script setup>
import Chart from "./components/Chart.vue";
import Container from "./components/Container.vue";
import Stat from "./components/Stat.vue";
</script>

<template>
  <main>
    <Container>
      <h1 class="title">Historic global carbon footprint</h1>

      <div class="stats">
        <Stat>
          <template #name>year</template>
          <template #figure>2000</template>
        </Stat>

        <Stat>
          <template #name>global total</template>
          <template #figure>23200</template>
        </Stat>
      </div>

      <Chart />

      <small class="attribution">
        data source:
        <a
          href="https://data.footprintnetwork.org"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          https://data.footprintnetwork.org
        </a>
      </small>
    </Container>
  </main>
</template>

<style lang="scss" scoped>
.title {
  font-size: 2.6rem;
  font-weight: 600;
  text-align: center;
  margin-top: 5rem;
}

.stats {
  display: flex;
  justify-content: space-evenly;
  margin-top: 4rem;
}

.attribution {
  display: block;
  text-align: center;
  margin-top: 2rem;
}

.Chart {
  margin-top: 2rem;
}
</style>
