using Microsoft.AspNetCore.Mvc;
using Server.Models;

namespace Server.Controllers;

[ApiController]
[Route("[controller]")]
public class GarageController : ControllerBase
{
    [HttpPost("/checkIn/{LicensePlateID}")]
    public async Task<IActionResult> CheckInVehicle([FromBody] VehicleModel vehicle)
    {
        return Ok();
    }
}
