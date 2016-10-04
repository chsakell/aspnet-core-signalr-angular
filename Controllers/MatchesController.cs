using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using LiveGameFeed.Hubs;
using LiveGameFeed.Data.Abstract;
using LiveGameFeed.Models;
using AutoMapper;

namespace LiveGameFeed.Controllers
{
    [Route("api/[controller]")]
    public class MatchesController : ApiHubController<Broadcaster>
    {
        IMatchRepository _matchRepository;
        public MatchesController(
            IConnectionManager signalRConnectionManager,
            IMatchRepository matchRepository)
        : base(signalRConnectionManager)
        {
            _matchRepository = matchRepository;
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<MatchViewModel> Get()
        {
            IEnumerable<Match> _matches = _matchRepository.GetAll();
            IEnumerable<MatchViewModel> _matchesVM = Mapper.Map<IEnumerable<Match>, IEnumerable<MatchViewModel>>(_matches);

            return _matchesVM;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public MatchViewModel Get(int id)
        {
            Match _match = _matchRepository.GetSingle(id);
            MatchViewModel _matchVM = Mapper.Map<Match, MatchViewModel>(_match);
            return _matchVM;
        }

        // POST api/values
        [HttpPost("update", Name = "UpdateScore")]
        public void UpdateScore([FromBody]MatchScore matchScore)
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
