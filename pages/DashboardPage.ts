import { BasePage } from "./Base/base";
import { expect } from "@playwright/test";

export class DashboardPage extends BasePage{
    // async search(value:string){
    //     await this.page.getByPlaceholder('Search students, leads, courses...').fill(value)
    // }
    // async addlead(){
    //     await this.page.getByRole('button',{name:'Add Lead'}).click()
    // }
    private searchBar = () => this.page.getByPlaceholder('Search students, leads, courses...')
    private addLeadButton = () => this.page.getByRole('button', { name: 'Add Lead' })
    private activeDashboardTab = () => this.page.locator('div').filter({ hasText: /^Dashboard$/ }).first()

    async verifyDashboardIsLoaded() {
        // Verify the URL and that the main search bar or active tab is visible
       // await expect(this.page).toHaveURL(/.*dashboard|.*bixitcrm/);
        await expect(this.searchBar()).toBeVisible();
    }

    async search(value: string) {
        await this.searchBar().fill(value)
        await this.page.keyboard.press('Enter')
    }

    async addLead() {
        await this.addLeadButton().click()
    }
}