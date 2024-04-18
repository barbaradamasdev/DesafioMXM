using System.Diagnostics;
using System.Management;
using Microsoft.AspNetCore.Mvc;
using ProcessosAPI.DTOS;

namespace ProcessosAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProcessosController : ControllerBase
{
    [HttpGet]
    public IActionResult GetProcessInfo()
    {
        var processos = GetProcessesInfo().Select(p => new ProcessInfoDto
        {
            Nome = p.ProcessName,
            Id = p.Id,
            MemoriaPagedKB = p.PagedMemorySize64 / 1024
        }).ToList();

        ulong totalMemoryBytes = GetTotalMemory();

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
            TotalMemoryGB = GetTotalMemory() / (1024f * 1024f * 1024f),
            MemoryUsagePercent = memoryUsagePercent
        };


        //FIXME resolver tempo para porcentagem zerada
        PerformanceCounter cpuCounter = new("Processor", "% Processor Time", "_Total");
        Thread.Sleep(500);
        float cpuUsage = cpuCounter.NextValue();
        Thread.Sleep(500);
        cpuUsage = cpuCounter.NextValue();

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

        return Ok(processInfo);
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