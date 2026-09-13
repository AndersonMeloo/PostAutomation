import YoutubeConnectCallbackClient from "./callback-client";

type YoutubeConnectCallbackPageProps = {
  searchParams: Promise<{
    status?: string | string[];
  }>;
};

export default async function YoutubeConnectCallbackPage({
  searchParams,
}: YoutubeConnectCallbackPageProps) {
  const params = await searchParams;
  const status = Array.isArray(params.status) ? params.status[0] : params.status;

  return (
    <YoutubeConnectCallbackClient status={status === "success" ? "success" : "error"} />
  );
}
