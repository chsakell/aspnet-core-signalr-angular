using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using LiveGameFeed.Hubs;
using LiveGameFeed.Models;

namespace LiveGameFeed.Controllers
{
    [Route("api/[controller]")]
    public class MessagesController : ApiHubController<Broadcaster>
    {
        public MessagesController(
            IConnectionManager signalRConnectionManager)
        : base(signalRConnectionManager)
        {

        }

        // POST api/messages
        [HttpPost]
        public void Post([FromBody]ChatMessage message)
        {
            this.Clients.Group(message.MatchId.ToString()).addChatMessage(message);
        }
    }
}
