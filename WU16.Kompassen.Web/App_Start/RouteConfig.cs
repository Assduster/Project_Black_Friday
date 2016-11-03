using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace WU16.Kompassen.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Start",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Start", action = "Index", id = UrlParameter.Optional }
            );

        }
    }
}
