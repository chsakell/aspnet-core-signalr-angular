using LiveGameFeed.Models;

namespace LiveGameFeed.Data.Abstract
{
    public interface IMatchRepository : IEntityBaseRepository<Match> { }

    public interface IFeedRepository : IEntityBaseRepository<Feed> { }

}
