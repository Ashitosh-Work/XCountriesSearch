import { useEffect, useState } from 'react';
import './Countries.css'

const CountryCard = ({ name, flag }) => {
    return (
        <div className='countryCard'>
            <img src={flag} alt={name} className='flagImage' />
            <p className='countryName'>{name}</p>
        </div>
    )
}

export default function Countries() {

    let URL = 'https://restcountries.com/v3.1/all';
    let [data, setData] = useState([]);
    let [country, setCountry] = useState("");
    let [searchCountry, setSearchCountry] = useState([]);

    const changeHandler = (event) => {
        let searchTerm = (event.target.value).toLowerCase();
        console.log(searchTerm);
        setCountry(searchTerm);
        setSearchCountry(data.filter(ele => ele.name.common.toLowerCase().includes(searchTerm)));
    }

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                let response = await fetch(URL);
                let data = await response.json();
                setData(data);
                setSearchCountry(data);

            } catch (error) {
                console.error(`Error fetching data:${error}`)
            }
        }
        fetchCountries();
    }, [])

    return (
        <>
            <div className='inputDiv'>
                <input type='text' placeholder='Search for countries...' value={country} onChange={(event) => changeHandler(event)} className='inputField' />
            </div>
            <br />
            <div className='countriesPage'>
                {!searchCountry.length ? <h1>Country not found</h1> : searchCountry.map((ele) => <CountryCard name={ele.name.common} flag={ele.flags.png} key={ele.cca3} />)}
            </div>
        </>
    )
}