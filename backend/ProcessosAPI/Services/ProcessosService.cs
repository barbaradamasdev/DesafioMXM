using System.Diagnostics;
using ProcessosAPI.DTOS;

namespace ProcessosAPI.Services
{
    public class ProcessosService
    {
        public ProcessInfoDto[] ObterInformacoesProcessos()

        {
            var processos = ObterInformacoesProcessosSistema().Select(p => new ProcessInfoDto
            {
                Nome = p.ProcessName,
                Id = p.Id,
                Memoria = p.PagedMemorySize64 / 1024,
                Estado = p.Responding ? "Em execução" : "Não respondendo",
            }).ToList();

            return processos.ToArray();
        }

        private Process[] ObterInformacoesProcessosSistema()
        {
            return Process.GetProcesses();
        }
    }
}
