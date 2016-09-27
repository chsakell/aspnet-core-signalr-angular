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
    }
}