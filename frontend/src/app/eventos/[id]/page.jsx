"use client";

import "./produto.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Evento() {
    const [evento, setEvento] = useState(null);
    const params = useParams();

    useEffect(() => {
        fetch(`http://localhost:3001/api/eventos/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
            setEvento(data);
            });
    }, []);

    return (
        <main>
            <div className="container">
                <div className="card">
                    
                </div>
            </div>
        </main>
    )

}