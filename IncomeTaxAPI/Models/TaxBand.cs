using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IncomeTaxAPI.Models
{
	public class TaxBand
	{
		public int Id { get; set; }
		public double LowerLimit { get; set; }
		public double? UpperLimit { get; set; }
		public double Percentage { get; set; }
		public bool IsEnabled { get; set; }
	}
}