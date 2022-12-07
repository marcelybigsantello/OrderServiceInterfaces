export interface OrderService {
    id?: String | number;
    dataAbertura: Date;
    dataFechamento: Date;
    prioridade: number;
    status: number;
    observacoes: String;
    tecnico: number;
    cliente: number;
}