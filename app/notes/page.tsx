import { fetchNotes } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Notes from "./Notes.client";

const Note = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
      queryKey: ["notes"],
      queryFn: () => fetchNotes(),
  });

  return <HydrationBoundary state={dehydrate(queryClient)}>
    <Notes />  
  </HydrationBoundary> 
};

export default Note;