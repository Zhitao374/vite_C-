import noFlip from './noFlip';
import navLock from './navLock';
export function installDirectives(app) {
  app.directive('no-flip', noFlip);
  app.directive('nav-lock', navLock);
}