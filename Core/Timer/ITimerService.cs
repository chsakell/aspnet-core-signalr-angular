using System;

namespace LiveGameFeed.Core.MvcTimer
{
    public interface ITimerService
    {
        event EventHandler TimerElapsed;
    }
}