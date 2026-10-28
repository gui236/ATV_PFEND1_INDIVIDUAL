"use client";

import "./addEvento.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NovoEvento() {
    const router = useRouter();

    const [responsavel, setResponsavel] = useState("");
    const [data, setData] = useState("");
    const [horario, setHorario] = useState("");
    const [tempoHoras, setTempoHoras] = useState("");
    const [valor, setValor] = useState("");
    const [descricao, setDescricao] = useState("");
    const [pagamento, setPagamento] = useState("");
    const [mensagem, setMensagem] = useState("");

    async function adicionarEvento(e) {
        e.preventDefault();

        const novoEvento = {
            responsavel,
            data,
            horario,
            tempoHoras: Number(tempoHoras),
            valor: Number(valor),
            descricao,
            pagamento
        };

        try {
            const resposta = await fetch("http://localhost:3001/api/eventos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(novoEvento)
            });

            const resultado = await resposta.json();

            if (!resposta.ok) {
                setMensagem(resultado.mensagem || "Erro ao cadastrar evento.");
                return;
            }

            alert("Evento cadastrado com sucesso!");
            router.push("/eventos");

        } catch (erro) {
            setMensagem("Não foi possível conectar à API.");
        }
    }

    return (
        <main>
            <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
                <form
                    onSubmit={adicionarEvento}
                    className="form-field d-flex align-items-center"
                >
                    <div className="modal-content text-light p-4">

                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="mb-0">Adicionar evento</h4>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Responsável</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nome do responsável"
                                value={responsavel}
                                onChange={(e) => setResponsavel(e.target.value)}
                                required
                            />
                        </div>

                        <div className="row g-3 mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Data</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Horário</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    value={horario}
                                    onChange={(e) => setHorario(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row g-3 mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Tempo (horas)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Ex.: 2"
                                    min="1"
                                    value={tempoHoras}
                                    onChange={(e) => setTempoHoras(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Valor (R$)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Ex.: 250"
                                    min="0"
                                    step="0.01"
                                    value={valor}
                                    onChange={(e) => setValor(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Descrição</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Descrição do evento"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Pagamento</label>
                            <select
                                className="form-select"
                                value={pagamento}
                                onChange={(e) => setPagamento(e.target.value)}
                                required
                            >
                                <option className="text-dark" value="">Selecione o status</option>
                                <option className="text-dark" value="Pago">Pago</option>
                                <option className="text-dark" value="Pendente">Pendente</option>
                            </select>
                        </div>

                        {mensagem && (
                            <div className="alert alert-danger">
                                {mensagem}
                            </div>
                        )}

                        <div className="d-flex justify-content-end gap-2">
                            <button
                                type="button"
                                className="btn btn-outline-light"
                                onClick={() => router.back()}
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="btn btn-success px-4"
                            >
                                Cadastrar evento
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </main>
    );
}