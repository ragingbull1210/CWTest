using Application.Products;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id});
        }
    }
}
