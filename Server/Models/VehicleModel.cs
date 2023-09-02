namespace Server.Models;
public class VehicleModel
{
    public string Name { get; set; }
    public string LicensePlateID { get; set; }
    public string Phone { get; set; }
    public Consts.TicketTypes TicketType { get; set; }
    public Consts.VehicleClassRank VehicleClassRank { get; set; }
    public Dimensions VehicleDimensions { get; set; }
}