﻿using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly DataContext _context;

        public ProductsController(DataContext context)
        {
            _context = context; 
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetActivities()
        {
            return await _context.Products.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetActivity(Guid id)
        {
            return await _context.Products.FindAsync(id);
        }
    }
}
