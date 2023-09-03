
using System.Runtime.CompilerServices;
using Server.Utils;
namespace Server.Models;
class Garage
{

  
 public async Task<Boolean> CheckInVehicle(VehicleModel vehicle)
        {
            //ValidateVehicleDimensions

            if (
                Dimensions.ValidateVehicleDimensions(
                    vehicle.Dimensions,
                    Consts.OptionalTicket[vehicle.TicketType].Dimensions,
                    vehicle.TicketType
                )
            )
            {
                await Task.Run()
                //insert Vehicle to the parking spot
            }
            return 
            //if not suitable suggest suitable ticket
            //else
            //insert Vehicle to the parking spot
            
        }
       

        public static List<Consts.TicketTypes> GetSuitableTicketByDimenetions(
            Dimensions vehicleDimensions,
            IDictionary<Consts.TicketTypes, Ticket> Tickets
        )
        {
            List<Consts.TicketTypes> suitableTickets = new();
            foreach (KeyValuePair<Consts.TicketTypes, Ticket> ticketPair in Tickets)
            {
                Ticket ticket = ticketPair.Value;
                Consts.TicketTypes ticketType = ticketPair.Key;
                if (
                    Dimensions.ValidateVehicleDimensions(
                        vehicleDimensions,
                        ticket.Dimensions,
                        ticketType
                    )
                )
                {
                    suitableTickets.Add(ticketType);
                }
            }

            return suitableTickets;
        }

    // public List<ParkingTransactionModel> Transactions { get; set; }
}
