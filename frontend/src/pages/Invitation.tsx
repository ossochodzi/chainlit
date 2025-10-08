import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { InvitationForm } from '@/components/InvitationForm';
import { Logo } from '@/components/Logo';
import { useTheme } from '@/components/ThemeProvider';

import { useQuery } from 'hooks/query';

import { ChainlitContext, useAuth } from 'client-types/*';

export const LoginError = new Error(
  'Error logging in. Please try again later.'
);

export default function Invitation() {
  const query = useQuery();
  const { data: config, user } = useAuth();
  const [error, setError] = useState('');
  const apiClient = useContext(ChainlitContext);
  const navigate = useNavigate();
  const { variant } = useTheme();
  const isDarkMode = variant === 'dark';
  const { token } = useParams();

  useEffect(() => {
    setError(query.get('error') || '');
  }, [query]);

  useEffect(() => {
    if (!config) {
      return;
    }
    if (!config.requireLogin) {
      navigate('/');
    }
    if (user) {
      navigate('/');
    }
  }, [config, user]);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo className="w-[150px]" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <InvitationForm
              error={error}
              callbackUrl="/"
              providers={config?.oauthProviders || []}
              onPasswordSignIn={undefined}
              onOAuthSignIn={async (provider: string) => {
                window.location.href = apiClient.getOAuthInvitationEndpoint(
                  provider,
                  token
                );
              }}
            />
          </div>
        </div>
      </div>
      {!config?.headerAuth ? (
        <div className="relative hidden bg-muted lg:block overflow-hidden login-page-side">
          <img
            src={
              config?.ui?.login_page_image ||
              apiClient.buildEndpoint('/favicon')
            }
            alt="Image"
            className={`absolute inset-0 h-full w-full object-contain ${
              isDarkMode
                ? config?.ui?.login_page_image_dark_filter ||
                  'brightness-[0.2] grayscale'
                : config?.ui?.login_page_image_filter || ''
            }`}
          />
        </div>
      ) : null}
    </div>
  );
}
