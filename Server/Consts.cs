using Server.Models;

namespace Server.Utils;

public static class Consts
{
    private static readonly Ticket vipTicket =
        new(
            TicketTypes.VIP,
            1,
            10,
            new Dimensions(0, 0, 0),
            new string[] { VehicleClass.A, VehicleClass.B, VehicleClass.C },
            200,
            0
        );
    private static readonly Ticket valueTicket =
        new(
            TicketTypes.Value,
            11,
            30,
            new Dimensions(2500, 2400, 5000),
            new string[] { VehicleClass.A, VehicleClass.B },
            100,
            72
        );
    private static readonly Ticket regularTicket =
        new(
            TicketTypes.VIP,
            31,
            60,
            new Dimensions(2000, 2000, 3000),
            new string[] { VehicleClass.A },
            50,
            24
        );

    // the tickts options

    public readonly static IDictionary<string, Ticket> OptionalTickets = new Dictionary<
        string,
        Ticket
    >
    {
        { TicketTypes.VIP, vipTicket },
        { TicketTypes.Value, valueTicket },
        { TicketTypes.Regular, regularTicket }
    };

    // the vehicle Classes dictionary that holds for every class what vehicle can we use
    public readonly static IDictionary<string, string[]> vehicleClasses = new Dictionary<
        string,
        string[]
    >
    {
        { VehicleClass.A, new string[] { "Motorcycle", "Private", "Crossover" } },
        { VehicleClass.B, new string[] { "SUV", "Van" } },
        { VehicleClass.C, new string[] { "Truck" } },
    };

    public static class VehicleClass
    {
        public const string A = "A";
        public const string B = "B";
        public const string C = "C";
    }

    public static class TicketTypes
    {
        public const string Regular = "Regular";
        public const string Value = "Value";
        public const string VIP = "VIP";
    }
}
