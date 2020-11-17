using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wevo.API.Domain.Implementacoes;
using Wevo.API.Domain.Interfaces;
using Wevo.API.Domain.Models;
using Wevo.API.Infra.Context;
using Wevo.API.Infra.Exceptions;

namespace Wevo.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers(options =>
            {
                options.Filters.Add(new ApiExceptionFilter());
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1",new OpenApiInfo { Title = "Wevo.API",Version = "v1" });
            });

            var connectionString = Configuration.GetConnectionString("WevoConnection");

            services.AddDbContext<WevoContext>(options =>
            {
                options.UseSqlServer(connectionString);
            });

            var corsBuilder = new CorsPolicyBuilder();
            corsBuilder.AllowAnyHeader();
            corsBuilder.AllowAnyMethod();
            corsBuilder.AllowAnyOrigin();
            corsBuilder.WithExposedHeaders("X-Pagination");

            services.AddCors(options =>
            {
                options.AddPolicy("SiteCorsPolicy",corsBuilder.Build());
            });

            services.AddScoped<IUserRepository,UserRepository>();
            services.AddScoped<IRepositoryBase<User>,RepositoryBase<User>>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app,IWebHostEnvironment env)
        {
            if(env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json","Wevo.API v1"));
            }

            app.UseCors("SiteCorsPolicy");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
