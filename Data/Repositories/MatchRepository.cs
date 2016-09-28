using LiveGameFeed.Data.Abstract;
using LiveGameFeed.Models;

namespace LiveGameFeed.Data.Repositories
{
    public class MatchRepository : EntityBaseRepository<Match>, IMatchRepository
    {
        public MatchRepository(LiveGameContext context)
            : base(context)
        { }
    }
}
