using System;
using System.Management;
using ProcessosAPI.DTOS;

namespace ProcessosAPI.Services
{
    public class MemoriaService
    {
        public MemoryInfoDto ObterInformacoesMemoria()
        {
            float memoriaTotal;
            float memoriaDisponivel;
            float memoriaUtilizada;
            
            ObterInformacoesMemoria(out memoriaTotal, out memoriaDisponivel, out memoriaUtilizada);

            var memoria = new MemoryInfoDto
            {
                MemoriaUtilizada = memoriaUtilizada,
                MemoriaDisponivel = memoriaDisponivel,
                MemoriaTotal = memoriaTotal,
            };

            return memoria;
        }

        private void ObterInformacoesMemoria(out float memoriaTotal, out float memoriaDisponivel, out float memoriaUtilizada)
        {
            memoriaTotal = 0f;
            memoriaDisponivel = 0f;
            memoriaUtilizada = 0f;

            ManagementObjectSearcher searcher = new ManagementObjectSearcher("SELECT * FROM Win32_OperatingSystem");
            foreach (ManagementObject queryObj in searcher.Get())
            {
                ulong memoriaFisicaTotal = Convert.ToUInt64(queryObj["TotalVisibleMemorySize"]);
                ulong memoriaFisicaLivre = Convert.ToUInt64(queryObj["FreePhysicalMemory"]);

                memoriaTotal = memoriaFisicaTotal / (1024f * 1024f);
                memoriaDisponivel = memoriaFisicaLivre / (1024f * 1024f);
                memoriaUtilizada = (memoriaFisicaTotal - memoriaFisicaLivre) / (1024f * 1024f);

            }
        }
    }
}
