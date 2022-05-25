import axios from "axios";

export const getCountries = () => {
    (async () => {
        //get countries list
        let countries = {};
         async function getCountriesList() {
             const options1 = {
                 method: "GET",
                 url: "https://countries-cities.p.rapidapi.com/location/country/list",
                 headers: {
                     "X-RapidAPI-Host": "countries-cities.p.rapidapi.com",
                     "X-RapidAPI-Key": "90deae9181msh51f709209670134p1a63f4jsn76e9a2950e9d",
                 },
             };
             const response = await axios.request(options1);
             countries = response.data.countries;
         }
         await getCountriesList();
        console.log(countries);
    })();
}
getCountries()