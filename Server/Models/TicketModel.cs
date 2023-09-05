using Server.Utils;

namespace Server.Models;

public class Ticket
{
    public string Type { get; set; }
    public int StartLot { get; set; }
    public int EndLot { get; set; }
    public Dimensions Dimensions { get; set; }
    public string[] VehicleClasses { get; set; }
    public int Price { get; set; }
    public int TimeLimits { get; set; }

    public Ticket(
        string type,
        int startLot,
        int endLot,
        Dimensions dimensions,
        string[] vehicleClasses,
        int price,
        int timeLimits
    )
    {
        Type = type;
        StartLot = startLot;
        EndLot = endLot;
        Dimensions = dimensions;
        VehicleClasses = vehicleClasses;
        Price = price;
        TimeLimits = timeLimits;
    }
}
