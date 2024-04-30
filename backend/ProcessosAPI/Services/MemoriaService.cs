using System.Management;
using ProcessosAPI.DTOS;

namespace ProcessosAPI.Services
{
    public class MemoriaService
    {
        public MemoryInfoDto ObterInformacoesMemoria()
        {
            float totalMemory = 0f;
            float availableMemory = 0f;
            float usedMemory = 0f;

            ManagementObjectSearcher searcher = new ManagementObjectSearcher("SELECT * FROM Win32_OperatingSystem");
            foreach (ManagementObject queryObj in searcher.Get())
            {
                ulong totalPhysicalMemory = Convert.ToUInt64(queryObj["TotalVisibleMemorySize"]);
                ulong freePhysicalMemory = Convert.ToUInt64(queryObj["FreePhysicalMemory"]);
                ulong usedPhysicalMemory = totalPhysicalMemory - freePhysicalMemory;

                float totalMemoryBytes = totalPhysicalMemory;
                float availableMemoryBytes = freePhysicalMemory;
                float usedMemoryBytes = usedPhysicalMemory;

                totalMemory = totalMemoryBytes / (1024f * 1024f);
                availableMemory = availableMemoryBytes / (1024f * 1024f);
                usedMemory = usedMemoryBytes / (1024f * 1024f);
            }

            var memoria = new MemoryInfoDto
            {
                UsedMemoryGB = usedMemory,
                AvailableMemoryGB = availableMemory,
                TotalMemoryGB = totalMemory,
            };

            return memoria;
        }
    }
}
