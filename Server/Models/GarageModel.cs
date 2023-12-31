using Server.Utils;

namespace Server.Models;

class GarageModel
{
    private readonly UtronDbContext _context;
    private readonly Ticket _ticket;
    private static readonly SemaphoreSlim insertVehicleLock = new(1, 1); //enble us to insert one vehicle at a time to avoid lot number collision

    public GarageModel(UtronDbContext context)
    {
        _context = context;
        _ticket = new Ticket(context);
    }

    //checkin in a vehicle

    public async Task<ParkingRecord> CheckInVehicle(VehicleModel vehicle)
    {
        try
        {
            await insertVehicleLock.WaitAsync();

            try
            {
                // Check if there are free lots
                List<int> ticketTypeFreeLots = await _ticket.GetFreeParkingLotByTicketType(
                    vehicle.TicketType
                );

                if (ticketTypeFreeLots.Count() > 0)
                {
                    ParkingRecord parkingRecord =
                        new()
                        {
                            LicensePlateID = vehicle.LicensePlateID,
                            ParkingDateTime = DateTime.Now,
                            LotNumber = ticketTypeFreeLots[0],
                            PhoneNumber = vehicle.Phone,
                            Name = vehicle.Name
                        };

                    _context.ParkingRecords.Add(parkingRecord);
                    await _context.SaveChangesAsync();
                    return parkingRecord;
                }

                return null;
            }
            finally
            {
                insertVehicleLock.Release();
            }
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    //removeVehicle from Garage
    public async Task<ParkingRecord> CheckoutVehicle(string licensePlateID)
    {
        try
        {
            ParkingRecord parkingRecord = await _context.ParkingRecords.FindAsync(licensePlateID);

            if (parkingRecord == null)
            {
                return parkingRecord;
            }

            _context.ParkingRecords.Remove(parkingRecord);

            await _context.SaveChangesAsync();
            return parkingRecord;
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    //return all vehicles in the garage
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
