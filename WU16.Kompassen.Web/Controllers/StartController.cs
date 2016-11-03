using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WU16.Kompassen.Web.Controllers
{
    public class StartController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Kompassen - Alltid på rätt kurs";
            return View();
        }
    }
}