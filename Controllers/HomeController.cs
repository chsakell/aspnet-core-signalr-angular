using Microsoft.AspNetCore.Mvc;

namespace LiveGameFeed.Controllers
{
    public class HomeController : Controller
    {
        public HomeController() { }

        public IActionResult Index()
        {
            return View();
        }
    }
}