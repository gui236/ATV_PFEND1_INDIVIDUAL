"use client";

import "./produto.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Evento() {
    const [evento, setEvento] = useState([]);
    const params = useParams();

    useEffect(() => {
        fetch(`http://localhost:3001/api/eventos/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                setEvento(data);
            });
    }, []);

    function abrirModal() {
        document.getElementById("modal").showModal();
    }

    function fecharModal() {
        document.getElementById("modal").close();
    }

    return (
        <main>
            <div className="d-flex flex-column align-items-center justify-content-center vh-100">
                <div className="card card-translucent" style={{ width: "18rem" }}>
                    <div className={evento.pagamento === "Pago" ? "card-header pago" : "card-header pendente"}>Pagamento:&nbsp;<p>{evento.pagamento}</p></div>
                    <div className="card-body">
                        <h4 className="card-title">{evento.responsavel}</h4>
                        <h4 className="card-subtitle">R$ {evento.valor}</h4>

                        <hr />

                        <p className="card-text">
                            {evento.descricao}
                        </p>

                        <div className="d-flex gap-2">
                            <button onClick={abrirModal} className="btn btn-success">
                                Editar
                            </button>

                            <button className="btn btn-danger">Excluir</button>
                        </div>
                    </div>
                    <div className="card-footer fg-2">{evento.data} ({evento.horario})</div>
                </div>
            </div>


            <dialog id="modal" className="p-0 border-0 bg-transparent">
                <div className="modal-content bg-dark text-light p-4">

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="h4 mb-0">Editar evento</h2>

                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={() => document.getElementById("modal").close()}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="responsavel" className="form-label">
                            Responsável
                        </label>
                        <input
                            type="text"
                            id="responsavel"
                            className="form-control"
                            value={evento.responsavel || ""}
                            onChange={(e) => setEvento({
                                ...evento,
                                responsavel: e.target.value
                            })}
                        />
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="data" className="form-label">Data</label>
                            <input
                                type="date"
                                id="data"
                                className="form-control"
                                value={evento.data || ""}
                                onChange={(e) => setEvento({
                                    ...evento,
                                    data: e.target.value
                                })}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="horario" className="form-label">Horário</label>
                            <input
                                type="time"
                                id="horario"
                                className="form-control"
                                value={evento.horario || ""}
                                onChange={(e) => setEvento({
                                    ...evento,
                                    horario: e.target.value
                                })}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="tempoHoras" className="form-label">
                                Duração (horas)
                            </label>
                            <input
                                type="number"
                                id="tempoHoras"
                                className="form-control"
                                min="1"
                                value={evento.tempoHoras ?? ""}
                                onChange={(e) => setEvento({
                                    ...evento,
                                    tempoHoras: e.target.value
                                })}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label htmlFor="valor" className="form-label">Valor (R$)</label>
                            <input
                                type="number"
                                id="valor"
                                className="form-control"
                                min="0"
                                step="0.01"
                                value={evento.valor ?? ""}
                                onChange={(e) => setEvento({
                                    ...evento,
                                    valor: e.target.value
                                })}
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="descricao" className="form-label">Descrição</label>
                        <textarea
                            id="descricao"
                            className="form-control"
                            rows="3"
                            value={evento.descricao || ""}
                            onChange={(e) => setEvento({
                                ...evento,
                                descricao: e.target.value
                            })}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="pagamento" className="form-label">Pagamento</label>
                        <select
                            id="pagamento"
                            className="form-select"
                            value={evento.pagamento || ""}
                            onChange={(e) => setEvento({
                                ...evento,
                                pagamento: e.target.value
                            })}
                        >
                            <option value="Pago">Pago</option>
                            <option value="Pendente">Pendente</option>
                        </select>
                    </div>

                    <div className="d-flex justify-content-end">
                        <button type="button" className="btn btn-success">
                            Salvar
                        </button>
                    </div>

                </div>
            </dialog>

        </main>
    )

}