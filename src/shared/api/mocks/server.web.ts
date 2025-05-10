import { setupServer } from 'msw/native';
import { handlers } from './handlers';

const serverNative = setupServer(...handlers);

export default serverNative;
