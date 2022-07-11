export function menuBurgerInteractions(
  action,
  page,
  pageBlackout,
  navigation,
  headerLogo,
) {
  page.classList[action]('page_disable-scroll');
  pageBlackout.classList[action]('page__blackout');
  navigation.classList[action]('navigation_active');
  headerLogo.classList[action]('hidden');
}
