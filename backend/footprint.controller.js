import { Router } from 'express'
import footprintService from './footprint.service.js'
import axios from 'axios'

const router = Router()

router.get('/countries/all', async (req, res) => {
  try {
    const results = await footprintService.getAllCountryEmissions()
    res.send(results)
  } catch (e) {
    console.error(e)
    if (axios.isAxiosError(e)) {
      res.status(500).send(`External service responded with error code: ${e.response.status} and message: ${JSON.stringify(e.response.data)}`)
    } else {
      res.send(e.message)
    }
  }
})

export default router
