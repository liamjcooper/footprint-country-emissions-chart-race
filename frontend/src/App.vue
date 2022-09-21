<script setup>
import Chart from "./components/Chart.vue";
import Container from "./components/Container.vue";
import Stat from "./components/Stat.vue";
import axios from "axios";
</script>

<template>
  <main>
    <Container>
      <h1 class="title">Historic global carbon footprint</h1>

      <div class="stats">
        <Stat>
          <template #name>year</template>
          <template #figure>
            {{ years.length ? years[currentYearIndex] : "--" }}
          </template>
        </Stat>

        <Stat>
          <template #name>global total</template>
          <template #figure>{{
            totalEmissions.length
              ? Math.round(totalEmissions[currentYearIndex])
              : "--"
          }}</template>
        </Stat>
      </div>

      <div class="ChartHolder">
        <p v-if="loading">Loading data...</p>
        <p v-else-if="errored">
          There was an error loading the chart data. Please check console for
          details.
        </p>
        <Chart v-else :data="data[years[currentYearIndex]]" />
      </div>

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

<script>
export default {
  data() {
    return {
      data: {},
      years: [],
      totalEmissions: [],
      currentYearIndex: 0,
      loading: false,
      errored: false,
    };
  },

  async created() {
    this.loading = true;
    await this.fetchData();
    this.years = Object.keys(this.data);
    this.totalEmissions = Object.values(this.data).map((year) => {
      const emissions = year.map((country) => country.emissions);

      return emissions.reduce((carry, value) => (carry += value), 0);
    });
    this.loading = false;
    this.start();
  },

  methods: {
    async fetchData() {
      const { data } = await axios.get(
        "http://127.0.0.1:8000/countries/all/emissions"
      );

      this.data = data;
    },
    start() {
      const yearsInterval = setInterval(() => {
        if (this.years[this.currentYearIndex + 1] !== undefined) {
          this.currentYearIndex++;
        } else {
          clearInterval(yearsInterval);
        }
      }, 1000);
    },
  },
};
</script>

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

.ChartHolder {
  margin-top: 2rem;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #e6e6e6;
  padding: 2rem;

  p {
    text-align: center;
  }
}
</style>
