namespace ProcessosAPI.DTOS;

public class CPUInfoDto
{
    public string? UserName { get; set; }
    public string? MachineName { get; set; }
    public int ProcessorCount { get; set; }
    public float PercentUsed { get; set; }
    public required List<DriveInfoDto> Drives { get; set; }
    public List<float>? CpuList { get; set; }
}