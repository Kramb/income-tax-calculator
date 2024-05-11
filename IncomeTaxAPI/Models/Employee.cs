using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IncomeTaxAPI.Models
{
	public class Employee
	{
		public int Id { get; set; }
		public string LastName { get; set; }
		public string FirstName { get; set; }
		public double Salary { get; set; }
		public bool IsEnabled { get; set; }
	}
}