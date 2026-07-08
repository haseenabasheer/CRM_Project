import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";

test.describe('Login Test Suite',()=>{
    let loginP :  LoginPage
    let dashboardP: DashboardPage  

    test.beforeEach(async({page})=>{
        loginP = new LoginPage(page);
        dashboardP = new DashboardPage(page)
            await loginP.goto();
    })
    test('Login with valid credentials.', async({page})=>{
        await loginP.login('haseena@abc.com', '123456789')   
        await expect(page).toHaveURL(/bixitcrm/)
        await dashboardP.verifyDashboardIsLoaded()
    })

    test('Login with invalid password.' , async({page})=>{
        await loginP.login('haseena@abc.com', ' @  ')
    })

    test('Login with invalid username',async({page})=>{
        await loginP.login('haseena@#abc.com', '1234567890')
        
    })

    test('Login with both fields empty',async({page})=>{
        await loginP.login('','')
    })
test('Should successfully use the Global Search feature', async () => {
        await dashboardP.search('John Doe')
        // Add assertion here based on how your app displays search results
    })

    test('Should interact with sidebar navigation to go to Leads page', async ({ page }) => {
        await dashboardP.navigateToLeads()
        await expect(page).toHaveURL(/.*leads/)
    })

    test('Should be able to toggle dark mode from the sidebar', async () => {
        await dashboardP.toggleDarkMode()
        // Optional assertion: verify if the html tag contains 'dark' class
    })
})