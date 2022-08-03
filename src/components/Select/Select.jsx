import style from "./select.module.css";
import {useEffect, useState} from "react";

export const Select = ({useValue, useCurrency, optionValues, onChangeValue, onChangeCurrency}) => {
    const [value, setValue] = useState(useValue || 0);
    const [currency, setCurrency] = useState("");

    useEffect(() => {
        setValue(useValue);
    }, [useValue]);

    useEffect(() => {
        setCurrency(useCurrency);
    }, [useCurrency]);

    const handleOnChangeValue = ({target}) => {
        const newValue = target.value
        setValue(newValue);
        onChangeValue(newValue);
    }

    const handleOnChangeCurrency = ({target}) => {
        const newCurrency = target.value;
        setCurrency(newCurrency);
        onChangeCurrency(newCurrency);
    }

    return (
        <div className={style.block}>
            <input type="number" onChange={handleOnChangeValue} value={value}/>
            <select value={currency} onChange={handleOnChangeCurrency}>
                <option disabled hidden value={""}></option>
                {optionValues?.map(({key, value}) => (
                    <option  key={key} value={value}>{key}</option>
                ))}
            </select>
        </div>
    )
}