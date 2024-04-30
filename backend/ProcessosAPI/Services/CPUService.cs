using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Management;
using ProcessosAPI.DTOS;

namespace ProcessosAPI.Services
{
    public class CPUService
    {
        public CPUInfoDto ObterInformacoesCPU()
        {
            PerformanceCounter cpuCounter = new("Processor", "% Processor Time", "_Total");
            Thread.Sleep(500);
            float cpuUsage = cpuCounter.NextValue();
            Thread.Sleep(500);
            cpuUsage = cpuCounter.NextValue();

            DriveInfo[] allDrives = DriveInfo.GetDrives();
            List<DriveInfoDto> driveInfoList = new List<DriveInfoDto>();

            foreach (DriveInfo drive in allDrives)
            {
                if (drive.IsReady)
                {
                    DriveInfoDto driveDto = new DriveInfoDto
                    {
                        DriveName = drive.Name,
                        DriveType = drive.DriveType,
                        TotalSize = drive.TotalSize,
                        AvailableFreeSpace = drive.AvailableFreeSpace
                    };

                    driveInfoList.Add(driveDto);
                }
            }

            var cpu = new CPUInfoDto
            {
                UserName = Environment.UserName,
                MachineName = Environment.MachineName,
                ProcessorCount = Environment.ProcessorCount,
                PercentUsed = cpuUsage,
                Drives = driveInfoList,
            };

            return cpu;
        }
    }
}
