using Server.Utils;

namespace Server.Models;

class GarageModel
{
    private readonly UtronDbContext _context;
    private readonly Ticket _ticket;

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
            // check if there free lots
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
