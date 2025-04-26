import { useState } from 'react';

export const SheetContainer = () => {
	const [sheets, setSheets] = useState<React.ReactNode[]>([]);

	return <>{sheets.map((sheet) => sheet)}</>;
};
