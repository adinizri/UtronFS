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
    private readonly Ticket _ticket;

    public TicketController(UtronDbContext context)
    {
        _context = context;
        _ticket = new(_context);
    }

<<<<<<< HEAD
=======
  

>>>>>>> b0679f0991d555bbadf4a2aad5ddb7379e159f30
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
            return Ok(await _ticket.GetSuitableTicketByDimenetions(d));
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
            List<Ticket> tickets = await _ticket.GetSuitableTicketByDimenetions(d);
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
<<<<<<< HEAD
            return Ok(await _ticket.GetParkingCarsByTicket(ticketType));
=======
            
           return Ok(await _ticket.GetParkingCarsByTicket(ticketType));
>>>>>>> b0679f0991d555bbadf4a2aad5ddb7379e159f30
        }
        catch (Exception ex)
        {
            throw;
        }
    }

<<<<<<< HEAD
    [HttpGet("Tickets")]
    public IActionResult GetTickets()
    {
        return Ok(Consts.OptionalTickets);
    }
=======

>>>>>>> b0679f0991d555bbadf4a2aad5ddb7379e159f30
}
