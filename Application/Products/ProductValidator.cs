using Domain;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Products
{
    public class ProductValidator: AbstractValidator<Product>
    {
        public ProductValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
            RuleFor(x => x.Price).NotEmpty().GreaterThan(0).ScalePrecision(15,2);
            RuleFor(x => x.Type).NotEmpty().Must(x => (new List<string>() { "Books", "Electronics", "Food", "Furniture", "Toys" }).Contains(x));
            RuleFor(x => x.Active).NotEmpty().Must(x => x == true || x == false);
        }
    }
}
