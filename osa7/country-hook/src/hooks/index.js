import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'https://restcountries.eu/rest/v2/name'

export const useCountry = (name) => {
    const [country, setCountry] = useState({})
    const [found, setFound] = useState(false)
    useEffect(() => {
        name ? axios.get(`${baseUrl}/${name}`)
            .then(countryData => {
                if (countryData && countryData.data && countryData.data[0]) {
                    setFound(true)
                    setCountry(countryData.data[0])
                }
            }) : setFound(false)
    }, [name])
    return {
        data: country,
        found
    }
}