import type { Metadata } from "next";
import DeveloperDetailsClient from "./DeveloperDetailsClient";
import { developersData } from "./developersData";
import { pageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return Object.keys(developersData).map((id) => ({
    id: id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const dev = developersData[id as keyof typeof developersData];

  if (!dev) {
    return { title: "Developer Not Found" };
  }

  return pageMetadata({
    title: `${dev.name} — ${dev.role}`,
    description: dev.bio
      ? dev.bio.slice(0, 155)
      : `Meet ${dev.name}, ${dev.role} at Niral Developer. Learn about their projects, skills, and open-source contributions.`,
    path: `/developers/${dev.id}`,
    keywords: [...dev.skills, dev.role, "Niral Developer developer"],
  });
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <DeveloperDetailsClient id={id} />;
}
