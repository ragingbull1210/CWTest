using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly IMediator _mediator;

        public ProductsController(IMediator mediator)
        {
            _mediator = mediator; 
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetActivities()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetActivity(Guid id)
        {
            return Ok();
        }
    }
}
