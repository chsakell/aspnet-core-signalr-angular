using System;

namespace LiveGameFeed.Models
{
    public class MatchScore
    {
        public int MatchId { get; set; }
        public int HostScore { get; set; }
        public int GuestScore {get; set;}
    }
}
