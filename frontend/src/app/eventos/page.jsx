"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./eventos.css";
import CardEvento from "../components/CardEvento";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Eventos() {
    const [eventos, setEventos] = useState([]);
    const [msgErro, setMsgErro] = useState("");

    useEffect(() => {
        fetch("http://localhost:3001/api/eventos")
            .then((res) => res.json())
            .then((data) => {
                setEventos(data);
                setMsgErro("");
            })
            .catch((erro) => {
                console.log("Erro ao buscar eventos:", erro);
            });

    }, []);

    return (
        <main>
            <div className="container">
                <div className="topo">
                    {/* Colocar a Logo */}
                    <h1 className="fw-semibold">FUTMANIA</h1> <hr />
                </div>

                <div className="container-cards">
                    {
                        eventos.map(e => {
                            return <CardEvento key={e.id} evento={e} />
                        })
                    }
                </div>
            </div>
        </main>
    )
}