import {Page} from '@playwright/test'

export class BasePage{
    protected page :Page
    //Base class constructor
    constructor(page:Page) {
        this.page = page
    }
    // goto the Page
    async goto(){
       
    }
    // Fill method in Base class
    async fill(selector: string, value : string){
        await this.page.fill(selector,value)
    }
    //Click method in Base class
    async click(selector:string){
        await this.page.click(selector)
    }

   
}