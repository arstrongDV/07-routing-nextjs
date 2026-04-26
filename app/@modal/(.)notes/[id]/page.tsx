import Modal from "@/components/Modal/Modal";
import NotePreview from "./NotePreview.client";
import { fetchNote } from "@/lib/api";
import { QueryClient, dehydrate, HydrationBoundary, } from "@tanstack/react-query";

interface NoteDetailsProps {
    params: Promise<{id: string}>;
}

export default async function NoteModal({ params }: NoteDetailsProps) {
  const queryClient = new QueryClient();

  const { id } = await params

    await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNote(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  );
}
