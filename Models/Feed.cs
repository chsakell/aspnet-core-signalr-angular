using System;

namespace LiveGameFeed.Models
{
    public class Feed : IEntityBase
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public int MatchId { get; set; }
        public Match Match { get; set; }
    }
}
