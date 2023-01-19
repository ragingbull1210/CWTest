using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Products.Any()) return;

            var products = new List<Product>
            {
                new Product
                {
                    Name = "Harry Potter and the Goblet of Fire",
                    Price = 29.99M,
                    Type = "Books",
                    Active = true,
                },
                new Product
                {
                    Name = "Macbook Pro",
                    Price = 1999.99M,
                    Type = "Electronics",
                    Active = true,
                },
                new Product
                {
                    Name = "Pizza",
                    Price = 15.20M,
                    Type = "Food",
                    Active = false,
                },
                new Product
                {
                    Name = "Standing Desk",
                    Price = 481.89M,
                    Type = "Furniture",
                    Active = true,
                },
                new Product
                {
                    Name = "Batman Action Figure",
                    Price = 15.50M,
                    Type = "Toys",
                    Active = true,
                },
                new Product
                {
                    Name = "A Clockwork Orange",
                    Price = 22.50M,
                    Type = "Books",
                    Active = true,
                },
                new Product
                {
                    Name = "Samsung Galaxy Smart Watch",
                    Price = 479.99M,
                    Type = "Electronics",
                    Active = false,
                },
                new Product
                {
                    Name = "Fish and Chips",
                    Price = 7.99M,
                    Type = "Food",
                    Active = true,
                },
                new Product
                {
                    Name = "Ergonomic Office Chair",
                    Price = 399.99M,
                    Type = "Furniture",
                    Active = true,
                },
                new Product
                {
                    Name = "Lego Set",
                    Price = 34.99M,
                    Type = "Toys",
                    Active = false,
                },
                 new Product
                {
                    Name = "The Great Gatsby",
                    Price = 24.99M,
                    Type = "Books",
                    Active = true,
                },
                new Product
                {
                    Name = "Sennheiser Bluetooth Earphones",
                    Price = 679.99M,
                    Type = "Electronics",
                    Active = true,
                },
                new Product
                {
                    Name = "Cheeseburger",
                    Price = 8.90M,
                    Type = "Food",
                    Active = false,
                },
                new Product
                {
                    Name = "Coffee Table",
                    Price = 250.00M,
                    Type = "Furniture",
                    Active = true,
                },
                new Product
                {
                    Name = "Pokemon Action Figure",
                    Price = 18.99M,
                    Type = "Toys",
                    Active = true,
                },
            };

            await context.Products.AddRangeAsync(products);
            await context.SaveChangesAsync();
        }
    }
}
