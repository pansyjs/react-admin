import Authorized from './authorized';
import renderAuthorize, { CurrentAuthority } from './render-authorize';

export { CurrentAuthority };
export default renderAuthorize(Authorized);
