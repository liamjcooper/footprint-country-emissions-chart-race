<script setup>
import * as d3 from "d3";
import { onMounted } from "vue";

const props = defineProps({ data: Array });
const sorted = props.data.sort((a, b) => b.emissions - a.emissions);

onMounted(() => {
  const width = 600;
  const height = 5000;
  const margin = 200;

  // root SVG element
  const svg = d3.select("svg").attr("width", width).attr("height", height);

  // axes
  const emissionsAxis = d3
    .scaleLinear()
    .domain([0, sorted[0].emissions])
    .range([0, width - margin]);
  const countryAxis = d3
    .scaleBand()
    .domain(sorted.map((country) => country.name))
    .range([0, height - margin]);

  svg
    .append("g")
    .attr("transform", `translate(${margin}, ${height - margin})`)
    .call(d3.axisBottom(emissionsAxis));

  svg
    .append("g")
    .attr("transform", `translate(${margin}, 0)`)
    .call(d3.axisLeft(countryAxis));

  // bar config
  svg
    .selectAll("rect")
    .data(sorted)
    .enter()
    .append("rect")
    .attr("x", margin)
    .attr("y", (country) => countryAxis(country.name))
    .attr("width", (country) => emissionsAxis(country.emissions))
    .attr("height", () => countryAxis.bandwidth())
    .attr("fill", "#9dd7e5");
});
</script>

<template>
  <div class="Chart">
    <svg />
  </div>
</template>
