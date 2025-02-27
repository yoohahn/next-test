import { headers } from "next/headers";

export const runtime = "edge";
export default async function ErrorLayout({}) {
  const status = (await headers()).get("X-Status");
  const requestHeaders: Record<string, string>[] = [];
  (await headers()).forEach((value, key) => {
    requestHeaders.push({ key, value });
  });
  return (
    <div className="error">
      <h1>{status}</h1>
      <ul>
        {requestHeaders.map(({ key, value }) => (
          <li id={`header-${key}`} key={key}>
            <span>{key}</span>: <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
