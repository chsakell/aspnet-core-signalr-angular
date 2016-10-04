using System;
using LiveGameFeed.Data.Abstract;
using LiveGameFeed.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR.Infrastructure;

namespace LiveGameFeed.Controllers
{
    public class HomeController : ApiHubController<Broadcaster>
    {
        IMatchRepository _matchRepository;
        IFeedRepository _feedRepository;

        private Object lockOb = new Object();
        public HomeController(IConnectionManager signalRConnectionManager,
                              IMatchRepository matchRepository,
                              IFeedRepository feedRepository)
        : base(signalRConnectionManager)
        {
            _matchRepository = matchRepository;
            _feedRepository = feedRepository;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}