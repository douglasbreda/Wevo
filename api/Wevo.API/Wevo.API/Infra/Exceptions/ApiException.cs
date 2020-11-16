using System;

namespace Wevo.API.Infra.Exceptions
{
    public class ApiException : Exception, IWevoException
    {
        #region IWevoException

        public int StatusCode { get; set; } = 500;

        #endregion

        #region [Constructor]

        public ApiException(string message) : base(message) { }

        public ApiException(string message,Exception innerException) : base(message,innerException) { }

        public ApiException(string message,int statusCode = 500) : base(message)
        {
            StatusCode = statusCode;
        }

        public ApiException() { }

        #endregion
    }
}
