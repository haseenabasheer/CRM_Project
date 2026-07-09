import { BasePage } from "./Base/base";
import { Page } from "@playwright/test";

export class LeadsPage extends BasePage{

    async addLeadManagement(){
        await this.page.getByRole('button', { name: 'Add New Lead' }).click()
        await this.page.getByRole('button', {name:'Import Leads'}).click()
        await this.page.getByRole('button',{name:'Export'}).click()
    }

    async addNewLead(name:string,email:string,phone:string){
        await this.page.click('.Leads')
        await this.page.getByRole('button', { name: 'Add New Lead' }).click()
        await this.page.getByRole('heading',{name:'Add New Lead'})
        await this.page.getByPlaceholder('Full Name').fill(name)
        await this.page.getByLabel('Email').fill(email)
        await this.page.getByLabel('Phone').fill(phone)
        await this.page.getByLabel('Course Interested').selectOption('Cybersecurity')
        await this.page.getByLabel('Source').selectOption('Referral')
        await this.page.getByRole('radio',{name:'medium'}).click()
    }

}