export const dynamic = 'force-dynamic';

import connectToDatabase from "@/lib/mongodb";
import Message from "@/models/Message";

export default async function ResponsesPage() {
    let messages = [];
    try {
        await connectToDatabase();
        // Fetch all queries, sorted from newest to oldest
        const docs = await Message.find({}).sort({ createdAt: -1 }).lean();
        // Parse to simple JSON objects
        messages = docs.map((doc) => ({
            _id: doc._id.toString(),
            name: doc.name,
            email: doc.email,
            message: doc.message,
            createdAt: doc.createdAt.toISOString(),
        }));
    } catch (error) {
        console.error("Failed to load messages:", error);
    }

    return (
        <main className="min-h-screen bg-[var(--color-surface)] py-24 px-6 relative z-10 text-[var(--color-text-primary)]">
            <div className="max-w-[1400px] mx-auto">
                <h1 className="text-4xl md:text-6xl font-[var(--font-heading)] font-black tracking-tight mb-4">
                    Incoming <span className="text-[var(--color-primary)]">Queries</span>
                </h1>
                <p className="text-[var(--color-text-muted)] font-bold text-lg mb-12 border-b-4 border-[var(--color-border)] pb-8">
                    A list of all incoming messages saved via MongoDB.
                </p>

                {messages.length === 0 ? (
                    <div className="neo-card p-12 text-center bg-[var(--color-background)]">
                        <p className="text-xl font-bold">No queries found yet.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {messages.map((msg) => (
                            <div
                                key={msg._id}
                                className="neo-card p-6 bg-[var(--color-background)] flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="text-xl font-[var(--font-heading)] font-bold mb-1 break-words">
                                        {msg.name}
                                    </h3>
                                    <a href={`mailto:${msg.email}`} className="text-sm font-[var(--font-code)] font-bold text-[var(--color-primary)] mb-4 inline-block break-words hover:underline">
                                        {msg.email}
                                    </a>
                                    <p className="border-t-2 border-[var(--color-border)] pt-4 text-base font-medium leading-relaxed whitespace-pre-wrap break-words">
                                        {msg.message}
                                    </p>
                                </div>
                                <div className="mt-8 text-xs font-[var(--font-code)] text-[var(--color-text-muted)] font-bold tracking-widest text-right">
                                    {new Date(msg.createdAt).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
