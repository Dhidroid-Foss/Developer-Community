import DeveloperDetailsClient from "./DeveloperDetailsClient";
import { developersData } from "./developersData";

export async function generateStaticParams() {
  return Object.keys(developersData).map((id) => ({
    id: id,
  }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <DeveloperDetailsClient id={id} />;
}
