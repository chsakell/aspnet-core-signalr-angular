using System;

namespace LiveGameFeed.Core.MvcTimer
{
    public class TimerEventArgs : EventArgs
    {
        public TimerEventArgs(int value)
        {
            Value = value;
        }

        public int Value { get; }
    }
}