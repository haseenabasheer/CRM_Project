import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe('Login Test Suite',()=>{
    let loginP :  LoginPage  

    test.beforeEach(async({page})=>{
        loginP = new LoginPage(page);
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


})