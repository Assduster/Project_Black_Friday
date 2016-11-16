using System.Web;
using System.Web.Optimization;

namespace WU16.Kompassen.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jquerylibs").Include(
                        "~/scripts/jquery.validate*",
                        "~/scripts/jquery.easing*"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                        "~/scripts/sitecore/app.js",
                        "~/scripts/sitecore/students.js",
                        "~/scripts/sitecore/courses.js",
                        "~/scripts/sitecore/init.js",
                        "~/scripts/sitecore/layout.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/scripts/bootstrap.js",
                      "~/scripts/respond.js"));

            //bundles.Add(new ScriptBundle("~/bundles/app").Include(
            //          "~/scripts/core/utilities.js",
            //          "~/scripts/core/page.js",
            //          "~/scripts/core/app.js",
            //          "~/scripts/core/eventhandlers.js",
            //          "~/scripts/core/waiting-dialog.js"));

            bundles.Add(new StyleBundle("~/style/css").Include(
                      "~/style/bootstrap.css",
                      "~/style/site.css"));
        }
    }
}
