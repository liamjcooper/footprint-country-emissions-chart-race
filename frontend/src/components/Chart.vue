<template>
  <div class="Chart">
    <svg></svg>
  </div>
</template>

<script setup>
import * as d3 from 'd3'
import { computed, onMounted, ref, toRefs, watch } from 'vue'

const props = defineProps({ data: { type: Array, default: () => [] } })
const { data } = toRefs(props)
const sorted = computed(() =>
  data.value.toSorted((a, b) => b.emissions - a.emissions)
)

const width = 960
const height = 5000
const margin = 300

const svg = ref()
const countryScale = ref()
const countryAxis = ref()
const emissionsScale = ref()

const update = (data) => {
  countryScale.value.domain(data.map((country) => country.name))
  emissionsScale.value.domain([0, data[0].emissions])

  const bars = svg.value.selectAll('.bar').data(data)

  bars
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', margin)
    .attr('y', (country) => countryScale.value(country.name))
    .attr('height', () => countryScale.value.bandwidth())
    .attr('rx', '3px')
    .attr('ry', '3px')
    .merge(bars)
    .transition()
    .attr('y', (country) => countryScale.value(country.name))
    .attr('width', (country) => emissionsScale.value(country.emissions))

  const emissionsLabels = svg.value.selectAll('.emissionsLabel').data(data)

  emissionsLabels
    .enter()
    .append('text')
    .attr('class', 'emissionsLabel')
    .attr('x', width - margin)
    .attr(
      'y',
      (country) =>
        countryScale.value(country.name) +
        countryScale.value.bandwidth() / 2 +
        5
    )
    .merge(emissionsLabels)
    .transition()
    .attr(
      'y',
      (country) =>
        countryScale.value(country.name) +
        countryScale.value.bandwidth() / 2 +
        5
    )
    .text((country) => country.emissions?.toPrecision(5) || 'N/A')

  svg.value.select('.yAxis').transition().call(countryAxis.value)
}

onMounted(() => {
  svg.value = d3.select('svg').attr('width', width).attr('height', height)

  countryScale.value = d3
    .scaleBand()
    .range([0, height - margin])
    .padding(0.5)
  emissionsScale.value = d3.scaleLinear().range([0, width - margin * 2 - 20])

  countryAxis.value = d3
    .axisLeft(countryScale.value)
    .tickSize(0)
    .tickPadding(20)

  svg.value
    .append('g')
    .attr('transform', `translate(${margin}, 0)`)
    .attr('class', 'yAxis')
    .call(countryAxis.value)

  update(sorted.value)

  watch(sorted, update)
})
</script>

<style>
.yAxis path {
  stroke: none;
}

text {
  font-family: "Inter";
  font-size: 0.8rem;
  font-weight: 600;
}

rect.bar {
  fill: #9dd7e5;
}
</style>
