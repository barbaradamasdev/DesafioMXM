namespace ProcessosAPI.DTOS;

public class DriveInfoDto
{
    public required string Nome { get; set; }
    public DriveType Tipo { get; set; }
    public long TamanhoTotal { get; set; }
    public long EspacoDisponivel { get; set; }
    public long EspacoUtilizado => TamanhoTotal - EspacoDisponivel;
}