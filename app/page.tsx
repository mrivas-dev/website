import { ShellGate } from '@/components/ShellGate';
import { Terminal } from '@/components/Terminal/Terminal';

export default function Home() {
  return (
    <ShellGate>
      <Terminal />
    </ShellGate>
  );
}
