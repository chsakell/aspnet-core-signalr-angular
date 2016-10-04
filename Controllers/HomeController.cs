using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using LiveGameFeed.Controllers;
using LiveGameFeed.Core.MvcTimer;
using LiveGameFeed.Data.Abstract;
using LiveGameFeed.Data.Repositories;
using LiveGameFeed.Hubs;
using LiveGameFeed.Models;
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
                              ITimerService timerService,
                              IMatchRepository matchRepository,
                              IFeedRepository feedRepository)
        : base(signalRConnectionManager)
        {
            _matchRepository = matchRepository;
            _feedRepository = feedRepository;
            // timerService.TimerElapsed += _feed_Generate;
        }

        public IActionResult Index()
        {
            return View();
        }

        private async void _feed_Generate(object sender, EventArgs e)
        {
            TimerEventArgs eventsArgs = e as TimerEventArgs;
            System.Diagnostics.Debug.WriteLine("hello from home ApiHubController.cs..");
            lock (this.lockOb)
            {
                UpdateScores();
            }
            //await Clients.All.userConnected(DateTime.Now);
            //_coolMessageHubContext.Clients.All.newCpuValue(eventsArgs.Value);
        }

        private async void UpdateScores()
        {
            Random r = new Random();
            bool updateHost = r.Next(0, 2) == 0;

            IEnumerable<Match> matches = _matchRepository.GetAll();

            foreach (var match in matches)
            {
                if (updateHost)
                {
                    match.HostScore = match.HostScore + 2;
                    Feed feed = new Feed()
                    {
                        Description = "2 points for " + match.Host + "!",
                        CreatedAt = DateTime.Now,
                        MatchId = match.Id
                    };

                    match.Feeds.Add(feed);
                }
                else
                {
                    match.GuestScore = match.GuestScore + 2;
                    Feed feed = new Feed()
                    {
                        Description = "2 points for " + match.Guest + "!",
                        CreatedAt = DateTime.Now,
                        MatchId = match.Id
                    };
                    match.Feeds.Add(feed);
                }

                _matchRepository.Commit();
                MatchViewModel _matchVM = Mapper.Map<Match, MatchViewModel>(match);
                FeedViewModel _feedVM = Mapper.Map<Feed, FeedViewModel>(match.Feeds.Last());
                await Clients.All.updateMatch(_matchVM);
                await Clients.Group(match.Id.ToString()).addFeed(_feedVM);
            }
        }
    }
}