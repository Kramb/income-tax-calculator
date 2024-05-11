namespace IncomeTaxAPI.Models
{
	using System;
	using System.Data.Entity;
	using System.Data.Entity.ModelConfiguration.Conventions;
	using System.Linq;

	public class IncomeTaxAPIDbContext : DbContext
	{
		public IncomeTaxAPIDbContext()
			: base("name=IncomeTaxAPIDbContext")
		{
			Database.SetInitializer(new MigrateDatabaseToLatestVersion<IncomeTaxAPIDbContext, Migrations.Configuration>());
		}
		public DbSet<Employee> Employees { get; set; }
		public DbSet<TaxBand> TaxBands { get; set; }
		protected override void OnModelCreating(DbModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
		}
	}
}