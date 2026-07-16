import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { LeadsPage } from "../pages/LeadsPage";

test.describe('Login Test Suite',()=>{
    let loginP :  LoginPage
    let dashboardP: DashboardPage  
    let leadsP : LeadsPage

    test.beforeEach(async({page})=>{
         await page.goto('https://bixitcrm.vercel.app/')
        loginP = new LoginPage(page);
        dashboardP = new DashboardPage(page)
        leadsP = new LeadsPage(page)
        await loginP.goto();
    })
    test('Login with valid credentials.', async({page})=>{
        await loginP.login('haseena@abc.com', '123456789')   
        await expect(page).toHaveURL(/bixitcrm/)
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

    test(' Search customer by name.',async({page})=>{
        await loginP.login('haseena@abc.com', '123456789');
        await dashboardP.search('Dinesh')
    })
    
    test ('Leads', async({page})=>{
        await loginP.login('haseena@abc.com', '123456789');
    
        await leadsP.addNewLead('haseena','haseena@gmail.com','123456')
    })

})