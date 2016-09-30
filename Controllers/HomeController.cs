using System;
using LiveGameFeed.Controllers;
using LiveGameFeed.Core.MvcTimer;
using LiveGameFeed.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR.Infrastructure;

namespace ChatLe.Controllers
{
    public class HomeController : ApiHubController<Broadcaster>
    {
        public HomeController(IConnectionManager signalRConnectionManager,
                              ITimerService timerService)
        : base(signalRConnectionManager)
        {
            timerService.TimerElapsed += _feed_Generate;
        }

        public IActionResult Index()
        {
            return View();
        }

        private async void _feed_Generate(object sender, EventArgs e)
        {
            TimerEventArgs eventsArgs = e as TimerEventArgs;
            System.Diagnostics.Debug.WriteLine("hello from home ApiHubController.cs..");
            await Clients.All.userConnected(DateTime.Now);
            //_coolMessageHubContext.Clients.All.newCpuValue(eventsArgs.Value);
        }
    }
}