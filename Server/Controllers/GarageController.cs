using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Utils;
using SQLitePCL;

namespace Server.Controllers;

[ApiController]
[Route("[controller]")]
public class GarageController : ControllerBase
{
    private readonly UtronDbContext _context;

    public GarageController(UtronDbContext context)
    {
        _context = context;
    }

    [HttpPost("/checkIn/{LicensePlateID}")]
    public async Task<IActionResult> CheckInVehicle([FromBody] VehicleModel vehicle)
    {
        return Ok(await Garage.GetFreeParkingLotByTicketType(Consts.TicketTypes.VIP, _context));
    }

    [HttpGet("/checkIn")]
    public async Task<IActionResult> GetFreeParkingLots()
    {
        return Ok(await Garage.GetFreeParkingLotByTicketType(Consts.TicketTypes.VIP, _context));
    }
}
