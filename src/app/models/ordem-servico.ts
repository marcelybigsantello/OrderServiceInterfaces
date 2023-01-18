import { Cliente } from "./cliente";
import { Tecnico } from "./tecnico";

export interface OrdemServico {
    id?: any;
    dataAbertura?: Date;
    dataFechamento?: Date;
    prioridade: any;
    observacoes: String;
    status: any;
    cliente: Cliente | number;
    tecnico: Tecnico | number;

}