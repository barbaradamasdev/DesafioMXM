using System.Diagnostics;
using ProcessosAPI.DTOS;

namespace ProcessosAPI.Services
{
    public class CPUService
    {
        public CPUInfoDto ObterInformacoesCPU()
        {
            float usoCPU = ObterUsoCPU();
            List<DriveInfoDto> drives = ObterInformacoesDrives();

            var cpu = new CPUInfoDto
            {
                Nome = Environment.UserName,
                NomeMaquina = Environment.MachineName,
                ContadorDeProcessadores = Environment.ProcessorCount,
                PorcentagemUsadaDoCPU = usoCPU,
                Drives = drives,
            };

            return cpu;
        }

        private float ObterUsoCPU()
        {
            PerformanceCounter cpuCounter = new PerformanceCounter("Processor", "% Processor Time", "_Total");
            Thread.Sleep(500);
            float usoCPU = cpuCounter.NextValue();
            Thread.Sleep(500);
            usoCPU = cpuCounter.NextValue();
            return usoCPU;
        }

        private List<DriveInfoDto> ObterInformacoesDrives()
        {
            DriveInfo[] allDrives = DriveInfo.GetDrives();
            List<DriveInfoDto> drives = new List<DriveInfoDto>();

            foreach (DriveInfo drive in allDrives)
            {
                if (drive.IsReady)
                {
                    DriveInfoDto driveDto = new DriveInfoDto
                    {
                        Nome = drive.Name,
                        Tipo = drive.DriveType,
                        TamanhoTotal = drive.TotalSize,
                        EspacoDisponivel = drive.AvailableFreeSpace
                    };

                    drives.Add(driveDto);
                }
            }

            return drives;
        }
    }
}
