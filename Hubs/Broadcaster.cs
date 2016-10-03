using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace LiveGameFeed.Hubs
{
    public class Broadcaster : Hub
    {
        public override Task OnConnected()
        {
            return Clients.All.userConnected("New connection " + Context.ConnectionId);
        }
        public Task Broadcast(string message)
        {
            return Clients.All.messageReceived(Context.ConnectionId + "> " + message);
        }

        public Task Subscribe(int matchId)
        {
            return Groups.Add(Context.ConnectionId, matchId.ToString());
        }

        public Task Unsubscribe(int matchId)
        {
            return Groups.Remove(Context.ConnectionId, matchId.ToString());
        }
    }
}