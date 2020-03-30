using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace VolcanoApi
{
    public class VolcanoDbContext : DbContext
    {
        public VolcanoDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Volcano> Volcanoes { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var volcanoes = JsonConvert.DeserializeObject<IEnumerable<Volcano>>(File.ReadAllText("VolcanoData.json"));
            modelBuilder.Entity<Volcano>().HasData(volcanoes);
            base.OnModelCreating(modelBuilder);
        }
    }
}
