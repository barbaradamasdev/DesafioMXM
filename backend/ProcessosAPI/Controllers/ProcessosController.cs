using Microsoft.AspNetCore.Mvc;
using ProcessosAPI.Services;

namespace ProcessosAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProcessosController : ControllerBase
{
    private readonly ProcessosService _processosService;
    private readonly MemoriaService _memoriaService;
    private readonly CPUService _CPUService;

    public ProcessosController(ProcessosService processosService, MemoriaService memoriaService, CPUService CPUService)
    {
        _processosService = processosService;
        _memoriaService = memoriaService;
        _CPUService = CPUService;
    }

    [HttpGet]
    public IActionResult GetProcessInfo()
    {
        var processos = _processosService.ObterInformacoesProcessos();
        var memoria = _memoriaService.ObterInformacoesMemoria();
        var cpu = _CPUService.ObterInformacoesCPU();

        var processInfo = new
        {
            Processos = processos,
            Memoria = memoria,
            CPU = cpu
        };

        return Ok(processInfo);
    }
}