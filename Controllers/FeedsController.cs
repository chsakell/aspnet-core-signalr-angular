using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using LiveGameFeed.Hubs;
using LiveGameFeed.Data.Abstract;
using LiveGameFeed.Models;

namespace LiveGameFeed.Controllers
{
    [Route("api/[controller]")]
    public class FeedsController : ApiHubController<Broadcaster>
    {
        IFeedRepository _feedRepository;
        public FeedsController(
            IConnectionManager signalRConnectionManager,
            IFeedRepository feedRepository)
        : base(signalRConnectionManager)
        {
            _feedRepository = feedRepository;
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<Feed> Get()
        {
            IEnumerable<Feed> _feeds = _feedRepository.GetAll();

            return _feeds;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Feed Get(int id)
        {
            return _feedRepository.GetSingle(id);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
