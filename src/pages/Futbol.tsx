import { useEffect, useState } from "react"
import PageHeader from "../components/PageHeader"
interface Country {
    name: string;
    code: string;
    flag: string;
}
interface League {
    name: string;
    type: string;
    logo: string;
}
interface Season {
    year: number;
    start: string;
    end: string;
}

interface FootballLeague {
    league: League;
    country: Country;
    seasons: Season[];
}
function Futbol() {
    const [listaFootballLeague, setListaFootballLeague] = useState<FootballLeague[]>([])

    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        var myHeaders = new Headers();
        myHeaders.append("x-rapidapi-key", "e6548ee894e9ddfa84d8990c818378cd");
        myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

        var requestOptions: RequestInit = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://v3.football.api-sports.io/leagues", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setListaFootballLeague(result.response)
            })
            .catch(error => console.log('error', error));
    }

    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>País</th>
                        <th>Bandera</th>
                        <th>Liga</th>
                        <th>Tipo</th>
                        <th>Logo</th>
                        <th>Temporadas</th>
                    </tr>
                </thead>
                <tbody>
                    {listaFootballLeague.map((item, index) =>
                        <tr key={index}>
                            <td>{item.country.name}</td>
                            <td><img src={item.country.flag} alt="" className="imagen-futbol"/></td>
                            <td>{item.league.name}</td>
                            <td>{item.league.type}</td>
                            <td><img src={item.league.logo} alt="" className="imagen-futbol"/></td>
                            <td>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Año</th>
                                            <th>Inicio</th>
                                            <th>Fin</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item.seasons.map((season, index) =>
                                            <tr key={index}>
                                                <td>{season.year}</td>
                                                <td>{season.start}</td>
                                                <td>{season.end}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    return (
        <>
            <PageHeader titulo="Fútbol" />
            <section className="padded">
                <div className="container">
                    {dibujarTabla()}
                </div>
            </section>
        </>
    )
}

export default Futbol