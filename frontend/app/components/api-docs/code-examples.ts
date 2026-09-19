import type { ApiEndpoint } from "./api-data";

// Gera os exemplos de código (cURL, JS, Python, Node) a partir dos dados de
// UM endpoint. Nunca digitamos exemplo por endpoint na mão - isso evita
// 4x o trabalho de manter tudo sincronizado conforme a API muda.

export const BASE_URL_EXAMPLE = "https://postautomation-production-d200.up.railway.app";

function resolvedPath(endpoint: ApiEndpoint): string {
  let path = endpoint.path;
  for (const param of endpoint.pathParams ?? []) {
    path = path.replace(`:${param.name}`, `<${param.name.toUpperCase()}>`);
  }
  return path;
}

function jsonFieldsToObject(fields: { name: string; type: string }[]): Record<string, string> {
  const obj: Record<string, string> = {};
  for (const field of fields) {
    obj[field.name] = `<${field.name.toUpperCase()}>`;
  }
  return obj;
}

function authHeaderLabel(endpoint: ApiEndpoint): string | null {
  return endpoint.auth === "bearer" ? "Bearer <SEU_ACCESS_TOKEN>" : null;
}

export function buildCurlExample(endpoint: ApiEndpoint): string {
  const url = `${BASE_URL_EXAMPLE}${resolvedPath(endpoint)}`;
  const lines = [`curl -X ${endpoint.method} "${url}"`];
  const authHeader = authHeaderLabel(endpoint);
  if (authHeader) lines.push(`  -H "Authorization: ${authHeader}"`);

  if (endpoint.requestBody?.contentType === "application/json") {
    lines.push(`  -H "Content-Type: application/json"`);
    const body = jsonFieldsToObject(endpoint.requestBody.fields);
    lines.push(`  -d '${JSON.stringify(body)}'`);
  } else if (endpoint.requestBody?.contentType === "multipart/form-data") {
    for (const field of endpoint.requestBody.fields) {
      if (field.type === "file") {
        lines.push(`  -F "${field.name}=@caminho/do/arquivo"`);
      } else {
        lines.push(`  -F "${field.name}=<${field.name.toUpperCase()}>"`);
      }
    }
  }

  return lines.join(" \\\n");
}

export function buildJavascriptExample(endpoint: ApiEndpoint): string {
  const url = `${BASE_URL_EXAMPLE}${resolvedPath(endpoint)}`;
  const authHeader = authHeaderLabel(endpoint);

  if (endpoint.requestBody?.contentType === "multipart/form-data") {
    const lines = ["const formData = new FormData();"];
    for (const field of endpoint.requestBody.fields) {
      if (field.type === "file") {
        lines.push(`formData.append("${field.name}", arquivo); // File/Blob`);
      } else {
        lines.push(`formData.append("${field.name}", "<${field.name.toUpperCase()}>");`);
      }
    }
    lines.push("");
    lines.push(`const response = await fetch("${url}", {`);
    lines.push(`  method: "${endpoint.method}",`);
    if (authHeader) lines.push(`  headers: { Authorization: "${authHeader}" },`);
    lines.push("  body: formData,");
    lines.push("});");
    lines.push("const data = await response.json();");
    return lines.join("\n");
  }

  const lines = [`const response = await fetch("${url}", {`, `  method: "${endpoint.method}",`];
  const headerLines: string[] = [];
  if (endpoint.requestBody?.contentType === "application/json") {
    headerLines.push('"Content-Type": "application/json"');
  }
  if (authHeader) headerLines.push(`Authorization: "${authHeader}"`);
  if (headerLines.length > 0) lines.push(`  headers: { ${headerLines.join(", ")} },`);

  if (endpoint.requestBody?.contentType === "application/json") {
    const body = jsonFieldsToObject(endpoint.requestBody.fields);
    lines.push(`  body: JSON.stringify(${JSON.stringify(body)}),`);
  }
  lines.push("});");
  lines.push("const data = await response.json();");
  return lines.join("\n");
}

export function buildPythonExample(endpoint: ApiEndpoint): string {
  const url = `${BASE_URL_EXAMPLE}${resolvedPath(endpoint)}`;
  const authHeader = authHeaderLabel(endpoint);
  const method = endpoint.method.toLowerCase();
  const lines = ["import requests", ""];

  if (endpoint.requestBody?.contentType === "multipart/form-data") {
    const fileFields = endpoint.requestBody.fields.filter((f) => f.type === "file");
    const otherFields = endpoint.requestBody.fields.filter((f) => f.type !== "file");
    if (fileFields.length > 0) {
      lines.push("files = {");
      for (const field of fileFields) {
        lines.push(`    "${field.name}": open("caminho/do/arquivo", "rb"),`);
      }
      lines.push("}");
    }
    if (otherFields.length > 0) {
      lines.push("data = {");
      for (const field of otherFields) {
        lines.push(`    "${field.name}": "<${field.name.toUpperCase()}>",`);
      }
      lines.push("}");
    }
    lines.push("");
    const args = ["url"];
    if (fileFields.length > 0) args.push("files=files");
    if (otherFields.length > 0) args.push("data=data");
    if (authHeader) args.push("headers=headers");
    lines.push(`url = "${url}"`);
    if (authHeader) lines.push(`headers = {"Authorization": "${authHeader}"}`);
    lines.push(`response = requests.${method}(${args.join(", ")})`);
  } else {
    lines.push(`url = "${url}"`);
    if (authHeader) lines.push(`headers = {"Authorization": "${authHeader}"}`);
    const args = ["url"];
    if (endpoint.requestBody?.contentType === "application/json") {
      const body = jsonFieldsToObject(endpoint.requestBody.fields);
      lines.push(`payload = ${JSON.stringify(body)}`);
      args.push("json=payload");
    }
    if (authHeader) args.push("headers=headers");
    lines.push(`response = requests.${method}(${args.join(", ")})`);
  }

  lines.push("data = response.json()");
  return lines.join("\n");
}

export function buildNodeExample(endpoint: ApiEndpoint): string {
  const url = `${BASE_URL_EXAMPLE}${resolvedPath(endpoint)}`;
  const authHeader = authHeaderLabel(endpoint);
  const lines = ['import axios from "axios";', ""];

  const config: string[] = [];
  if (authHeader) config.push(`  headers: { Authorization: "${authHeader}" },`);

  if (endpoint.requestBody?.contentType === "application/json") {
    const body = jsonFieldsToObject(endpoint.requestBody.fields);
    lines.push(
      `const { data } = await axios.${endpoint.method.toLowerCase()}("${url}", ${JSON.stringify(body)}, {`,
    );
    if (config.length > 0) lines.push(...config);
    lines.push("});");
  } else if (endpoint.method === "GET" || endpoint.method === "DELETE") {
    lines.push(`const { data } = await axios.${endpoint.method.toLowerCase()}("${url}", {`);
    if (config.length > 0) lines.push(...config);
    lines.push("});");
  } else {
    lines.push(`const { data } = await axios.${endpoint.method.toLowerCase()}("${url}", undefined, {`);
    if (config.length > 0) lines.push(...config);
    lines.push("});");
  }

  return lines.join("\n");
}

export type CodeLanguage = "curl" | "javascript" | "python" | "node";

export const CODE_LANGUAGES: { id: CodeLanguage; label: string; prismLanguage: string }[] = [
  { id: "curl", label: "cURL", prismLanguage: "bash" },
  { id: "javascript", label: "JavaScript", prismLanguage: "javascript" },
  { id: "python", label: "Python", prismLanguage: "python" },
  { id: "node", label: "Node.js", prismLanguage: "javascript" },
];

export function buildCodeExample(language: CodeLanguage, endpoint: ApiEndpoint): string {
  switch (language) {
    case "curl":
      return buildCurlExample(endpoint);
    case "javascript":
      return buildJavascriptExample(endpoint);
    case "python":
      return buildPythonExample(endpoint);
    case "node":
      return buildNodeExample(endpoint);
  }
}
