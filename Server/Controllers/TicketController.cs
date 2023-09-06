using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Utils;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TicketController : ControllerBase
{
    private readonly UtronDbContext _context;
    private readonly GarageModel _garage;

    public TicketController(UtronDbContext context)
    {
        _context = context;
        _garage = new(_context);
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


}
