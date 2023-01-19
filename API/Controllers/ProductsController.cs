using Application.Products;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var result = await Mediator.Send(new List.Query());

            return HandleResult(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(Guid id)
        {
            var result = await Mediator.Send(new Details.Query { Id = id});

            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(Product product)
        {
            var result = await Mediator.Send(new Create.Command { Product = product });

            return HandleResult(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProduct(Guid id, Product product)
        {
            product.Id = id;
            var result = await Mediator.Send(new Edit.Command { Product = product });

            return HandleResult(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            var result = await Mediator.Send(new Delete.Command { Id = id });

            return HandleResult(result);
        }
    }
}
