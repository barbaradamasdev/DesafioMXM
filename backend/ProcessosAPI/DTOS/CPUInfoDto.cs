namespace ProcessosAPI.DTOS;

public class CPUInfoDto
{
    public string? Nome { get; set; }
    public string? NomeMaquina { get; set; }
    public int ContadorDeProcessadores { get; set; }
    public float PorcentagemUsadaDoCPU { get; set; }
    public required List<DriveInfoDto> Drives { get; set; }
    public List<float>? ListaCPUemPorcentagem { get; set; }
}