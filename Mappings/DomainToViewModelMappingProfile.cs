using AutoMapper;
using LiveGameFeed.Models;

namespace LiveGameFeed.Mappings
{
    public class DomainToViewModelMappingProfile : Profile
    {
        protected override void Configure()
        {
            Mapper.CreateMap<Match, MatchViewModel>();
            Mapper.CreateMap<Feed, FeedViewModel>();
        }
    }
}
