using Server.Utils;

namespace Server.Models;

class GarageModel
{
    private readonly UtronDbContext _context;

    public GarageModel(UtronDbContext context)
    {
        _context = context;
    }

    //checkin in a vehicle
    public async Task<ParkingRecord> CheckInVehicle(VehicleModel vehicle)
    {
        try
        {
            // check if there free lots
            List<int> ticketTypeFreeLots = await GetFreeParkingLotByTicketType(vehicle.TicketType);
            if (ticketTypeFreeLots.Count() > 0)
            {
                ParkingRecord parkingRecord = new ParkingRecord
                {
                    LicensePlateID = vehicle.LicensePlateID,
                    ParkingDateTime = DateTime.Now,
                    LotNumber = ticketTypeFreeLots[0],
                    PhoneNumber = vehicle.Phone,
                    Name = vehicle.Name
                };

                await _context.ParkingRecords.AddAsync(parkingRecord);
                await _context.SaveChangesAsync();
                return parkingRecord;
            }
            else
                return null;
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    public async Task<ParkingRecord> CheckoutVehicle(string licensePlateID)
    {
        ParkingRecord parkingRecord = await _context.ParkingRecords.FindAsync(licensePlateID);

        if (parkingRecord == null)
        {
            return parkingRecord;
        }

        _context.ParkingRecords.Remove(parkingRecord);

        try
        {
            await _context.SaveChangesAsync();
            return parkingRecord;
        }
        catch (Exception ex)
        {
            throw;
        }
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

    public async Task<List<ParkingRecord>> GetGarageStatus()
    {
        try
        {
            List<ParkingRecord> parkingCars = await _context.ParkingRecords.ToListAsync();

            return parkingCars;
        }
        catch (Exception ex)
        {
            throw;
        }
    }
}
