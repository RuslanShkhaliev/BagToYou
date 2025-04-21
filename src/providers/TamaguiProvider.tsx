import React from 'react';
import { TamaguiProvider } from 'tamagui';
import { config } from 'tamagui.config';

export default ({ children }: { children: React.ReactNode }) => (
	<TamaguiProvider config={config}>{children}</TamaguiProvider>
);
