import './search.scss'
import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";
import { useTranslation } from 'react-i18next';

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
        return fetch(
            `${GEO_API_URL}/cities?minPopulation=5000&namePrefix=${inputValue}`,
            geoApiOptions
        )
            .then(response => response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        }
                    })
                }
            })
            .catch(err => console.error(err));
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
    }

    const handleOnSearchChange = () => {
        if (search && search.value && search.label) {
            onSearchChange(search);
        } else {
            alert('Input is empty')
        }
    }

    const { t } = useTranslation();

    return (
        <section className="section">
            <div className="container search">
                <AsyncPaginate
                    placeholder={t("search.placeholder")}
                    debounceTimeout={600}
                    value={search}
                    onChange={handleOnChange}
                    loadOptions={loadOptions}
                    className="search__input"
                />
                <button className="search__button" onClick={handleOnSearchChange}>{t("button.Add")}</button>
            </div>
        </section>
    )
}

export default Search;