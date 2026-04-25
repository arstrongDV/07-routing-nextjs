import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";

interface NotesByCategory {
    params: Promise<{ slug: string[] }>;
}

const NotesByCategory = async ({ params }: NotesByCategory) => {
    const { slug } = await params;
    const category = slug?.[0] === 'all' ? undefined : slug?.[0];

    const response = await fetchNotes({ category });

    console.log("responseresponse: ", response);

    return (
        <div>
            <NoteList notes={response.notes} />
        </div>
    );
};

export default NotesByCategory;