import Authorized from './Authorized';
import renderAuthorize, { CurrentAuthority } from './render-authorize';

export { CurrentAuthority };
export default renderAuthorize(Authorized);
