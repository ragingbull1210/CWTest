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
            RuleFor(x => x.Name)
                .NotEmpty()
                .MaximumLength(100)
                .WithMessage("Please ensure that product name you have entered is less than 100 characters.");

            RuleFor(x => x.Price)
                .NotEmpty()
                .GreaterThan(0)
                .WithMessage("Please ensure that price you have entered needs to be great than 0.");

            RuleFor(x => x.Type)
                .NotEmpty()
                .Must(x => (new List<string>() { "Books", "Electronics", "Food", "Furniture", "Toys" })
                .Contains(x))
                .WithMessage("Please ensure product type belongs to either 'Books', 'Electronics', 'Food', 'Furniture' or 'Toys' category.");

            RuleFor(x => x.Active)
                .NotNull()
                .Must(x => x == true || x == false)
                .WithMessage("Please ensure the active field is a Boolean i.e. True or False");
        }
    }
}
