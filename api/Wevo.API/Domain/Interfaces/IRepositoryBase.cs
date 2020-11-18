using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wevo.API.Domain.Interfaces
{
    public interface IRepositoryBase<TEntity> where TEntity : class
    {
        #region [Definicoes]

        IEnumerable<TEntity> Get();

        TEntity GetById(int id);

        string Create(TEntity entity);

        bool Update(TEntity entity);

        bool Delete(int id);

        IQueryable<TEntity> GetQueryable();

        #endregion
    }
}
