using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LiveGameFeed.Models;

namespace LiveGameFeed.Data
{
    public class LiveGameDbInitializer
    {
        private static LiveGameContext context;
        public static void Initialize(IServiceProvider serviceProvider)
        {
            context = (LiveGameContext)serviceProvider.GetService(typeof(LiveGameContext));

            InitializeSchedules();
        }

        private static void InitializeSchedules()
        {
            if (!context.Matches.Any())
            {
                Match match_01 = new Match
                {
                    Host = "Team 1",
                    Guest = "Team 2",
                    HostScore = 0,
                    GuestScore = 0,
                    MatchDate = DateTime.Now,
                    Type = "Football",
                    Feeds = new List<Feed>
                    {
                        new Feed()
                        {
                            Description = "Match started",
                            MatchId = 1
                        }
                    }
                };

                Match match_02 = new Match
                {
                    Host = "Team 3",
                    Guest = "Team 4",
                    HostScore = 0,
                    GuestScore = 0,
                    MatchDate = DateTime.Now,
                    Type = "Football",
                    Feeds = new List<Feed>
                    {
                        new Feed()
                        {
                            Description = "Match started",
                            MatchId = 2
                        }
                    }
                };

                Match match_03 = new Match
                {
                    Host = "Team 5",
                    Guest = "Team 6",
                    HostScore = 0,
                    GuestScore = 0,
                    MatchDate = DateTime.Now,
                    Type = "Basketball",
                    Feeds = new List<Feed>
                    {
                        new Feed()
                        {
                            Description = "Match started",
                            MatchId = 3
                        }
                    }
                };

                context.Matches.Add(match_01); context.Matches.Add(match_02); context.Matches.Add(match_03);

                context.SaveChanges();
            }
        }
    }
}