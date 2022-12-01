using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
        }
        [HttpPut]
        public async Task<IActionResult> EditProfile(EditDetails.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
        [HttpGet("{username}/activities")]
        public async Task<IActionResult> GetProfileActivities(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new UserActivities.Query { Username = username, Predicate = predicate, }));
        }
    }
}