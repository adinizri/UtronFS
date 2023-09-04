using Server.Utils;

namespace Server.Models
{
    public class Dimensions
    {
        public int Height { get; set; }
        public int Width { get; set; }
        public int Length { get; set; }

        public Dimensions(int height, int width, int length)
        {
            Height = height;
            Width = width;
            Length = length;
        }

        public static bool ValidateVehicleDimensions(
            Dimensions vehicleDimensions,
            Dimensions dimensions,
            Consts.TicketTypes ticketType
        )
        {
            if (ticketType != Consts.TicketTypes.VIP)
                return vehicleDimensions.Height <= dimensions.Height
                    && vehicleDimensions.Width <= dimensions.Width
                    && vehicleDimensions.Length <= dimensions.Length;
            else
                return true;
        }
    }
}
