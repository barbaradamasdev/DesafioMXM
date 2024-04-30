export interface ProcessInfoData {
  processos: Processo[];
  memoria: Memoria;
  cpu: CPU;
}

export interface Processo {
  nome: string;
  id: number;
  memoria: number;
  estado: string;
}

export interface Memoria {
  memoriaTotal: number;
  memoriaDisponivel: number;
  memoriaUtilizada: number;
}

export interface CPU {
  nome: string;
  nomeMaquina: string;
  contadorDeProcessadores: number;
  porcentagemUsadaDoCPU: number;
  drives: Drives[];
  listaCPUemPorcentagem: number[];
}

export interface Drives {
  nome: string;
  tipo: any;
  tamanhoTotal: number;
  espacoDisponivel: number;
  espacoUtilizado: number;
}
