import {Page} from '@playwright/test'

export class BasePage{
    protected page :Page
    //Base class constructor
    constructor(page:Page) {
        this.page = page
    }
    // goto the Page
    async goto(){
        await this.page.goto('https://bixitcrm.vercel.app/')
    }
    // Fill method in Base class
    async fill(selector: string, value : string){
        await this.page.fill(selector,value)
    }
    //Click method in Base class
    async click(selector:string){
        await this.page.click(selector)
    }
    async navigateToLeads() {
        await this.page.getByRole('link', { name: 'Leads' }).click()
    }

    async navigateToFollowUps() {
        await this.page.getByRole('link', { name: 'Follow-ups' }).click()
    }

    async navigateToStudents() {
        await this.page.getByRole('link', { name: 'Students' }).click()
    }

    async navigateToSettings() {
        await this.page.getByRole('link', { name: 'Settings' }).click()
    }

    async toggleDarkMode() {
        await this.page.getByText('Dark Mode').click()
    }

    async logout() {
        // Targets the sign-out icon next to the user profile name
        await this.page.locator('button:has-text("Yogesh"), .lucide-log-out').last().click() 
    }
}