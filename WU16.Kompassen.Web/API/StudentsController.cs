using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using WU16.Kompassen.Web.DataAccess;
using WU16.Kompassen.Web.Models;

namespace WU16.Kompassen.Web.API
{
    public class StudentsController : ApiController
    {
        private DefaultDataContext db = new DefaultDataContext();

        public IEnumerable<Student> Get()
        {
            var students = db.Students.Include("Courses").OrderByDescending(x => x.Active);

            return students;
        }

        public Student Get(int id)
        {
            return db.Students.FirstOrDefault(x => x.Id == id);
        }

        public string Post(Student student)
        {
            if (student.Id > 0) // Save
            {
                db.Entry(student).State = EntityState.Modified;
            }
            else // Add
            {
                db.Students.Add(student);
            }

            db.SaveChanges();

            return string.Format("{0} {1}", student.FirstName, student.LastName);       
        }

        [HttpDelete]
        public void Delete(int id)
        {
            var student = db.Students.Find(id);
            db.Students.Remove(student);

            db.SaveChanges();
        }
    }
}