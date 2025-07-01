

export const MapLegend = () => {
    return (
        <div style={{ marginBottom: '10px', fontSize: '14px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: 15 }}>
            <span
                style={{
                width: 12,
                height: 12,
                backgroundColor: '#007AFF', // azul de fuentes
                borderRadius: '50%',
                display: 'inline-block',
                marginRight: 5,
                }}
            ></span>
            Fuentes
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span
                style={{
                width: 12,
                height: 12,
                backgroundColor: '#FF4136', // rojo de eventos
                borderRadius: '50%',
                display: 'inline-block',
                marginRight: 5,
                }}
            ></span>
            Eventos
            </span>
        </div>
    )
}