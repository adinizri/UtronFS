using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models;

public class ParkingRecord
{
    [Key]
    public string LicensePlateID { get; set; }

    [Required]
    [Column(TypeName = "datetime2")] // Use datetime2 for precise datetime storage
    public DateTime ParkingDateTime { get; set; }

    [Required]
    [Index(IsUnique = true)]
    public int LotNumber { get; set; }
}
