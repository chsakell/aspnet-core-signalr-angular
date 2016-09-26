using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ChatLe.Controllers
{
    public class HomeController : Controller
    {
        static ILogger _logger;
        public HomeController(ILoggerFactory factory)
        {
            if (_logger == null)
                _logger = factory.CreateLogger("Unhandled Error");
        }


        public IActionResult Index()
        {
            return View();
        }
    }
}