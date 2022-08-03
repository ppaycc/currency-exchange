import style from "./main.module.css";
import {Select} from "../Select/Select";
import {baseCurrency, currency, currencyIcons} from "../../utils/constant";
import {useState} from "react";
import {getConvert} from "../../services/api";

const getInitialValues = Object
    .keys(currency).map(c => ({
        key: `${c} ${currencyIcons[c]}`,
        value: currency[c]
    }))


export const Main = () => {
    const [error, setError] = useState("");
    const [state, setState] = useState({
        valueFrom: 1,
        currencyFrom: baseCurrency,
        valueTo: 1,
        currencyTo: currency.USD
    });

    const getConvertAsync = async ({from, to, amount = 1}) => {
        const result  = await getConvert({from, to, amount: parseFloat(amount)});
        if(result.success) {
            updateData(result.result, state.currencyFrom === from);
        } else {
            setError(result.error.message);
        }
    }

    const onChangeValueTo = ({currency, value}) => {
        setState((state) => ({
            ...state,
            currencyTo: currency,
            valueTo: value
        }));

        getConvertAsync({from: currency, to: state.currencyFrom, amount: value})
    }

    const onChangeValueFrom = ({value, currency}) => {
        setState((state) => ({
            ...state,
            valueFrom: value,
            currencyFrom: currency
        }));

        getConvertAsync({from: currency, to: state.currencyTo, amount: value});
    }


    const updateData = (amount, isFrom) => {
        if(isFrom) {
            setState(state => ({
                ...state,
                valueTo: amount
            }))
        } else {
            setState(state => ({
                ...state,
                valueFrom: amount
            }))
        }
    }

    return (
        <section className={style.section}>
            {error && (
                <div className={style.error}>{error}</div>
            )}
            <Select
                optionValues={getInitialValues}
                onChangeCurrency={onChangeValueFrom}
                onChangeValue={onChangeValueFrom}
                useValue={state.valueFrom}
                useCurrency={state.currencyFrom}
            />
            <Select
                optionValues={getInitialValues}
                onChangeCurrency={onChangeValueTo}
                onChangeValue={onChangeValueTo}
                useValue={state.valueTo}
                useCurrency={state.currencyTo}
            />
        </section>
    )
}