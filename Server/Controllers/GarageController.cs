using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Utils;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GarageController : ControllerBase
{
    private readonly UtronDbContext _context;
    private readonly GarageModel _garage;

    public GarageController(UtronDbContext context)
    {
        _context = context;
        _garage = new(_context);
    }

    // adding vehicle to db

    [HttpPost("checkIn")]
    public async Task<IActionResult> CheckInVehicle([FromBody] VehicleModel vehicle)
    {
        try
        {
            ParkingRecord pr = await _garage.CheckInVehicle(vehicle);
            if (pr == null)
                return BadRequest();
            return Ok(pr);
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    // delete vehicle to db

    [HttpDelete("checkout/{LicensePlateID}")]
    public async Task<IActionResult> CheckoutVehicle(string licensePlateID)
    {
        try
        {
            ParkingRecord parkingRecord = await _garage.CheckoutVehicle(licensePlateID);
            if (parkingRecord != null)
                return Ok(parkingRecord);
            return NotFound(parkingRecord);
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }

    [HttpGet("getSuitableTickets")]
    public async Task<IActionResult> GetVehicleTicketsOptions(
        [FromQuery] int height,
        [FromQuery] int width,
        [FromQuery] int length
    )
    {
        Dimensions d = new(height, width, length);
        try
        {
            return Ok(await _garage.GetSuitableTicketByDimenetions(d));
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    [HttpGet("checkFit")]
    public async Task<IActionResult> GetVehicleTicketsOptions(
        [FromQuery] int height,
        [FromQuery] int width,
        [FromQuery] int length,
        [FromQuery] string TicketType
    )
    {
        bool canFit = false;
        Dimensions d = new(height, width, length);
        try
        {
            List<Ticket> tickets = await _garage.GetSuitableTicketByDimenetions(d);
            tickets.ForEach(ticket =>
            {
                if (ticket.Type == TicketType)
                    canFit = true;
            });
            return Ok(canFit);
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    [HttpGet("ticketParkingCars/{ticketType}")]
    public async Task<IActionResult> GetParkingCarsByTicket(string ticketType)
    {
        try
        {
            
           return Ok(await _garage.GetParkingCarsByTicket(ticketType));
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    [HttpGet("garageStatus")]
    public async Task<IActionResult> GetGarageStatus()
    {
        try
        {
            return Ok(await _garage.GetGarageStatus());
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    [HttpPost("insertFive")]
    [HttpGet("vehicleClasses")]
    public IActionResult GetVehicelClasses()
    {
        return Ok(Consts.vehicleClasses);
    }

    [HttpGet("Tickets")]
    public IActionResult GetTickets()
    {
        return Ok(Consts.OptionalTickets);
    }
}
