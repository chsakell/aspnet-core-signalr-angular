using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using LiveGameFeed.Data.Abstract;
using LiveGameFeed.Models;
using Microsoft.Extensions.Logging;
using RecurrentTasks;

namespace LiveGameFeed.Core
{
    public class FeedEngine : IRunnable
    {
        private ILogger logger;
        IMatchRepository _matchRepository;
        private string _apiURI = "http://localhost:5000/api/";

        public FeedEngine(IMatchRepository matchRepository,
                          ILogger<FeedEngine> logger)
        {
            this.logger = logger;
            this._matchRepository = matchRepository;
        }
        public void Run(TaskRunStatus taskRunStatus)
        {
            var msg = string.Format("Run at: {0}", DateTimeOffset.Now);
            logger.LogDebug(msg);
            UpdateScore();
        }

        private async void UpdateScore()
        {
            IEnumerable<Match> _matches = _matchRepository.GetAll();

            foreach (var match in _matches)
            {
                Random r = new Random();
                bool updateHost = r.Next(0, 2) == 1;
                if (updateHost)
                    match.HostScore += 2;
                else
                    match.GuestScore += 2;

                MatchScore score = new MatchScore()
                {
                    HostScore = match.HostScore,
                    GuestScore = match.GuestScore
                };

                using (var client = new HttpClient())
                {
                    await client.PutAsJsonAsync<MatchScore>(_apiURI + "matches/" + match.Id, score);
                }
            }
        }
    }
}