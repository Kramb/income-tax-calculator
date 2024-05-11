namespace IncomeTaxAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Employee",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        LastName = c.String(),
                        FirstName = c.String(),
                        Salary = c.Double(nullable: false),
                        IsEnabled = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.TaxBand",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        LowerLimit = c.Double(nullable: false),
                        UpperLimit = c.Double(),
                        Percentage = c.Double(nullable: false),
                        IsEnabled = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.TaxBand");
            DropTable("dbo.Employee");
        }
    }
}
