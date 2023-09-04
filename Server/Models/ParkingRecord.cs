using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models;

public class ParkingRecord
{
    [Key]
    public string LicensePlateID { get; set; }

    [Required]
    public DateTime ParkingDateTime { get; set; }

    [Required]
    public int LotNumber { get; set; }
}
