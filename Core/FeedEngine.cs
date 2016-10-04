using System;
using System.Collections.Generic;
using LiveGameFeed.Models;
using Microsoft.Extensions.Logging;
using RecurrentTasks;

namespace LiveGameFeed.Core
{
    public class FeedEngine : IRunnable
    {
        private ILogger logger;

        public FeedEngine(ILogger<FeedEngine> logger)
        {
            this.logger = logger;
        }
        public void Run(TaskRunStatus taskRunStatus)
        {
            var msg = string.Format("Run at: {0}", DateTimeOffset.Now);
            logger.LogDebug(msg);
        }
    }
}