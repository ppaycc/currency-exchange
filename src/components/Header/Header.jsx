import style from "./header.module.css";
import {currencyIcons} from "../../utils/constant";

export const Header = ({rates, baseCurrency}) => {

    const getRates = () => {
        if(!rates) {
            return null;
        }
        const components = [];

        for (let c in rates) {
            components.push(
                <div key={c} className={style.rate}>
                    {currencyIcons[c]}{rates[c]}
                </div>
            )
        }

        return components;
    }

    return (
        <header className={style.header}>
            {rates && (
                <>
                    1{currencyIcons[baseCurrency]} is:
                    {getRates()}
                </>
            )}
            {!rates && (
                <span>Loading...</span>
            )}
        </header>
    )
}