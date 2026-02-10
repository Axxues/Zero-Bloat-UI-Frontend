using Microsoft.AspNetCore.Mvc;

namespace ZeroBloatUI.Controllers
{
    public class ProjectController : Controller
    {
        //[Route("Project/Templates")]
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Details()
        {
            return View();
        }
    }
}
