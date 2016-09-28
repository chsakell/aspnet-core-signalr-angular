using LiveGameFeed.Data.Abstract;
using LiveGameFeed.Models;

namespace LiveGameFeed.Data.Repositories
{
    public class FeedRepository : EntityBaseRepository<Feed>, IFeedRepository
    {
        public FeedRepository(LiveGameContext context)
            : base(context)
        { }
    }
}
