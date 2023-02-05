import { defineStore } from "pinia";
import axios from "axios";

export const useCountryStore = defineStore({
    id: "countryStore",
    state: () => ({
        countries: [],
        country: null,
        ascending: true,
    }),
    getters: {
        hasCountries: (state) => {
            return state.countries.length > 0;
        },
        hasCountry: (state) => {
            return state.country != null;
        },
    },
    actions: {
        async getCountries() {
            this.countries = [];

            axios
                .get("https://restcountries.com/v3.1/all")
                .then((response) => {
                    if (response.status === 200) {
                        let countries = [];

                        countries = response.data;
                        this.countries = countries.sort((a: any, b: any) => {
                            if (a.name.official < b.name.official) return -1;
                            if (a.name.official > b.name.official) return 1;
                            return 0;
                        });

                        if (!this.ascending) countries.reverse();

                        return (this.countries = countries);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async getCountry(name: string) {
            axios
                .get(`https://restcountries.com/v3.1/name/${name}`)
                .then((response) => {
                    if (response.status === 200) {
                        this.country = response.data;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
});
