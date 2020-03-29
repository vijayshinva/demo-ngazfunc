using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
            base.OnModelCreating(modelBuilder);
        }
    }
}
