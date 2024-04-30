namespace ProcessosAPI.DTOS;
public class ProcessInfoDto
{
    public required string Nome { get; set; }
    public int Id { get; set; }
    public long Memoria { get; set; }
    public string? Estado { get; set; }
}

