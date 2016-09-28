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
                    Host = "Panathinaikos",
                    Guest = "Olimpiakos",
                    HostScore = 3,
                    GuestScore = 1,
                    MatchDate = DateTime.Now,
                    League = "FootballLeauge",
                    Feeds = new List<Feed>
                    {
                        new Feed()
                        {
                            Description = "Match started",
                            MatchId = 1
                        },
                         new Feed()
                        {
                            Description = "Goal for Panathinaikos",
                            MatchId = 1
                        },
                    }
                };
                Match match_02 = new Match
                {
                    Host = "Real Madrit FC",
                    Guest = "Barchelona",
                    HostScore = 5,
                    GuestScore = 3,
                    MatchDate = DateTime.Now,
                    League = "Spanish League",
                    Feeds = new List<Feed>
                    {
                        new Feed()
                        {
                            Description = "Match started",
                            MatchId = 2
                        },
                         new Feed()
                        {
                            Description = "Goal for Real Madrid",
                            MatchId = 2
                        },
                    }
                };

                context.Matches.Add(match_01); context.Matches.Add(match_02);

                context.SaveChanges();
            }
        }
    }
}