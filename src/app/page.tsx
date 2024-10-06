// app/page.tsx
import CursorHonk from '@/components/cursor-honk';
import GooseSnacksTable from '@/components/goose-snacks-table'; // Client-side component

export default function Page() {
  return (
    <div>
      <GooseSnacksTable /> {/* Client-side component */}
      <CursorHonk />
    </div>
  );
}
