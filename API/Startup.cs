using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Persistence;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activities;
using Application.Core;
using AutoMapper;
using API.Extensions;
using FluentValidation.AspNetCore;
using API.Middleware;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Http.Features;
using API.SignalR;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
            _config = config;
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers(opt =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            })
            .AddFluentValidation(config =>
            {
                config.RegisterValidatorsFromAssemblyContaining<Create>();
            });

            services.AddApplicationService(_config);
            services.AddIdentityServices(_config);

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public async void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();

            app.UseXContentTypeOptions();

            app.UseReferrerPolicy(opt => opt.NoReferrer());

            app.UseXXssProtection(opt => opt.EnabledWithBlockMode());

            app.UseXfo(opt => opt.Deny());

            //Content-Security-Policy
            app.UseCsp(opt => opt
            .BlockAllMixedContent()
            .StyleSources(s => s.Self().CustomSources("https://fonts.googleapis.com", "https://cdn.jsdelivr.net"))
            .FontSources(s => s.Self().CustomSources("https://fonts.gstatic.com", "data:", "https://cdn.jsdelivr.net"))
            .FormActions(s => s.Self())
            .ImageSources(s => s.Self().CustomSources("https://res.cloudinary.com"))
            .ScriptSources(s => s.Self()) //"Refused to execute script becasue it violates the following Content security policy directive "script-src self" // didnt get this error though, need to put hash into custom source
            );


            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }

            else
            {
                app.Use(async (context, next) =>
                {
                    context.Response.Headers.Add("Strict-Transport-Secuirty", "max-age=31536000");
                    await next.Invoke();
                });
            }

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseDefaultFiles(); //going to look for anything in wwwroot folder and look for anything called index.html
            app.UseStaticFiles(); //by default serve static files from the wwwroot folder

            app.UseCors("CorsPolicy");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chat");
                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}
