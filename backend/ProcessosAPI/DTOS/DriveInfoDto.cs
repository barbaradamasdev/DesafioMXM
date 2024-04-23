namespace ProcessosAPI.DTOS;

public class DriveInfoDto
{
    public required string DriveName { get; set; }
    public DriveType DriveType { get; set; }
    public long TotalSize { get; set; }
    public long AvailableFreeSpace { get; set; }
    public long UsedSpace => TotalSize - AvailableFreeSpace;
}