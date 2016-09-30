using AutoMapper;
using LiveGameFeed.Models;

namespace LiveGameFeed.Core.Mappings
{
    public class DomainToViewModelMappingProfile : Profile
    {
        protected override void Configure()
        {
            Mapper.CreateMap<Match, MatchViewModel>()
                .ForMember(m => m.Type, map => map.MapFrom(m => m.Type.ToString()));
            Mapper.CreateMap<Feed, FeedViewModel>();
        }
    }
}
