using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LiveGameFeed.Data;
using LiveGameFeed.Data.Repositories;
using LiveGameFeed.Data.Abstract;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using LiveGameFeed.Core.Mappings;
using Newtonsoft.Json.Serialization;
using RecurrentTasks;
using LiveGameFeed.Core;

namespace LiveGameFeed
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<LiveGameContext>(options => options.UseInMemoryDatabase());
            // Repositories
            services.AddSingleton<IMatchRepository, MatchRepository>();
            services.AddSingleton<IFeedRepository, FeedRepository>();

            // Automapper Configuration
            AutoMapperConfiguration.Configure();
            
            // Add framework services.
            services
                .AddMvc()
                .AddJsonOptions(options => options.SerializerSettings.ContractResolver = 
                    new DefaultContractResolver());

            services.AddSignalR(options => options.Hubs.EnableDetailedErrors = true);

            services.AddTask<FeedEngine>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseCors(
                builder => builder.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials())
                .UseStaticFiles()
                .UseWebSockets();
            /*
            .Map("/xhrf", a => a.Run(async context => 
            {
                var tokens = antiforgery.GetAndStoreTokens(context);
                context.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken, new CookieOptions() { HttpOnly = false });
                await context.Response.WriteAsync(tokens.RequestToken);
            }));
            */
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
            app.UseSignalR();

            LiveGameDbInitializer.Initialize(app.ApplicationServices);

            app.StartTask<FeedEngine>(TimeSpan.FromSeconds(15));
        }
    }
}
