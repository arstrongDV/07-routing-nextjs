import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Notes from "../Notes.client";

interface NotesByCategory {
    params: Promise<{ slug: string[] }>;
}

const NotesByCategory = async ({ params }: NotesByCategory) => {
    const { slug } = await params;
    const category = slug?.[0] === 'all' ? undefined : slug?.[0];

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["notes"],
        queryFn: () => fetchNotes(),
    });

    return <HydrationBoundary state={dehydrate(queryClient)}>
        <Notes category={category} />  
    </HydrationBoundary> 
};

export default NotesByCategory;