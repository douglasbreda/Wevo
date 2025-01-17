﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Wevo.API.Domain.Interfaces;
using Wevo.API.Domain.Models;
using Wevo.API.Infra.Exceptions;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Wevo.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        #region [Properties]

        private readonly IUserRepository _repository;

        #endregion

        #region [Constructor]

        public UserController(IUserRepository userRepository)
        {
            _repository = userRepository;
        }

        #endregion

        #region [HTTP Methods]

        // GET: api/<ValuesController>
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return _repository.Get();
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            return _repository.GetById(id);
        }

        // POST api/<ValuesController>
        [HttpPost]
        public void Post([FromBody] User value)
        {
            Validate(value);

            _repository.Create(value);
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id,[FromBody] User value)
        {
            Validate(value);

            if(id != value?.Id)
                throw new ApiException("O valor do id é diferente do id do objeto");

            _repository.Update(value);
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _repository.Delete(id);
        }

        #endregion

        #region [General Methods]

        private void Validate(User user)
        {
            if(user.Id > 0)
            {
                if(_repository.GetQueryable().Where(x => x.Id != user.Id && x.CPF.Equals(user.CPF)).Any())
                    throw new ApiException("CPF já cadastrado");

                if(_repository.GetQueryable().Where(x => x.Id != user.Id && x.Email.Equals(user.Email)).Any())
                    throw new ApiException("Email já cadastrado");
            }
            else
            {
                if(_repository.GetQueryable().Where(x => x.CPF.Equals(user.CPF)).Any())
                    throw new ApiException("CPF já cadastrado");

                if(_repository.GetQueryable().Where(x => x.Email.Equals(user.Email)).Any())
                    throw new ApiException("Email já cadastrado");
            }


        }

        #endregion
    }
}
