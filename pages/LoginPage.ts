import { Page } from "@playwright/test";
import { BasePage } from "./Base/base";

export class LoginPage extends BasePage{
    
      async login(username:string, password:string){
        await this.page.getByPlaceholder('you@academy.com').fill(username)
        await this.page.getByPlaceholder('Enter your password').fill(password)
        await this.page.getByRole("button",{name:'Sign In' , exact:false}).click()
    }


}