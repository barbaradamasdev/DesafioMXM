//TODO somente para funcionar swagger
using System.Diagnostics;
using System.Management;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using ProcessosAPI.DTOS;

namespace ProcessosAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProcessosController : ControllerBase
{
    private readonly IHubContext<RealTimeTaskHub> _hubContext;

    public ProcessosController(IHubContext<RealTimeTaskHub> hubContext)
    {
        _hubContext = hubContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetProcessInfo()
    {
        while (true)
        {
            var processos = GetProcessesInfo().Select(p => new ProcessInfoDto
            {
                Nome = p.ProcessName,
                Id = p.Id,
                MemoriaPagedKB = p.PagedMemorySize64 / 1024
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
            float cpuUsage = cpuCounter.NextValue();

            var cpu = new CPUInfoDto
            {
                UserName = Environment.UserName,
                MachineName = Environment.MachineName,
                ProcessorCount = Environment.ProcessorCount,
                PercentUsed = cpuUsage
            };

            var processInfo = new
            {
                Processos = processos,
                Memoria = memoria,
                CPU = cpu
            };

            await _hubContext.Clients.All.SendAsync("ReceiveProcessInfo", processInfo);
            await Task.Delay(500);
            return Ok(processInfo);

        }
    }

    private Process[] GetProcessesInfo()
    {
        return Process.GetProcesses();
    }
}