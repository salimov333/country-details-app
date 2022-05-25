#!/usr/bin/env node

import axios from "axios";
import { countries } from "./export/countries-obj.js";
import dotenv from "dotenv"
dotenv.config();


//import { getCountries } from "./export/get-countries.js";
//using getCountries() to get the countries list from the API causes an error
//Error: 'You have exceeded the rate limit per second for your plan, BASIC, by the API provider'
//getCountries();


//Returns capital city, languages, continent, area, population, phone code,Total cities, timezone, currency of the country
const getDetails = () => {
    (async () => {
        let code = "";
        for (const key in countries) {
            const arg = process.argv.slice(2).join(" ").toLowerCase();
            const value = countries[key].toLowerCase();
            if (arg == value) {
                code = key;
            }
        }
        //get countries details
        async function getCountriesDetails() {
            let details = {};
            const API_KEY = process.env.RapidAPI_Key;
            //console.log(API_KEY);
            const options2 = {
                method: 'GET',
                url: `https://countries-cities.p.rapidapi.com/location/country/${code}`,
                headers: {
                    'X-RapidAPI-Host': 'countries-cities.p.rapidapi.com',
                    'X-RapidAPI-Key': `${API_KEY}`
                }
            };
            const response = await axios.request(options2);
            details = response.data;
            //console.log(details);
            //const flag = details.flag.file; //svg absolute path
            const countryName = details.name;
            const emoji = details.flag.emoji;
            const capitalCity = details.capital.name;
            const lang = Object.values(details.languages).map(el => el.includes("language") || el.includes("languages") ? el.slice(0, el.indexOf(" ")) : el);
            const continent = details.continent.name;
            const areaSize = details.area_size;
            const population = details.population;
            const phoneCode = details.phone_code;
            const totalCities = details.total_cities;
            const timezone = details.timezone.timezone;
            const currency = details.currency.name;
            
            const result = `Country: ${countryName} ${emoji}\nCapital City: ${capitalCity}\nLanguages: ${lang}\nContinent: ${continent}\nArea = ${areaSize}\npopulation = ${population}\nPhonecode: +${phoneCode}\nTotal Cities = ${totalCities}\nTimezone: ${timezone}\nCurrency: ${currency}`;
            console.log(result);
        }
        await getCountriesDetails();
    })();
}
getDetails();