import style from "./main.module.css";
import {Select} from "../Select/Select";
import {baseCurrency, currency, currencyIcons} from "../../utils/constant";
import {useState} from "react";
import {getConvert} from "../../services/api";

export const Main = () => {
    const [error, setError] = useState("");
    const [state, setState] = useState({
        valueFrom: 1,
        currencyFrom: baseCurrency,
        valueTo: 1,
        currencyTo: currency.USD
    });

    const getInitialValues = () => {
        return Object.keys(currency).map(c => ({
            key: `${c} ${currencyIcons[c]}`,
            value: currency[c]
        }))
    }

    const getConvertAsync = async ({from, to, amount = 1}) => {
        const result  = await getConvert({from, to, amount: parseFloat(amount)});
        if(result.success) {
            updateData(result.result, state.currencyFrom === from);
        } else {
            setError(result.error.message);
        }
    }

    const onChangeCurrencyFrom = (currency) => {
        setState((state) => ({
            ...state,
            currencyFrom: currency
        }));

        getConvertAsync({amount: state.valueFrom, from: currency, to: state.currencyTo})
    }

    const onChangeCurrencyTo = currency => {
        setState((state) => ({
            ...state,
            currencyTo: currency
        }));

        getConvertAsync({amount: state.valueTo, from: currency, to: state.currencyFrom})
    }

    const onChangeValueFrom = value => {
        setState((state) => ({
            ...state,
            valueFrom: value
        }));

        getConvertAsync({from: state.currencyFrom, to: state.currencyTo, amount: value});
    }

    const onChangeValueTo = value => {
        setState((state) => ({
            ...state,
            valueTo: value
        }));

        getConvertAsync({from: state.currencyTo, to: state.currencyFrom, amount: value});
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
                optionValues={getInitialValues()}
                onChangeCurrency={onChangeCurrencyFrom}
                onChangeValue={onChangeValueFrom}
                useValue={state.valueFrom}
                useCurrency={state.currencyFrom}
            />
            <Select
                optionValues={getInitialValues()}
                onChangeCurrency={onChangeCurrencyTo}
                onChangeValue={onChangeValueTo}
                useValue={state.valueTo}
                useCurrency={state.currencyTo}
            />
        </section>
    )
}