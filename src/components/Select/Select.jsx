import style from "./select.module.css";

export const Select = ({useValue, useCurrency, optionValues, onChangeValue}) => {
    const handleOnChangeValue = ({target}) => {
        const newValue = target.value
        onChangeValue({value: newValue, currency: useCurrency});
    }

    const handleOnChangeCurrency = ({target}) => {
        const newCurrency = target.value;
        onChangeValue({value: useValue, currency: newCurrency});
    }

    return (
        <div className={style.block}>
            <input type="number" onChange={handleOnChangeValue} value={useValue}/>
            <select value={useCurrency} onChange={handleOnChangeCurrency}>
                {optionValues?.map(({key, value}) => (
                    <option  key={key} value={value}>{key}</option>
                ))}
            </select>
        </div>
    )
}