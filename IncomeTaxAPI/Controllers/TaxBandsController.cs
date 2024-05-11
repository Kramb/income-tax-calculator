using IncomeTaxAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace IncomeTaxAPI.Controllers
{
	[RoutePrefix("api/taxBands")]
	public class TaxBandsController : ApiController
	{
		readonly IncomeTaxAPIDbContext db = new IncomeTaxAPIDbContext();
		[HttpGet, Route("")]
		public IHttpActionResult Get()
		{
			var taxBands = new List<TaxBand>();
			try
			{
				taxBands = db.TaxBands
					.OrderByDescending(x => x.IsEnabled)
					.ThenBy(x => x.LowerLimit)
					.ToList();
			}
			catch (Exception ex)
			{
				return InternalServerError(ex);
			}
			return Ok(taxBands);
		}
	}
}