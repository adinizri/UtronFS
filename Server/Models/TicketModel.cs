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

     private readonly UtronDbContext _context;

    public Ticket(UtronDbContext context)
    {
        _context = context;
    }
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



     // get the free parkin lots by ticketType
    public async Task<List<int>> GetFreeParkingLotByTicketType(string ticketType)
    {
        try
        {
            Ticket ticket = Consts.OptionalTickets[ticketType];
            List<int> takenLots = await _context.ParkingRecords
                .Where(
                    record =>
                        record.LotNumber >= ticket.StartLot && record.LotNumber <= ticket.EndLot
                )
                .Select(pr => pr.LotNumber)
                .ToListAsync();

            List<int> freeLost = Enumerable
                .Range(ticket.StartLot, ticket.EndLot - ticket.StartLot + 1)
                .Except(takenLots)
                .ToList();
            return freeLost;
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    public async Task<List<Ticket>> GetSuitableTicketByDimenetions(Dimensions vehicleDimensions)
    {
        try
        {
            List<Ticket> suitableTickets = new();
            foreach (KeyValuePair<string, Ticket> ticketPair in Consts.OptionalTickets)
            {
                Ticket ticket = ticketPair.Value;
                string ticketType = ticketPair.Key;
                if (
                    Dimensions.ValidateVehicleDimensions(
                        vehicleDimensions,
                        ticket.Dimensions,
                        ticketType
                    )
                )
                {
                    List<int> freeLots = await GetFreeParkingLotByTicketType(ticketType);
                    if (freeLots.Count() > 0)
                        suitableTickets.Add(ticket);
                }
            }

            return suitableTickets;
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<List<string>> GetParkingCarsByTicket(string ticketType)
    {
        try
        {
            Ticket ticket = Consts.OptionalTickets[ticketType];
            List<string> parkingCars = await _context.ParkingRecords
                .Where(
                    record =>
                        record.LotNumber >= ticket.StartLot && record.LotNumber <= ticket.EndLot
                )
                .Select(pr => pr.LicensePlateID)
                .ToListAsync();

            return parkingCars;
        }
        catch (Exception ex)
        {
            throw;
        }
    }
}
