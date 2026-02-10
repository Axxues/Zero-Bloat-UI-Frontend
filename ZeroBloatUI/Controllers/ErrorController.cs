using Microsoft.AspNetCore.Mvc;

namespace ZeroBloatUI.Controllers
{
    public class ErrorController : Controller
    {
        [Route("Errors/Error{statusCode}")]
        public IActionResult HandleError(int statusCode)
        {
            if (statusCode == 404)
            {
                return View("404"); // Create a NotFound.cshtml view
            }

            return View("Error"); // Handle 500s, etc.
        }
    }
}
