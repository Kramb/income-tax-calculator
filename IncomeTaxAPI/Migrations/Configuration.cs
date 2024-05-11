namespace IncomeTaxAPI.Migrations
{
	using System;
	using System.Data.Entity;
	using System.Data.Entity.Migrations;
	using System.Linq;

	internal sealed class Configuration : DbMigrationsConfiguration<IncomeTaxAPI.Models.IncomeTaxAPIDbContext>
	{
		public Configuration()
		{
			AutomaticMigrationsEnabled = false;
		}

		protected override void Seed(IncomeTaxAPI.Models.IncomeTaxAPIDbContext context)
		{

		}
	}
}
