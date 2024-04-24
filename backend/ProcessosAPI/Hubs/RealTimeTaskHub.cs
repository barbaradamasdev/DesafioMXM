using System.Diagnostics;
using System.Management;
using Microsoft.AspNetCore.SignalR;
using ProcessosAPI.DTOS;

public class RealTimeTaskHub : Hub
{
    private List<float> cpuList = new List<float>();
    public override async Task OnConnectedAsync()
    {
        Console.WriteLine($"Client connected: {Context.ConnectionId}");

        while (true)
        {
            var processos = GetProcessesInfo().Select(p => new ProcessInfoDto
            {
                Nome = p.ProcessName,
                Id = p.Id,
                MemoriaPagedKB = p.PagedMemorySize64 / 1024,
                Estado = p.Responding ? "Em execução" : "Não respondendo",
            }).ToList();

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

             PerformanceCounter cpuCounter = new("Processor", "% Processor Time", "_Total");
             Thread.Sleep(500);
             float cpuUsage = cpuCounter.NextValue();
             Thread.Sleep(500);
             cpuUsage = cpuCounter.NextValue();

            DriveInfo[] allDrives = DriveInfo.GetDrives();
            List<DriveInfoDto> driveInfoList = new List<DriveInfoDto>();

            foreach (DriveInfo drive in allDrives)
            {
                if (drive.IsReady)
                {
                    DriveInfoDto driveDto = new DriveInfoDto
                    {
                        DriveName = drive.Name,
                        DriveType = drive.DriveType,
                        TotalSize = drive.TotalSize,
                        AvailableFreeSpace = drive.AvailableFreeSpace
                    };

                    driveInfoList.Add(driveDto);
                }
            }

            cpuList.Add(cpuUsage);

            var cpu = new CPUInfoDto
            {
                UserName = Environment.UserName,
                MachineName = Environment.MachineName,
                ProcessorCount = Environment.ProcessorCount,
                PercentUsed = cpuUsage,
                Drives = driveInfoList,
                CpuList = cpuList
            };

            var processInfo = new
            {
                Processos = processos,
                Memoria = memoria,
                CPU = cpu
            };

            await Clients.All.SendAsync("ReceiveProcessInfo", processInfo);
            Console.WriteLine(DateTime.Now.ToString(""));
            await Task.Delay(2000); //TODO reduzir tempo apos layout
        }
    }

    private Process[] GetProcessesInfo()
    {
        return Process.GetProcesses();
    }

}