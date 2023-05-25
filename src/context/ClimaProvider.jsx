import { createContext, useEffect, useState } from "react"
import axios from "axios";

const ClimaContext = createContext();

const ClimaProvider = ({children}) => {
    const [busqueda, setBusqueda] = useState({
        ciudad: "",
        pais: "",
        clickedSubmit: false
    });
    const [resultado, setResultado] = useState({});
    const [cargando, setCargando] = useState(false);
    const [noResultado, setNoResultado] = useState(false);

    const datosBusqueda = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    const setDatosBusqueda = bool => {
        setBusqueda({
            ...busqueda, 
            clickedSubmit: bool
        });
    }

    //REQUEST METHOD
    useEffect(() => {
        const getWeather = async data => {
            setCargando(true)
            setNoResultado(false)
            try{
                const {ciudad, pais} = data;
                const data_info = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=a83a1731bae2da8735c3fce2e3b2ebf9`);
                if(data_info.data.length !== 0){
                    const {lat, lon} = data_info.data[0]
                    //REQUEST DATA INFO
                    const {data: clima} = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a83a1731bae2da8735c3fce2e3b2ebf9`);
                    setResultado(clima);
                }else{
                    setCargando(false);
                    setResultado({});
                    setNoResultado("No se encontraron resultados");
                }
                
            }catch(error){
                setNoResultado("No hay resultados");
            }finally{
                setCargando(false)
            }
        }  
        if(busqueda.ciudad !== "" && busqueda.pais !== "" && busqueda.clickedSubmit === true){
            getWeather(busqueda); 
            setBusqueda(false);
        }

    }, [busqueda]);

  
    return (
        <ClimaContext.Provider 
            value={{
                busqueda,
                datosBusqueda,
                setDatosBusqueda,
                resultado, 
                cargando, 
                noResultado
            }}
        >
            {children}
        </ClimaContext.Provider>
    )
}

export {
    ClimaContext
}

export default ClimaProvider
