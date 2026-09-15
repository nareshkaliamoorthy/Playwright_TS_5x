import { test as base, expect } from '@playwright/test';
import { PlaywrightLabLoginPage } from '../pages/playwrightLabLoginPage';
import { PlaywrightLabHomePage } from '../pages/playwrightLabHomePage';

type Fixtures = {
    playwrightLabLoginPage: PlaywrightLabLoginPage;
    playwrightLabHomePage: PlaywrightLabHomePage;
}

const test = base.extend<Fixtures>({
    playwrightLabLoginPage: async ({ page }, use) => {
        const playwrightLabLoginPage = new PlaywrightLabLoginPage(page);
        await use(playwrightLabLoginPage);
    },
    playwrightLabHomePage: async ({ page }, use) => {
        const playwrightLabHomePage = new PlaywrightLabHomePage(page);
        await use(playwrightLabHomePage);
    }
})
export { test, expect }
