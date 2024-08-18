import { LoginProps } from '@/utils/types';
import { useMagic } from '@/hooks/MagicProvider';
import { useEffect, useState } from 'react';
import { saveUserInfo } from '@/utils/common';
import Spinner from '@/components/ui/Spinner';
import Card from '@/components/ui/Card';
import CardHeader from '@/components/ui/CardHeader';
import showToast from '@/utils/showToast';

const Farcaster = ({ token, setToken }: LoginProps) => {
  const { magic } = useMagic();
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  useEffect(() => {
    const loadingFlag = localStorage.getItem('isAuthLoading') === 'true';
    setIsAuthLoading(loadingFlag);
  }, []);

  const login = async () => {
    try {
      setLoadingFlag(true);
      const result = await magic?.farcaster.login();
      const metadata = await magic?.user.getInfo();

      if (!result || !metadata?.publicAddress) {
        throw new Error('Farcaster login failed');
      }

      setToken(result ?? "");
      saveUserInfo(result ?? "", 'SOCIAL', metadata?.publicAddress);
    } catch (e) {
      console.log('login error: ' + JSON.stringify(e));

      showToast({
        message: 'An unexpected error occurred. Please try again later.',
        type: 'error',
      });
    } finally {
      setLoadingFlag(false);
    }
  };

  const setLoadingFlag = (loading: boolean) => {
    localStorage.setItem('isAuthLoading', loading ? 'true' : 'false');
    setIsAuthLoading(loading);
  };

  return (
    <Card>
      <CardHeader id="farcaster">Farcaster Login</CardHeader>
      <p className="mb-4">This will prompt a QR code for authenticating with Farcaster.</p>
      {isAuthLoading ? (
        <Spinner />
      ) : (
        <div className="login-method-grid-item-container">
          <button
            className="login-button"
            onClick={() => {
              if (token.length === 0) login();
            }}
            disabled={isAuthLoading}
          >
            Continue with Farcaster
          </button>
        </div>
      )}
    </Card>
  );
};

export default Farcaster;
