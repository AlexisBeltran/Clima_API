import Formulario from './Formulario'
import useClima from '../hooks/UseClima'
import Loading from './Loading';
import Resultado from './Resultado';

const AppClima = () => {

  const {resultado, cargando, noResultado} = useClima();
  
  console.log("resultado: ",resultado);

  return (
    <>
        <main className='dos-columnas'>
            <Formulario/>
            {
              cargando ? <Loading /> : 
              resultado?.name ? <Resultado/> : 
              noResultado ? <p>{noResultado}</p>
              : <p>El clima se va a mostrar aquí</p>
            }
        </main>
    </>
  )
}

export default AppClima
