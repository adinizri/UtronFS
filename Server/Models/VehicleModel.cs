using Server.Utils;

namespace Server.Models;

public class VehicleModel
{
    public string Name { get; set; }
    public string LicensePlateID { get; set; }
    public string Phone { get; set; }
    public string TicketType { get; set; }
    public string VehicleClass { get; set; }
    public Dimensions Dimensions { get; set; }
}
