using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Wevo.API.Infra.Exceptions
{
    public class ApiExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            ResponseError responseError;

            if(context != null)
            {
                if(context.Exception is IWevoException)
                {
                    var ex = context.Exception as IWevoException;

                    context.HttpContext.Response.StatusCode = ex.StatusCode;
                    responseError = new ResponseError(context.Exception.Message,ex.StatusCode);
                }
                else
                {
                    var message = context.Exception.GetBaseException().Message;
                    //string stackTrace = context.Exception.StackTrace;

                    responseError = new ResponseError(message,500);
                    context.HttpContext.Response.StatusCode = 500;
                }

                context.Result = new JsonResult(responseError);
                context.ExceptionHandled = true;
            }

            base.OnException(context);
        }
    }
}
