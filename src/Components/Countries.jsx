import { useEffect, useState } from 'react';
import styles from './Countries.module.css'

const CountryCard = ({ name, flag }) => {
    return (
        <div className={styles.countryCard}>
            <img src={flag} alt={name} className={styles.flagImage} />
            <p className={styles.countryName}>{name}</p>
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
            <div className={styles.inputDiv}>
                <input type='text' placeholder='Search for countries...' value={country} onChange={(event) => changeHandler(event)} className={styles.inputField} />
            </div>
            <br />
            <div className={styles.countriesPage}>
                {!searchCountry.length ? <h1>Country not found</h1> : searchCountry.map((ele) => <CountryCard name={ele.name.common} flag={ele.flags.png} key={ele.cca3} />)}
            </div>
        </>
    )
}