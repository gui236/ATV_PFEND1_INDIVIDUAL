
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());

const PORT = 3001;

app.use(express.json());

const caminhoEventos = path.join(__dirname, 'eventos.json');

function lerEventos() {
    const dados = fs.readFileSync(caminhoEventos, 'utf8');
    return JSON.parse(dados);
}

function salvarEventos(eventos) {
    fs.writeFileSync(
        caminhoEventos,
        JSON.stringify(eventos, null, 2)
    );
}

app.get('/api/saude', (req, res) => {
    res.status(200).json({
        status: 'ok',
        mensagem: 'API funcionando!'
    });
});

app.get('/api/eventos', (req, res) => {
    const eventos = lerEventos();
    res.status(200).json(eventos);
});

app.get('/api/eventos/:id', (req, res) => {
    const eventos = lerEventos();
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            mensagem: 'ID inválido'
        });
    }

    const evento = eventos.find(e => e.id === id);

    if (!evento) {
        return res.status(404).json({
            mensagem: 'Evento não encontrado'
        });
    }

    res.status(200).json(evento);
});

app.post('/api/eventos', (req, res) => {
    const eventos = lerEventos();

    const {
        responsavel,
        data,
        horario,
        tempoHoras,
        valor,
        pagamento,
        descricao
    } = req.body;

    if (
        typeof responsavel !== 'string' || !responsavel.trim() ||
        typeof data !== 'string' || !data.trim() ||
        typeof horario !== 'string' || !horario.trim() ||
        tempoHoras === undefined ||
        valor === undefined ||
        typeof pagamento !== 'string' || !pagamento.trim()
    ) {
        return res.status(400).json({
            mensagem: 'Preencha todos os campos do evento'
        });
    }

    const tempo = Number(tempoHoras);
    const valorNumerico = Number(valor);

    if (
        !Number.isFinite(tempo) || tempo <= 0 ||
        !Number.isFinite(valorNumerico) || valorNumerico < 0
    ) {
        return res.status(400).json({
            mensagem: 'Tempo ou valor inválido'
        });
    }

    const novoId = eventos.length > 0
        ? Math.max(...eventos.map(e => Number(e.id) || 0)) + 1
        : 1;

    const novoEvento = {
        id: novoId,
        responsavel: responsavel.trim(),
        data: data.trim(),
        horario: horario.trim(),
        tempoHoras: tempo,
        valor: valorNumerico,
        pagamento: pagamento.trim(),
        descricao: descricao.trim()
    };

    eventos.push(novoEvento);
    salvarEventos(eventos);

    res.status(201).json({
        mensagem: 'Evento cadastrado com sucesso!',
        evento: novoEvento
    });
});


app.put('/api/eventos/:id', (req, res) => {
    const eventos = lerEventos();
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            mensagem: 'ID inválido'
        });
    }

    const indice = eventos.findIndex(e => Number(e.id) === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: 'Evento não encontrado'
        });
    }

    const {
        responsavel,
        data,
        horario,
        tempoHoras,
        valor,
        pagamento
    } = req.body || {};

    if (
        typeof responsavel !== 'string' || !responsavel.trim() ||
        typeof data !== 'string' || !data.trim() ||
        typeof horario !== 'string' || !horario.trim() ||
        tempoHoras === undefined || tempoHoras === null ||
        valor === undefined || valor === null ||
        typeof pagamento !== 'string' || !pagamento.trim()
    ) {
        return res.status(400).json({
            mensagem: 'Preencha todos os campos do evento'
        });
    }

    const tempo = Number(tempoHoras);
    const valorNumerico = Number(valor);

    if (
        !Number.isFinite(tempo) || tempo <= 0 ||
        !Number.isFinite(valorNumerico) || valorNumerico < 0
    ) {
        return res.status(400).json({
            mensagem: 'Tempo ou valor inválido'
        });
    }

    const eventoAtualizado = {
        id,
        responsavel: responsavel.trim(),
        data: data.trim(),
        horario: horario.trim(),
        tempoHoras: tempo,
        valor: valorNumerico,
        pagamento: pagamento.trim()
    };

    eventos[indice] = eventoAtualizado;

    salvarEventos(eventos);

    res.status(200).json({
        mensagem: 'Evento atualizado com sucesso!',
        evento: eventoAtualizado
    });
});

app.delete('/api/eventos/:id', (req, res) => {
    const eventos = lerEventos();
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            mensagem: 'ID inválido'
        });
    }

    const indice = eventos.findIndex(e => Number(e.id) === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: 'Evento não encontrado'
        });
    }

    const eventoExcluido = eventos[indice];

    eventos.splice(indice, 1);

    salvarEventos(eventos);

    res.status(200).json({
        mensagem: 'Evento excluído com sucesso!',
        evento: eventoExcluido
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
