import './cardEvento.css';

export default function CardEvento({evento}) {
    return (
        <div style={{ maxWidth: 320 }}>
            <div className="card-body">
                <h4 className="card-title">{evento.responsavel}</h4>
                <p className="card-subtitle fg-3" style={{ color: "gray" }}>{evento.data}</p>
                <p className="card-text">
                    {evento.descricao}
                </p>
                <a href={`/eventos/${evento.id}`} className="link">Card link</a>
            </div>
        </div>

    )
}