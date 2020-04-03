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
            int.TryParse(req.Query["pageSize"], out int pageSize);
            int.TryParse(req.Query["pageIndex"], out int pageIndex);
            pageSize = pageSize == 0 ? 10 : pageSize;

            log.LogInformation($"Volcanofunction processed a request. {pageSize} {pageIndex}");
            var volcanoes = await volcanoDbContext.Volcanoes.Skip(pageIndex * pageSize).Take(pageSize).ToListAsync();
            return new OkObjectResult(volcanoes);
        }
    }
}
