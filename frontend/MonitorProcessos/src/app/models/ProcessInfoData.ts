export interface ProcessInfoData {
  processos: Processo[];
  memoria: Memoria;
  cpu: CPU;
}

export interface Processo {
  nome: string;
  id: number;
  memoriaPagedKB: number;
}

export interface Memoria {
  totalMemoryGB: number;
  availableMemoryGB: number;
  committedMemoryGB: number;
  memoryUsagePercent: number;
}

export interface CPU {
  userName: string;
  machineName: string;
  processorCount: number;
  percentUsed: number;
}
