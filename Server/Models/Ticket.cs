namespace Server.Models;
public class Ticket
{
    public Consts.TicketTypes Type { get; set; }
    public int StartLot { get; set; }
    public int EndLot { get; set; }
    public Dimensions Dimensions { get; set; }
    public Consts.VehicleClassRank[] carClasses { get; set; }
    public int Cost { get; set; }
    public int TimeLimits { get; set; }

    public static bool ValidateCarDimensions(Dimensions carDimensions, Ticket ticket)
    {
        if (ticket.Type != Consts.TicketTypes.VIP)
            return carDimensions.Height <= ticket.Dimensions.Height && carDimensions.Width <= ticket.Dimensions.Width && carDimensions.Length <= ticket.Dimensions.Length;
        else
            return true;

    }
    public static List<Ticket> GetSuitableTicketByDimenetions(Dimensions carDimensions, Ticket[] tickets)
    {
        List<Ticket> optionalTickets = new();
        for (int i = 0; i < tickets.Length; i++)
        {
            if (ValidateCarDimensions(carDimensions, tickets[i]))
                optionalTickets.Add(tickets[i]);
        }
        return optionalTickets;
    }
}

