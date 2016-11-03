using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace WU16.Kompassen.Web.Handlers
{
    public class XHttpMethodOverrideDelegatingHandler : DelegatingHandler
    {
        static readonly string[] httpOverrideMethods = { "PUT", "DELETE" };
        static readonly string[] accessControlAllowMethods = { "POST", "PUT", "DELETE" };
        static readonly string httpMethodOverrideHeader = "X-HTTP-Method-Override";
        static readonly string ORIGIN_HEADER = "ORIGIN";
        static readonly string accessControlAllowOriginHeader = "Access-Control-Allow-Origin";
        static readonly string accessControlAllowMethodsHeader = "Access-Control-Allow-Methods";
        static readonly string accessControlAllowHeadersHeader = "Access-Control-Allow-Headers";

        //http://www.infoworld.com/article/2991458/application-architecture/how-to-work-with-message-handlers-in-web-api.html
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            if (request.Method == HttpMethod.Post && request.Headers.Contains(httpMethodOverrideHeader))
            {
                var httpMethod = request.Headers.GetValues(httpMethodOverrideHeader).FirstOrDefault();
                if (httpOverrideMethods.Contains(httpMethod, StringComparer.InvariantCultureIgnoreCase))
                    request.Method = new HttpMethod(httpMethod);
            }

            var httpResponseMessage = base.SendAsync(request, cancellationToken);

            if (request.Method == HttpMethod.Options && request.Headers.Contains(ORIGIN_HEADER))
            {
                httpResponseMessage.Result.Headers.Add(accessControlAllowOriginHeader, request.Headers.GetValues(ORIGIN_HEADER).FirstOrDefault());
                httpResponseMessage.Result.Headers.Add(accessControlAllowMethodsHeader, String.Join(", ", accessControlAllowMethods));
                httpResponseMessage.Result.Headers.Add(accessControlAllowHeadersHeader, httpMethodOverrideHeader);
                httpResponseMessage.Result.StatusCode = HttpStatusCode.OK;
            }
            //No mater what the HttpMethod (POST, PUT, DELETE), if a Origin Header exists, we need to take care of it
            else if (request.Headers.Contains(ORIGIN_HEADER))
            {
                httpResponseMessage.Result.Headers.Add(accessControlAllowOriginHeader, request.Headers.GetValues(ORIGIN_HEADER).FirstOrDefault());
            }

            return httpResponseMessage;
        }
    }
}