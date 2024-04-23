export interface ProcessInfoData {
  processos: Processo[];
  memoria: Memoria;
  cpu: CPU;
}

export interface Processo {
  nome: string;
  id: number;
  memoriaPagedKB: number;
  estado: string;
}

export interface Memoria {
  totalMemoryGB: number;
  availableMemoryGB: number;
  usedMemoryGB: number;
}

export interface CPU {
  userName: string;
  machineName: string;
  processorCount: number;
  percentUsed: number;
  drives: Drives[];
}

export interface Drives {
  driveName: string;
  driveType: any;
  totalSize: number;
  availableFreeSpace: number;
  usedSpace: number;
}
