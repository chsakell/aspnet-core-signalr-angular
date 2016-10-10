using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using LiveGameFeed.Models;

namespace LiveGameFeed.Hubs
{
    public class Broadcaster : Hub<IBroadcaster>
    {
        public override Task OnConnected()
        {
            // Set connection id for just connected client only
            return Clients.Client(Context.ConnectionId).SetConnectionId(Context.ConnectionId);
        }

        // Server side methods called from client
        public Task Subscribe(int matchId)
        {
            return Groups.Add(Context.ConnectionId, matchId.ToString());
        }

        public Task Unsubscribe(int matchId)
        {
            return Groups.Remove(Context.ConnectionId, matchId.ToString());
        }
    }

    public interface IBroadcaster
    {
        Task SetConnectionId(string connectionId);
        Task UpdateMatch(MatchViewModel match);
        Task AddFeed(FeedViewModel feed);
        Task AddChatMessage(ChatMessage message);
    }
}