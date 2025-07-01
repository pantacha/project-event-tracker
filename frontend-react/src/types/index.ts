

export type SourceType = {
    id: number,
    nombre: string,
    lat: number,
    lon: number,
};

export type Event = {
    fuenteNombre: any;
    id: number,
    fuenteId: number,
    timestamp: string,
    valor: number,
    lat: number,
    lon: number,
    source?: SourceType,
}

export type Filters = {
    fuenteNombre: string;
    dataFrom: string;
    dataTo: string;
  };