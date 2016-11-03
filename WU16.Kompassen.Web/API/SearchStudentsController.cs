using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using WU16.Kompassen.Web.DataAccess;
using WU16.Kompassen.Web.Models;
using System.Data.Entity;

namespace WU16.Kompassen.Web.API
{
    public class SearchStudentsController : ApiController
    {
        private DefaultDataContext db = new DefaultDataContext();

        [HttpGet]
        [Route("api/searchStudents/{query}")]
        public IEnumerable<Student> Get(string query)
        {
            var results = db.Students
                .Include(y => y.Courses).Where(x => x.FirstName.Contains(query) 
                || x.LastName.Contains(query) 
                || x.SSN.Contains(query));
    
            return results;
        }
    }
}
