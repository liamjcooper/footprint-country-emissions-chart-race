import axios from 'axios'

export default {
  get (apiUrl) {
    return axios.get(apiUrl, {
      auth: {
        username: 'any-user-name',
        password: process.env.API_KEY
      }
    })
  },

  async getCountries () {
    return this.get(
      'https://api.footprintnetwork.org/v1/countries'
    )
  },

  async getDataForCountry (countryCode) {
    return this.get(
      `https://api.footprintnetwork.org/v1/data/${countryCode}/all/EFCpc`
    )
  }
}
