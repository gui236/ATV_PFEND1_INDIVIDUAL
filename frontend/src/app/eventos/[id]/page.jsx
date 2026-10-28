"use client";

import "./produto.css";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function Evento() {
    const [evento, setEvento] = useState({});
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        fetch(`http://localhost:3001/api/eventos/${params.id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Erro ao buscar evento");
                }

                return res.json();
            })
            .then((data) => {
                setEvento(data);
            })
            .catch(() => {
                alert("Não foi possível carregar o evento.");
            });
    }, [params.id]);

    function abrirModal() {
        document.getElementById("modal").showModal();
    }

    function fecharModal() {
        document.getElementById("modal").close();
    }

    async function excluirEvento(id) {
        const confirmar = window.confirm("Deseja excluir este evento?");

        if (!confirmar) return;

        try {
            const resposta = await fetch(
                `http://localhost:3001/api/eventos/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (resposta.ok) {
                router.push("/eventos");
                router.refresh();
            } else {
                alert("Erro ao excluir evento!");
            }
        } catch (erro) {
            alert("Não foi possível conectar à API.");
        }
    }

    async function editarEvento(id) {
        try {
            const resposta = await fetch(
                `http://localhost:3001/api/eventos/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...evento,
                        tempoHoras: Number(evento.tempoHoras),
                        valor: Number(evento.valor)
                    })
                }
            );

            const resultado = await resposta.json();

            if (resposta.ok) {
                setEvento(resultado.evento || resultado);
                fecharModal();
                alert("Evento atualizado com sucesso!");
            } else {
                alert(resultado.mensagem || "Erro ao atualizar evento!");
            }
        } catch (erro) {
            alert("Não foi possível conectar à API.");
        }
    }

    return (
        <main>
            <div className="d-flex flex-column align-items-center justify-content-center vh-100">

                <div className="d-flex fs-6" style={{ width: "280px" }}>
                    <Link href="/eventos">Voltar</Link>
                </div>

                <div className="card card-translucent" style={{ width: "18rem" }}>
                    <div className={evento.pagamento === "Pago" ? "card-header pago" : "card-header pendente"}>
                        Pagamento: <p>{evento.pagamento}</p>
                    </div>

                    <div className="card-body">
                        <h4 className="card-title">{evento.responsavel}</h4>
                        <h4 className="card-subtitle">R$ {evento.valor}</h4>

                        <hr />

                        <p className="card-text">{evento.descricao}</p>

                        <div className="d-flex gap-2">
                            <button onClick={abrirModal} className="btn btn-success">
                                Editar
                            </button>

                            <button
                                onClick={() => excluirEvento(evento.id)}
                                className="btn btn-danger"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>

                    <div className="card-footer fg-2">
                        {evento.data} ({evento.horario})
                    </div>
                </div>
            </div>

            <dialog id="modal" className="p-0 border-0 bg-transparent">
                <div className="modal-content bg-dark text-light p-4">

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="h4 mb-0">Editar evento</h2>

                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={fecharModal}
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
                        <label htmlFor="descricao" className="form-label">
                            Descrição
                        </label>

                        <input
                            type="text"
                            id="descricao"
                            className="form-control"
                            value={evento.descricao || ""}
                            onChange={(e) => setEvento({
                                ...evento,
                                descricao: e.target.value
                            })}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="pagamento" className="form-label">
                            Pagamento
                        </label>

                        <select
                            id="pagamento"
                            className="form-select"
                            value={evento.pagamento || ""}
                            onChange={(e) => setEvento({
                                ...evento,
                                pagamento: e.target.value
                            })}
                        >
                            <option className="text-dark" value="Pago">Pago</option>
                            <option className="text-dark" value="Pendente">Pendente</option>
                        </select>
                    </div>

                    <div className="d-flex justify-content-end">
                        <button
                            type="button"
                            onClick={() => editarEvento(evento.id)}
                            className="btn btn-success"
                        >
                            Salvar
                        </button>
                    </div>

                </div>
            </dialog>
        </main>
    );
}