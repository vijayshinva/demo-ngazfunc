using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Runtime.CompilerServices;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace VolcanoApi
{
    public class VolcanoApi
    {
        private readonly VolcanoDbContext volcanoDbContext;

        public VolcanoApi(VolcanoDbContext volcanoDbContext)
        {
            this.volcanoDbContext = volcanoDbContext;
            volcanoDbContext.Database.EnsureCreated();
        }

        [FunctionName("Volcano")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            var resultsPerPage = 10;
            var currentPage = 0;
            int.TryParse(req.Query["ResultsPerPage"], out resultsPerPage);
            int.TryParse(req.Query["CurrentPage"], out currentPage);

            var volcanoes = await volcanoDbContext.Volcanoes.Skip(currentPage * resultsPerPage).Take(resultsPerPage).ToListAsync();
            return new OkObjectResult(volcanoes);
        }
    }
}
