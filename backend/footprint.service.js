import footprintClient from './footprint.client.js'

export default {
  async getAllCountryEmissions () {
    const countries = await footprintClient.getCountries()

    const countriesPeriods = await Promise.all(
      countries.map((country) =>
        footprintClient.getDataForCountry(country.countryCode)
      )
    )

    return countriesPeriods.flat().map(response => response.data).reduce((period, acc) => {
      if (!(period.year in acc)) {
        acc[period.year] = []
      }

      acc[period.year].push({
        name: period.countryName,
        emissions: 'carbon' in period ? period.carbon : null
      })

      return acc
    }, {})
  }
}
