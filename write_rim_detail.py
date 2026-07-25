from pathlib import Path

content = """import { useParams } from 'react-router-dom';

export default function RimDetail() {
  const { id } = useParams();

  return (
    <div className=\"min-h-screen bg-surface p-6 md:p-12 text-on-surface\">
      <div className=\"max-w-4xl mx-auto space-y-6\">
        <h1 className=\"text-3xl font-extrabold tracking-tight\">Rim Detail</h1>
        <p className=\"text-on-surface-muted\">
          Detailed view for rim {id ?? 'selection'}.
        </p>
      </div>
    </div>
  );
}
"""

Path('src/pages/RimDetail.tsx').write_text(content, encoding='utf-8')
