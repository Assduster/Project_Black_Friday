using System.Collections.Generic;

namespace WU16.Kompassen.Web.Models
{
    public class Student
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string SSN { get; set; }

        public bool Active { get; set; }

        public Status Status { get; set; }

        public List<Course> Courses { get; set; }

        public Student()
        {
            Courses = new List<Course>();
        }
    }
}