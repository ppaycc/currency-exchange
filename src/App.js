import {Header} from "./components/Header/Header";
import {useEffect, useState} from "react";
import {baseCurrency} from "./utils/constant";
import {getLatest} from "./services/api";
import {Main} from "./components/Main/Main";

function App() {
    const [rates, setRates] = useState(null);

    const getLatestAsync = async () => {
        const response = await getLatest();
        if(response.success) {
            setRates(response.rates);
        }
    }

    useEffect(() => {
        getLatestAsync();
    }, []);

    return (
        <div className="App">
             <Header rates={rates} baseCurrency={baseCurrency}/>
             <Main/>
        </div>
    );
}

export default App;
