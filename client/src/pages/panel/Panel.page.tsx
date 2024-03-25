import { PanelLayout } from '@/layouts/Panel.layout';
import { useAuth } from '@/providers/Auth.provider';

export const PanelPage = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <PanelLayout>
      <h1>Panel</h1>
      <p>Welcome {user?.nickname}!</p>
    </PanelLayout>
  );
};
