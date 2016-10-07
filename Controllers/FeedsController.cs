using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using LiveGameFeed.Hubs;
using LiveGameFeed.Data.Abstract;
using LiveGameFeed.Models;
using AutoMapper;

namespace LiveGameFeed.Controllers
{
    [Route("api/[controller]")]
    public class FeedsController : ApiHubController<Broadcaster>
    {
        IFeedRepository _feedRepository;
        IMatchRepository _matchRepository;
        public FeedsController(
            IConnectionManager signalRConnectionManager,
            IFeedRepository feedRepository,
            IMatchRepository matchRepository)
        : base(signalRConnectionManager)
        {
            _feedRepository = feedRepository;
            _matchRepository = matchRepository;
        }

        // POST api/feeds
        [HttpPost]
        public async void Post([FromBody]FeedViewModel feed)
        {
            Match _match = _matchRepository.GetSingle(feed.MatchId);
            Feed _matchFeed = new Feed() 
            {
                Description = feed.Description,
                CreatedAt = feed.CreatedAt,
                MatchId = feed.MatchId
            };

            _match.Feeds.Add(_matchFeed);

            _matchRepository.Commit();

            FeedViewModel _feedVM = Mapper.Map<Feed, FeedViewModel>(_matchFeed);

            await Clients.Group(feed.MatchId.ToString()).addFeed(_feedVM);
        }

    }
}
