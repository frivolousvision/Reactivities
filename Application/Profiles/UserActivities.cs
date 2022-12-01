using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Profiles
{
    public class UserActivities
    {
        public class Query : IRequest<Result<List<UserActivityDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            // private readonly ILogger _logger;
            public Handler(DataContext context, IMapper mapper)
            {
                // _logger = logger;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.ActivityAttendees
                .Where(a => a.AppUser.UserName == request.Username)
                .OrderBy(d => d.Activity.Date)
                .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                .AsQueryable();

                if (request.Predicate == "future")
                {
                    query = query.Where(x => x.Date >= DateTime.Now);
                }
                if (request.Predicate == "past")
                {
                    query = query.Where(x => x.Date < DateTime.Now);
                }
                if (request.Predicate == "hosting")
                {
                    query = query.Where(x => x.HostUsername == request.Username);
                }

                var activities = await query.ToListAsync();

                if (activities == null) return null;


                return Result<List<UserActivityDto>>.Success(activities);

            }
        }

    }
}