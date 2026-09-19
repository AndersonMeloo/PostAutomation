import { AuthGuide } from "../components/api-docs/auth-guide";
import { ErrorCodes } from "../components/api-docs/error-codes";
import { EndpointNav } from "../components/api-docs/endpoint-nav";
import { EndpointCard } from "../components/api-docs/endpoint-card";
import { API_CATEGORIES, getEndpointsByCategory } from "../components/api-docs/api-data";

export default function ApiDocsPage() {
  return (
    <div className="mx-auto max-w-360 px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 lg:flex-row">
        <EndpointNav />

        <div className="min-w-0 flex-1">
          <AuthGuide />

          <div className="mt-16 border-t border-line pt-12">
            <ErrorCodes />
          </div>

          {API_CATEGORIES.map((category) => (
            <div key={category.id} className="mt-16 border-t border-line pt-12">
              <h2 className="text-2xl font-bold text-foreground">{category.label}</h2>
              <p className="mt-2 text-muted">{category.description}</p>

              {getEndpointsByCategory(category.id).map((endpoint) => (
                <EndpointCard key={endpoint.id} endpoint={endpoint} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
