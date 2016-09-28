using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LiveGameFeed.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace LiveGameFeed.Data
{
    public class LiveGameContext : DbContext
    {
        public DbSet<Match> Matches { get; set; }
        public DbSet<Feed> Feeds { get; set; }

        public LiveGameContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

             modelBuilder.Entity<Match>()
                .ToTable("Match");

            modelBuilder.Entity<Feed>()
                .ToTable("Feed");

            modelBuilder.Entity<Feed>()
                .Property(f => f.MatchId)
                .IsRequired();
        }
    }
}
