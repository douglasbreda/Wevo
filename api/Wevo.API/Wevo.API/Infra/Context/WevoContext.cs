using Microsoft.EntityFrameworkCore;
using Wevo.API.Domain.Models;

namespace Wevo.API.Infra.Context
{
    public class WevoContext : DbContext
    {
        #region [DbSets]

        public DbSet<User> User { get; set; }

        #endregion

        #region [Constructor]

        public WevoContext(DbContextOptions<WevoContext> options)
            : base(options) { }

        #endregion

        #region [Metodos]

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasKey(x => x.Id);

            modelBuilder.Entity<User>()
                        .Property(x => x.Nome)
                        .HasMaxLength(100)
                        .IsRequired();

            modelBuilder.Entity<User>()
                        .Property(x => x.CPF)
                        .HasMaxLength(14)
                        .IsRequired();

            modelBuilder.Entity<User>()
                        .Property(x => x.Telefone)
                        .HasMaxLength(20);

            modelBuilder.Entity<User>()
                        .Property(x => x.Email)
                        .HasMaxLength(100);
        }

        #endregion

    }
}
