using Wevo.API.Domain.Interfaces;
using Wevo.API.Domain.Models;
using Wevo.API.Infra.Context;

namespace Wevo.API.Domain.Implementacoes
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(WevoContext context) : base(context) { }
    }
}
