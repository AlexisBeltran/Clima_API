import AppClima from "./components/AppClima"
import ClimaProvider from "./context/ClimaProvider"


//FUNTION APP
function App() {
  return (
    <ClimaProvider>
      <header>
        <h1>Buscador de Clima</h1>
      </header>
      <AppClima/>
    </ClimaProvider>
  )
}

export default App
