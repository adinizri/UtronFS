using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models;

public class ParkingRecord
{
    [Key]
    public string LicensePlateID { get; set; }

    [Column(TypeName = "datetime2")]
    [Required]
    public DateTime ParkingDateTime { get; set; }

    [Required]
    public int LotNumber { get; set; }

    [Required]
    public string PhoneNumber { get; set; }

    [Required]
    public string Name { get; set; }
}
