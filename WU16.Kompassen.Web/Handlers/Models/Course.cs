using System.Collections.Generic;

namespace WU16.Kompassen.Web.Models
{
    public class Course    
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Term { get; set; }

        public string Year { get; set; }
        
        public string Credits { get; set; }

        public List<Student> Students { get; set; }

        public bool Active { get; set; }
        
        public Course()
        {
            Students = new List<Student>();
        }
    }
}