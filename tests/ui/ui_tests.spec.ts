import { test, expect } from '../../fixtures/base.fixtures';
import { PlaywrightLabLoginPage } from '../../pages/playwrightLabLoginPage';

test.describe("Login Functionality", () => {
    test("Valid Login", { tag: ["@regression"] }, async ({ page, playwrightLabLoginPage, playwrightLabHomePage }) => {
        await playwrightLabLoginPage.login("test@playlab.com", "Password123");
        await playwrightLabLoginPage.gotoDashboard();
        await playwrightLabHomePage.enterFullName("Naresh K");
        await playwrightLabHomePage.enterPassword("PASSWORD!@")
        await playwrightLabHomePage.enterBioText("BIO TEXT But I'd prefer getByTestId() here because the page already provides a dedicated test ID. ");
        await playwrightLabHomePage.enterDOB("19-07-1986");
        await playwrightLabHomePage.selectCountry("Australia");
        await playwrightLabHomePage.selectGender("Female");
        await playwrightLabHomePage.selectSkills(["Java", "JavaScript", "Python", "C#"]);
        await playwrightLabHomePage.checkTerms();
        await playwrightLabHomePage.selectPriority("Low");
        await playwrightLabHomePage.slideVolume(0.89);
        await playwrightLabHomePage.slidePrice(750);
        await playwrightLabHomePage.uploadFiles(["./test_data/Naresh_K_AAM.pdf", "C:/Users/DELL/Naresh_K/ID PROOFS/PAN_ID.jpeg"]);
        await playwrightLabHomePage.selectProgrammingSkills("cloj", "Clojure");
        await playwrightLabHomePage.selectFrameworks(["React", "Vue.js", "Nuxt.js", "Astro"]);
        await playwrightLabHomePage.selectCity("T", "Tokyo");
        //await playwrightLabHomePage.getUserManagementTblHeader();
        //await playwrightLabHomePage.getUserManagementTblRows();
        //await playwrightLabHomePage.getFilteredUsers("active", "admin");
        await playwrightLabHomePage.getTableData("fruitTbl");
        await page.waitForTimeout(5000);

    })


})