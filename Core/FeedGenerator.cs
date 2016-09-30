using System;
using System.Collections.Generic;
using LiveGameFeed.Models;

namespace LiveGameFeed.Core
{
    public class FeedGenarator
    {
        public static Feed UpdateScore(Match match) {
            Feed feed = new Feed();
            feed.MatchId = match.Id;

            if(match.Type == MatchTypeEnums.Football)
            {

            }
            else if (match.Type == MatchTypeEnums.Basketball)
            {

            }

            return feed;
        }
    }
}