using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Wevo.API.Domain.Interfaces;
using Wevo.API.Infra.Context;
using Wevo.API.Infra.Exceptions;

namespace Wevo.API.Domain.Implementacoes
{
    public class RepositoryBase<TEntity> : IRepositoryBase<TEntity> where TEntity : class
    {
        #region [Properties]

        private readonly WevoContext _context;

        #endregion

        #region [Constructor]

        public RepositoryBase(WevoContext context)
        {
            _context = context;
        }

        #endregion

        #region IRepositorioBase

        public string Create(TEntity entity)
        {
            _context.Set<TEntity>().Add(entity);
            _context.SaveChanges();

            return "Registers inserted successfully";
        }

        public bool Delete(int id)
        {
            TEntity entityToDelete = _context.Set<TEntity>().Find(id);

            if(entityToDelete != null)
            {
                _context.Set<TEntity>().Remove(entityToDelete);
                _context.SaveChanges();

                return true;
            }

            return false;
        }

        public IEnumerable<TEntity> Get()
        {
            return _context.Set<TEntity>().ToList();
        }

        public TEntity GetById(int id)
        {
            var entity = _context.Set<TEntity>().Find(id);

            if(entity == null)
                throw new ApiException($"{typeof(TEntity).Name} não encontrado com esse id",404);

            return entity;
        }

        public bool Update(TEntity entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            _context.SaveChanges();

            return true;
        }

        #endregion
    }
}
