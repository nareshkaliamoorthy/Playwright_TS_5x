import { Page, Locator, expect } from '@playwright/test';

export class PlaywrightLabHomePage {
    private page: Page;
    private fullNameInputBox: Locator;
    private passwordInputBox: Locator;
    private dateOfBirth: Locator;
    private country: Locator;
    private bioTextBox: Locator;
    private termsCheckbox: Locator;
    private priorityDropdown: Locator;
    private volumeslider: Locator;
    private priceslider: Locator;
    private uploadLink: Locator;
    private autoSuggestBox: Locator;
    private multiselectBox: Locator;
    private cityDropdownInputBox: Locator;
    private cityDropdownMenu: Locator;
    private userManagementTbl: Locator;
    private inlineEditableTbl: Locator;
    private dynamicFruitTbl: Locator;
    private tableLocators: Record<string, Locator>;


    constructor(page: Page) {
        this.page = page;
        this.fullNameInputBox = page.getByTestId("input-fullname");
        this.passwordInputBox = page.getByTestId("input-password");
        this.dateOfBirth = page.getByTestId("input-dob");
        this.country = page.getByTestId("select-country");
        this.bioTextBox = page.getByTestId("textarea-bio");
        this.termsCheckbox = page.getByTestId("check-terms");
        this.priorityDropdown = page.getByTestId("custom-dropdown-menu");
        this.volumeslider = page.getByTestId("slider-volume");
        this.priceslider = page.getByTestId("slider-price");
        this.uploadLink = page.locator(".upload-link");
        this.autoSuggestBox = page.getByTestId("autocomplete-input");
        this.multiselectBox = page.getByTestId("multi-select");
        this.cityDropdownInputBox = page.getByPlaceholder("Type to filter cities...");
        this.cityDropdownMenu = page.getByTestId("searchable-dropdown-menu");
        this.userManagementTbl = page.getByTestId("data-table");
        this.inlineEditableTbl = page.getByTestId("editable-table");
        this.dynamicFruitTbl = page.getByTestId("dynamic-fruit-table");
        this.tableLocators = {
            usersTbl: this.userManagementTbl,
            editTbl: this.inlineEditableTbl,
            fruitTbl: this.dynamicFruitTbl
        };

    }

    async enterDOB(dateOfBirth: string) {
        try {
            const [day, month, year] = dateOfBirth.split("-");
            await this.dateOfBirth.fill(`${year}-${month}-${day}`);
        } catch (error) {
            throw new Error(`${dateOfBirth}" not in format DD-MM-YYYY`);
        }
    }

    async enterFullName(name: string) {
        await this.fullNameInputBox.fill(name);
    }

    async enterBioText(text: string) {
        await this.bioTextBox.fill(text);
    }

    async enterPassword(password: string) {
        await this.passwordInputBox.fill(password);
    }

    async selectCountry(country: string) {
        await this.country.selectOption(country);
    }

    async selectGender(gender: string) {
        gender = gender.toLowerCase();
        await this.page.locator(`input[value='${gender}']`).check();
    }

    async selectSkills(skills: string[]) {
        if (skills.length > 0) {
            for (let i = 0; i < skills.length; i++) {
                await this.page.getByTestId("checkbox-skills").getByText(skills[i], { exact: true }).check();
            }
        }
    }

    async checkTerms() {
        await this.termsCheckbox.check();
    }

    async selectPriority(priority: string) {
        await this.page.getByRole("button", { name: "Choose priority..." }).click();
        await this.priorityDropdown.locator("li").getByText(`${priority}`).click();
    }
    async slideVolume(volume: number) {
        await this.volumeslider.scrollIntoViewIfNeeded();
        const defaultVolume = Number(await this.volumeslider.getAttribute("value")) / 100;
        console.log(defaultVolume);
        const box = await this.volumeslider.boundingBox();
        if (box) {
            await this.page.mouse.move(box.x + box.width * defaultVolume, box.y + box.height / 2);
            await this.page.mouse.down();
            await this.page.mouse.move(box.x + box.width * volume, box.y + box.height / 2);
            await this.page.mouse.up();
        }
    }
    async slidePrice(price: number) {
        const defaultPrice = Number(await this.priceslider.getAttribute("value"));
        const maxPrice = Number(await this.priceslider.getAttribute("max"));
        const box = await this.priceslider.boundingBox();
        if (box) {
            await this.page.mouse.move(box.x + box.width * (defaultPrice / maxPrice), box.y + box.height / 2);
            await this.page.mouse.down();
            await this.page.mouse.move(box.x + box.width * (price / maxPrice), box.y + box.height / 2);
            await this.page.mouse.up();
        }
    }
    async uploadFiles(files: string[]) {
        await this.uploadLink.setInputFiles(files);
    }

    async selectProgrammingSkills(searchText: string, skill: string) {
        await this.autoSuggestBox.fill(searchText);
        await this.page.getByTestId("autocomplete-list").getByText(skill, { exact: true }).click();
    }

    async selectFrameworks(framework: string[]) {
        // await this.page.keyboard.down("Control");
        for (let i = 0; i < framework.length; i++) {
            await this.page.keyboard.down("Control");
            await this.multiselectBox.getByText(framework[i], { exact: true }).click();

        }
        await this.page.keyboard.up("Control");
    }

    async selectCity(searchText: string, city: string) {
        await this.cityDropdownInputBox.fill(`${searchText}`);
        const cityResultList = await this.cityDropdownMenu.locator("li:visible").allTextContents();
        //const regex = new RegExp(/^${searchText}/)
        const regex = new RegExp(/^T/)
        expect(cityResultList.every(city => regex.test(city))).toBe(true);
    }

    async getUserManagementTblHeader() {
        const tableHeaders = await this.userManagementTbl.locator("thead tr th").allInnerTexts();
        console.log("TotalColumns:", tableHeaders.length);
        console.log("Headers:", tableHeaders);
    }
    async getUserManagementTblRows() {
        let tableRows = [];
        while (true) {

            const rows = await this.userManagementTbl.locator("tbody tr").allInnerTexts();
            tableRows.push(...rows);
            for (let i = 0; i < rows.length; i++) {
                const row = await this.userManagementTbl.locator("tbody tr").nth(i).innerText();
                console.log(row);
            }
            const nextPage = this.page.getByTestId("page-next");
            if (await nextPage.isDisabled()) {
                break;
            }
            await nextPage.click();
        }
        console.log("TotalRows:", tableRows.length);
        console.log("Rows:", tableRows);

    }

    async getFilteredUsers(status: string, role: string) {
        const userData = [];
        while (true) {
            const rows = await this.userManagementTbl.locator("tbody tr").allInnerTexts();

            const filteredRows = rows.filter(row => row.includes(`${status}`) && row.includes(`${role}`));

            userData.push(...filteredRows);


            const nextPage = this.page.getByTestId("page-next");
            if (await nextPage.isDisabled()) {
                break;
            }
            await nextPage.click();
        }
        console.log(userData);
    }

    async getTableData(tableName: string) {
        const table = this.tableLocators[tableName];
        let tableRow = null;
        let tableColumn = null

        while (true) {
            tableRow = await table.locator("tbody tr").allInnerTexts();
            tableColumn = await table.locator("thead tr th").allInnerTexts();

            console.log(await table.locator("thead tr").innerText())

            const nextPage = table.getByTestId("page-next");

            if (await nextPage.count() === 0) {
                break;
            }
            await nextPage.click();

        }
        console.log("Total Row:", tableRow.length);
        console.log("Total Column:", tableColumn.length);
    }
}





