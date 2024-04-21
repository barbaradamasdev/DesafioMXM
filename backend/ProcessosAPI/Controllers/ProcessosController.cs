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
            
            ulong totalMemoryBytes = GetTotalMemory();
            float totalMemoryGB = totalMemoryBytes / (1024f * 1024f * 1024f);

            PerformanceCounter availableMemoryCounter = new PerformanceCounter("Memory", "Available Bytes");
            float availableMemoryBytes = availableMemoryCounter.NextValue();
            float availableMemoryGB = availableMemoryBytes / (1024f * 1024f * 1024f);

            PerformanceCounter usedMemoryCounter = new PerformanceCounter("Memory", "Committed Bytes");
            float committedMemoryBytes = usedMemoryCounter.NextValue();
            float committedMemoryGB = committedMemoryBytes / (1024f * 1024f * 1024f);

            PerformanceCounter memoryUsageCounter = new("Memory", "% Committed Bytes In Use");
            float memoryUsagePercent = memoryUsageCounter.NextValue();

            var memoria = new MemoryInfoDto
            {
                CommittedMemoryGB = committedMemoryGB,
                AvailableMemoryGB = availableMemoryGB,
                TotalMemoryGB = totalMemoryGB,
                MemoryUsagePercent = memoryUsagePercent
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
        }
    }

    private Process[] GetProcessesInfo()
    {
        return Process.GetProcesses();
    }
    private ulong GetTotalMemory()
    {
        ManagementObjectSearcher searcher = new("SELECT TotalPhysicalMemory FROM Win32_ComputerSystem");
        foreach (ManagementObject queryObj in searcher.Get())
        {
            return Convert.ToUInt64(queryObj["TotalPhysicalMemory"]);
        }
        return 0;
    }
}