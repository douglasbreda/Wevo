namespace Wevo.API.Infra.Exceptions
{
    public interface IWevoException
    {
        int StatusCode { get; set; }
    }
}
