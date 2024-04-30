using System.Diagnostics;
using System.Management;
using Microsoft.AspNetCore.SignalR;
using ProcessosAPI.DTOS;
using ProcessosAPI.Services;

public class RealTimeTaskHub : Hub
{
    private List<float> cpuList = new List<float>();
    private readonly ProcessosService _processosService;
    private readonly MemoriaService _memoriaService;
    private readonly CPUService _CPUService;

    public RealTimeTaskHub(ProcessosService processosService, MemoriaService memoriaService, CPUService CPUService)
    {
        _processosService = processosService;
        _memoriaService = memoriaService;
        _CPUService = CPUService;
    }
    public override async Task OnConnectedAsync()
    {
        Console.WriteLine($"Client connected: {Context.ConnectionId}");

        while (true) {
            var processos = _processosService.ObterInformacoesProcessos();
            var memoria = _memoriaService.ObterInformacoesMemoria();
            var cpu = _CPUService.ObterInformacoesCPU();

            cpuList.Add(cpu.PorcentagemUsadaDoCPU);

            var cpuComHistorico = new CPUInfoDto
            {
                Nome = cpu.Nome,
                NomeMaquina = cpu.NomeMaquina,
                ContadorDeProcessadores = cpu.ContadorDeProcessadores,
                PorcentagemUsadaDoCPU = cpu.PorcentagemUsadaDoCPU,
                Drives = cpu.Drives,
                ListaCPUemPorcentagem = cpuList
            };

            var processInfo = new
            {
                Processos = processos,
                Memoria = memoria,
                CPU = cpuComHistorico
            };


            await Clients.All.SendAsync("ReceiveProcessInfo", processInfo);
            await Task.Delay(2000);
        }
        
    }
}