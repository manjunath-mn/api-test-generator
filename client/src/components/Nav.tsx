import { NavBar, NavButton } from './Nav.styles';

export type View = 'testing' | 'reports' | 'profile';

interface Props {
  active: View;
  onChange: (view: View) => void;
}

const TABS: { id: View; label: string }[] = [
  { id: 'testing', label: 'Testing' },
  { id: 'reports', label: 'Reports' },
  { id: 'profile', label: 'Profile' },
];

export default function Nav({ active, onChange }: Props) {
  return (
    <NavBar>
      {TABS.map(tab => (
        <NavButton key={tab.id} $active={active === tab.id} onClick={() => onChange(tab.id)}>
          {tab.label}
        </NavButton>
      ))}
    </NavBar>
  );
}
