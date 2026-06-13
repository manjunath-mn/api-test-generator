import { useEffect, useState, type FormEvent } from 'react';
import {
  Panel,
  PanelHeader,
  InfoRow,
  AvatarSection,
  AvatarInfo,
  AvatarName,
  AvatarEmail,
  BreakSpan,
  EditForm,
  FormGroup,
  ButtonGroup,
  Button,
  Avatar,
} from './ProfilePage.styles';
import { profileApi } from '../services/profileApi';

interface Props {
  email: string;
  token: string;
}

interface Profile {
  id: number;
  email: string;
  full_name: string | null;
  avatar: string | null;
}

export default function ProfilePage({ email, token }: Props) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ full_name: '', avatar: '' });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await profileApi.getProfile(token);
      setProfile(data);
      setFormData({
        full_name: data.full_name || '',
        avatar: data.avatar || '',
      });
    } catch (err) {
      console.error('Failed to load profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updated = await profileApi.updateProfile(token, formData);
      setProfile(updated);
      setEditing(false);
    } catch (err) {
      console.error('Failed to save profile:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Panel>Loading profile...</Panel>;

  if (!profile) return <Panel>Failed to load profile</Panel>;

  const initials = profile.full_name
    ? profile.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : email[0].toUpperCase();

  return (
    <Panel>
      <PanelHeader>
        <h2>Profile</h2>
        <p>Your account details</p>
      </PanelHeader>

      <AvatarSection>
        <Avatar $src={profile.avatar ?? undefined}>{initials}</Avatar>
        <AvatarInfo>
          <AvatarName>{profile.full_name || 'No name set'}</AvatarName>
          <AvatarEmail>{profile.email}</AvatarEmail>
        </AvatarInfo>
      </AvatarSection>

      {!editing ? (
        <>
          <InfoRow>
            <span>Full Name</span>
            <span>{profile.full_name || '—'}</span>
          </InfoRow>
          <InfoRow>
            <span>Avatar URL</span>
            <BreakSpan>{profile.avatar || '—'}</BreakSpan>
          </InfoRow>
          <Button $variant="primary" onClick={() => setEditing(true)}>
            Edit Profile
          </Button>
        </>
      ) : (
        <EditForm onSubmit={handleSave}>
          <FormGroup>
            <label>Full Name</label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              placeholder="Enter your full name"
              disabled={loading}
            />
          </FormGroup>

          <FormGroup>
            <label>Avatar URL</label>
            <textarea
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
              placeholder="https://example.com/avatar.jpg"
              disabled={loading}
            />
          </FormGroup>

          <ButtonGroup>
            <Button $variant="secondary" onClick={() => setEditing(false)} disabled={loading}>
              Cancel
            </Button>
            <Button $variant="primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </ButtonGroup>
        </EditForm>
      )}
    </Panel>
  );
}
