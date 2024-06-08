import React, { useState } from "react";
import {AsyncPaginate} from 'react-select-async-paginate'
import { GeoApioptions,GEO_API_URL } from "../../Api";


const Search = ({onSearchChange}) => {

    const [search,SetSearch] = useState(null);

    const handleOnchange = (searchData) => {
        SetSearch(searchData);
        onSearchChange(searchData);
    }

    const loadOptions = (inputValue) => {
        return fetch(
            `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
            GeoApioptions
        )
        .then((response) => response.json())
        .then((response) => {
            return {
                options: response.data.map((city) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`,
                    };
                }),
            };
        });
    };
    



    return(

        <AsyncPaginate 
        placeholder="search cities"
        debounceTimeout={600}
        value={search}
        onChange={handleOnchange}
        loadOptions={loadOptions}


        />
    )

}

export default Search;