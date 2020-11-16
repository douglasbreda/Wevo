using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wevo.API.Infra.Exceptions
{
    public class ResponseError
    {
        #region [Properties]

        public string message { get; set; }

        public int statusCode { get; set; }

        #endregion

        #region [Constructor]

        public ResponseError(string message,int statusCode)
        {
            this.message = message;
            this.statusCode = statusCode;
        }

        #endregion
    }
}
