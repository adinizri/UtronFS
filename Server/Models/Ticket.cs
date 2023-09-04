using Server.Utils;

namespace Server.Models;

public class Ticket
{
    public Consts.TicketTypes Type { get; set; }
    public int StartLot { get; set; }
    public int EndLot { get; set; }
    public Dimensions Dimensions { get; set; }
    public Consts.VehicleClass[] VehicleClasses { get; set; }
    public int Cost { get; set; }
    public int TimeLimits { get; set; }

    public Ticket(
        Consts.TicketTypes type,
        int startLot,
        int endLot,
        Dimensions dimensions,
        Consts.VehicleClass[] vehicleClasses,
        int cost,
        int timeLimits
    )
    {
        Type = type;
        StartLot = startLot;
        EndLot = endLot;
        Dimensions = dimensions;
        VehicleClasses = vehicleClasses;
        Cost = cost;
        TimeLimits = timeLimits;
    }
}
