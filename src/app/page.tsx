import Dashboard from '../components/Dashboard';
import { getInitiatives } from './actions';

export const metadata = {
  title: 'CSLD Workplan Tracker | JRB',
  description: 'Enterprise operational tracker',
};

// Next.js Server Component
export default async function Home() {
  // Fetch directly from SQLite via Server Action
  const initiatives = await getInitiatives();

  return (
    <main>
      {/* Pass real database records into our Dashboard */}
      <Dashboard initialData={initiatives} />
    </main>
  );
}