using IncomeTaxAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace IncomeTaxAPI.Controllers
{
	[RoutePrefix("api/employees")]
	public class EmployeesController : ApiController
	{
		readonly IncomeTaxAPIDbContext db = new IncomeTaxAPIDbContext();
		[HttpGet, Route("")]
		public IHttpActionResult Get()
		{
			var employees = new List<Employee>();
			try
			{
				employees = db.Employees
					.OrderByDescending(x => x.IsEnabled)
					.ThenBy(x => x.LastName)
					.ThenBy(x => x.FirstName)
					.ToList();
			}
			catch (Exception ex)
			{
				return InternalServerError(ex);
			}
			return Ok(employees);
		}
		[HttpPut, Route("{employeeId}")]
		public IHttpActionResult Update(int employeeId, Employee model)
		{
			try
			{
				var employee = db.Employees.Find(employeeId);
				if (employee == null) return NotFound();

				employee.Salary = model.Salary;
				db.Entry(employee).State = System.Data.Entity.EntityState.Modified;
				db.SaveChanges();
			}
			catch (Exception ex)
			{
				return InternalServerError(ex);
			}
			return Ok();
		}
	}
}