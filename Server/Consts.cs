using Server.Models;

namespace Server.Utils;

public static class Consts
{
    // the tickts options
    public static IDictionary<TicketTypes, Ticket> OptionalTicket = new Dictionary<
        TicketTypes,
        Ticket
    >
    {
        { TicketTypes.VIP, vipTicket },
        { TicketTypes.Value, valueTicket },
        { TicketTypes.Regular, regularTicket }
    };

    // the vehicle Classes dictionary that holds for every class what vehicle can we use
    public static IDictionary<VehicleClass, string[]> vehicleClasses = new Dictionary<
        VehicleClass,
        string[]
    >
    {
        { VehicleClass.A, new string[] { "Motorcycle", "Private", "Crossover" } },
        { VehicleClass.B, new string[] { "SUV", "Van" } },
        { VehicleClass.C, new string[] { "Truck" } },
    };

    private static readonly Ticket vipTicket =
        new(
            TicketTypes.VIP,
            1,
            10,
            new Dimensions(0, 0, 0),
            new VehicleClass[] { VehicleClass.A, VehicleClass.B, VehicleClass.C },
            200,
            0
        );
    private static readonly Ticket valueTicket =
        new(
            TicketTypes.Value,
            11,
            30,
            new Dimensions(2500, 2400, 5000),
            new VehicleClass[] { VehicleClass.A, VehicleClass.B },
            100,
            72
        );
    private static readonly Ticket regularTicket =
        new(
            TicketTypes.VIP,
            31,
            60,
            new Dimensions(2000, 2000, 3000),
            new VehicleClass[] { VehicleClass.A },
            50,
            24
        );

    public enum VehicleClass
    {
        A,
        B,
        C
    }

    public enum TicketTypes
    {
        VIP,
        Value,
        Regular
    }
}
