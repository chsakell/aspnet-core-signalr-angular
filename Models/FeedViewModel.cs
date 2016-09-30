using System;

namespace LiveGameFeed.Models
{
    public class FeedViewModel : IEntityBase
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public int MatchId { get; set; }
    }
}
