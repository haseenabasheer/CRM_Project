import { BasePage } from "./Base/base";

export class DashboardPage extends BasePage{

     private searchBar = () => this.page.getByPlaceholder('Search students, leads, courses...')
     private addLeadButton = () => this.page.getByRole('button', { name: 'Add Lead' })
 
      async search(value: string) {
        await this.searchBar().fill(value)
        await this.page.keyboard.press('Enter')
    }

    async addLead() {
        await this.addLeadButton().click()
    }

   async followup(){
        await this.page.getByRole('button', {name:'Follow-up'}).click()
   }

}   