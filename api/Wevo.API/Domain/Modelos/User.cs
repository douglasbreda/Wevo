using System;

namespace Wevo.API.Domain.Models
{
    public class User
    {
        #region [Propriedades]

        public int Id { get; set; }

        public string Nome { get; set; }

        public string CPF { get; set; }

        public string Email { get; set; }

        public string Telefone { get; set; }

        public int? Sexo { get; set; }

        public DateTime? DataNascimento { get; set; }

        #endregion
    }
}
