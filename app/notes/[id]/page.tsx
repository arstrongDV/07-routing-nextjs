import { fetchNote } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import NoteDetailsClient from "./NoteDetails.client";

interface NoteDetailsProps {
    params: Promise<{id: string}>;
}

const NoteDetails = async({ params }: NoteDetailsProps) => {
    const queryClient = new QueryClient();
    const { id } = await params;

    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNote(id)
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient />
        </HydrationBoundary>
    );
}

export default NoteDetails;