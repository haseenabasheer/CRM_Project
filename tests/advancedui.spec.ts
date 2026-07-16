import {test, expect} from '@playwright/test'

test.describe('Advanced UI - Comprehensive Suite', ()=>{
    
    test.beforeEach(async ({page})=>{

        await page.goto('file:///C:/Personnel/Playwright_With_TS/Project/test-data/PlaywrightAdvancedUI2.html')

        await page.waitForLoadState('domcontentloaded')  // wait for the page to be fully loaded and interactive

        await page.waitForTimeout(1000)  // wait for intial toast to disappear

    })

    test.afterEach(async ({page})=>{
        await page.close()   // Cleanup
    })

    test.describe('Dynamic Elements', ()=>{

        test('should handle async update with loading state', async ({page})=>{

            const dynamicValue = page.getByTestId('dynamicValue');
            const dynamicBox = page.getByTestId('dynamicBox');
            const changeBtn = page.getByTestId('changeDynamicBtn');

            const dynamicPill = page.getByTestId('dynamicPill');


            // Initial State Verification
            await expect(dynamicValue).toHaveText('42');

            await expect(dynamicBox).not.toHaveClass(/loading/)

            // Tigger async update
            await changeBtn.click()

            await expect(dynamicBox).toHaveClass(/loading/)
            await expect(dynamicPill).toHaveText('loading...')

            await expect(dynamicBox).not.toHaveClass(/loading/, {timeout: 2000})
            await expect(dynamicPill).toHaveText('ready')

            // Verify value changed
            const newValue = await dynamicValue.textContent()
            expect(Number(newValue)).toBeGreaterThanOrEqual(1)

            expect(Number(newValue)).toBeLessThanOrEqual(100)

        })

        test('should reset to initial value', async ({page})=>{

            const dynamicValue = page.getByTestId('dynamicValue');

            const dynamicBtn = page.getByTestId('changeDynamicBtn');
            
            const resetBtn = page.getByTestId('resetDynamicBtn');

            // Trigger async update
            await dynamicBtn.click()
            await expect(dynamicValue).not.toHaveText('42', {timeout: 2000})

            // Reset
            await resetBtn.click()  
            await expect(dynamicValue).toHaveText('42', {timeout: 2000})
        })

        test('should handle multiple rapid updates gracefully', async ({page})=>{

            const dynamicValue = page.getByTestId('dynamicValue');
            const dynamicBox = page.getByTestId('dynamicBox');
            const changeBtn = page.getByTestId('changeDynamicBtn');

            
            // Click rapidly 5 times
            for (let i = 0 ; i < 5 ; i++){
                    await changeBtn.click()
                    await page.waitForTimeout(50)
            }
            
            await expect(dynamicValue).not.toHaveText('42', {timeout: 3000})
            await expect(dynamicBox).not.toHaveClass(/loading/);  

        })

    })     

    test.describe('Form & Validation',()=>{
        test('check User Alert', async({page})=>{
            const username = page.getByTestId('usernameInput')
            const usernameError = page.getByTestId('usernameError')
            username.clear()
            await expect(usernameError).toHaveClass(/show/)
        })

        test('Check only 1 or 2 charater Error', async({page})=>{
            const username = page.getByTestId('usernameInput')
            const usernameError = page.getByTestId('usernameError')
            username.clear()
            username.fill('a')
            await expect(usernameError).toHaveClass(/show/)
            username.fill('ab')
            await expect(usernameError).toHaveClass(/show/)
            username.fill('abc')
            await expect(usernameError).not.toHaveClass(/show/)
        })

        test('Role Select -Editor', async({page})=>{
           const username = page.getByTestId('usernameInput')
           const roleSelect = page.getByTestId('roleSelect')
           const submitBtn = page.getByTestId('submitFormBtn')
           const formResult = page.getByTestId('formResult')
           const toastMsg = page.getByTestId('toast')

           await roleSelect.selectOption('Editor')
           await submitBtn.click()
           
           const role = await roleSelect.inputValue();
           const user = await username.inputValue();
      
           await expect(formResult).toContainText(`${role} · ${user}`);
           await expect(toastMsg).toHaveClass(/show/)
        })
    })

   test.describe('Alerts & Dialogs',()=>{

        test('Auto accept OFF - Alert', async({page})=>{
            
            const dialogModePill = page.getByTestId('dialogModePill')
            const alertBtn = page.getByTestId('alertBtn')                      
            const alertResult = page.getByTestId('alertResult')
            await expect(dialogModePill).toHaveText(/manual/)
            await alertBtn.click()
            page.on('dialog', dialog =>{
                 console.log(dialog.message())
                 dialog.accept()
            })
            await expect(alertResult).toHaveText(/alert shown/)
        })
        test('Auto accept ON -Alert' , async({page})=>{
            const dialogModePill = page.getByTestId('dialogModePill')
            const autoaccept = page.getByTestId('autoAcceptBtn')
            const alertBtn = page.getByTestId('alertBtn')
            const toastMsg = page.getByTestId('toast')
            const alertResult = page.getByTestId('alertResult')
           
            await autoaccept.click()
            await expect(toastMsg).toHaveClass(/show/)
            await expect(dialogModePill).toHaveText(/auto/)
            await alertBtn.click()
            await expect(alertResult).toHaveText(/This is a Playwright alert test!/)
            await expect(toastMsg).toHaveClass(/show/)
        })

        test('Auto accept OFF - Confirm(OK Button)', async({page})=>{
            const dialogModePill = page.getByTestId('dialogModePill')
            const confirmBtn = page.getByTestId('confirmBtn')
            const toastMsg = page.getByTestId('toast')
            // const promptBtn = page.getByTestId('promptBtn')
            const alertResult = page.getByTestId('alertResult')
            await expect(dialogModePill).toHaveText(/manual/)
                      
            // OK Button
            page.once('dialog',async dialog =>{
                console.log(dialog.message())             
                await dialog.accept()                    
            })
            await confirmBtn.click()
            await expect(alertResult).toHaveText(/confirmed/)
            await expect(toastMsg).toHaveClass(/show/)
        })

        test('Auto accept OFF - Confirm (Cancel Button) ', async({page})=>{
            const dialogModePill = page.getByTestId('dialogModePill')
            const confirmBtn = page.getByTestId('confirmBtn')
            const toastMsg = page.getByTestId('toast')
            // const promptBtn = page.getByTestId('promptBtn')
            const alertResult = page.getByTestId('alertResult')
            await expect(dialogModePill).toHaveText(/manual/)
                      
            // Cancel Button
            page.once('dialog',async dialog =>{
                console.log(dialog.message())             
                await dialog.dismiss()                        
           })
            await confirmBtn.click()
            await expect(alertResult).toHaveText(/cancelled/)
            await expect(toastMsg).toHaveClass(/show/)
        })

        test('Auto accept ON - Confirm' , async({page})=>{
            const dialogModePill = page.getByTestId('dialogModePill')
            const autoaccept = page.getByTestId('autoAcceptBtn')
            const confirmBtn = page.getByTestId('confirmBtn')
            const alertResult = page.getByTestId('alertResult')
            const toastMsg = page.getByTestId('toast')
            await autoaccept.click()
            await expect(toastMsg).toHaveClass(/show/)        
            await expect(dialogModePill).toHaveText(/auto/)
            await confirmBtn.click()
            await expect(alertResult).toHaveText(/Confirm action?/)
            await expect(toastMsg).toHaveClass(/show/)
        })

        test('Auto accept OFF - Prompt (Ok Button)', async({page})=>{
            const dialogModePill = page.getByTestId('dialogModePill')            
            const toastMsg = page.getByTestId('toast')
            const promptBtn = page.getByTestId('promptBtn')
            const alertResult = page.getByTestId('alertResult')
            await expect(dialogModePill).toHaveText(/manual/)
            const value ='Playwright'
          
            page.on('dialog',async dialog =>{                     
                await dialog.accept(value)                    
            })

            await promptBtn.click()
            await expect(alertResult).toContainText(value)
            await expect(toastMsg).toHaveClass(/show/)
        })

        test('Auto accept OFF - Prompt (Cancel Button)', async({page})=>{
            const dialogModePill = page.getByTestId('dialogModePill')            
            const toastMsg = page.getByTestId('toast')
            const promptBtn = page.getByTestId('promptBtn')
            const alertResult = page.getByTestId('alertResult')
            await expect(dialogModePill).toHaveText(/manual/)
                     
            page.on('dialog',async dialog =>{                     
                await dialog.dismiss()                    
            })

            await promptBtn.click()
            await expect(alertResult).toHaveText(/cancelled/)
            await expect(toastMsg).toHaveClass(/show/)
        })

        test('Auto accept ON - Prompt', async({page})=>{
            const dialogModePill = page.getByTestId('dialogModePill')            
            const autoaccept = page.getByTestId('autoAcceptBtn')
            const toastMsg = page.getByTestId('toast')
            const promptBtn = page.getByTestId('promptBtn')
            const alertResult = page.getByTestId('alertResult')

            await autoaccept.click()
            await expect(toastMsg).toHaveClass(/show/)    
            await expect(dialogModePill).toHaveText(/auto/)
            await promptBtn.click()
            await expect(alertResult).toHaveText(/Enter something/)
            await expect(toastMsg).toHaveClass(/show/)
        })

    })

    test.describe('Tabs',()=>{
        test('Tab A', async({page})=>{
            const tabA = page.getByTestId('tab-tab1')
            const tabpill = page.getByTestId('tabCounter')
            const tabContent = page.getByTestId('tabContentText')

           // await tabA.click()
            await expect(tabpill).toHaveText(/Tab A/)
            await expect(tabA).toHaveClass(/active/)
            await expect(tabContent).toHaveText(/Content of Tab A/)
        })

        test('Tab B', async({page})=>{
            const tabB = page.getByTestId('tab-tab2')
            const tabpill = page.getByTestId('tabCounter')
            const tabContent = page.getByTestId('tabContentText')

            await tabB.click()
            await expect(tabpill).toHaveText(/Tab B/)
            await expect(tabB).toHaveClass(/active/)
            await expect(tabContent).toHaveText(/Content of Tab B/)
        })

         test('Tab C', async({page})=>{
            const tabC = page.getByTestId('tab-tab3')
            const tabpill = page.getByTestId('tabCounter')
            const tabContent = page.getByTestId('tabContentText')

            await tabC.click()
            await expect(tabpill).toHaveText(/Tab C/)
            await expect(tabC).toHaveClass(/active/)
            await expect(tabContent).toHaveText(/Content of Tab C/)
        })

         test('New Tab', async({page})=>{
            const newTab = page.getByTestId('newTabBtn')
            const tabpill = page.getByTestId('tabCounter')
            const tabContent = page.getByTestId('tabContentText')
            const toastMsg = page.getByTestId('toast')
            const tabD = page.getByTestId('tab-tab4')

            await newTab.click()
            await tabD.click()
            await expect(tabpill).toHaveText(/Tab D/)
            await expect(tabD).toHaveClass(/active/)
            await expect(tabContent).toHaveText(/New tab 4/)
            await expect(toastMsg).toHaveClass(/show/)

        })
    })  

    test.describe.only('Scroll & Load',()=>{
        test('Bottom Scroll', async({page})=>{
            const scrollBtn = page.getByTestId('scrollToBottomBtn')
            const scrollPill = page.getByTestId('itemCount')
            const scrollContent = page.getByTestId('scrollPos')
            const scrollContainer = page.getByTestId('scrollContainer')
            const count = await scrollContainer.locator('p').count();

            const text = await scrollContent.textContent()
            const displayedValue = parseFloat(text!.match(/[\d.]+/)![0])
            const actualValue = await scrollContainer.evaluate(el => el.scrollTop)
                    
            await scrollBtn.click()
            await expect(scrollPill).toHaveText(`${count} items`);
            expect(displayedValue).toBeCloseTo(actualValue, 1)  
        })

        test('Top Scroll', async({page})=>{
            const scrollBtn = page.getByTestId('scrollToTopBtn')
            const scrollPill = page.getByTestId('itemCount')
            const scrollContent = page.getByTestId('scrollPos')
            const scrollContainer = page.getByTestId('scrollContainer')
            const count = await scrollContainer.locator('p').count();
            
            const text = await scrollContent.textContent()
            const displayedValue = parseFloat(text!.match(/[\d.]+/)![0])
            const actualValue = await scrollContainer.evaluate(el => el.scrollTop)
            
            await scrollBtn.click()
            await expect(scrollPill).toHaveText(`${count} items`)
            expect(displayedValue).toBeCloseTo(actualValue, 1)  
        })

        test('Load 3', async({page})=>{
            const loadmore = page.getByTestId('loadMoreBtn')
            const scrollPill = page.getByTestId('itemCount')
            const scrollContent = page.getByTestId('scrollPos')
            const scrollContainer = page.getByTestId('scrollContainer')
            await loadmore.click()
            const count = await scrollContainer.locator('p').count();

            const text = await scrollContent.textContent()
            const displayedValue = parseFloat(text!.match(/[\d.]+/)![0])
            const actualValue = await scrollContainer.evaluate(el => el.scrollTop)
            expect(displayedValue).toBeCloseTo(actualValue, 1)                
            await expect(scrollPill).toHaveText(`${count} items`)
         
       })


    })
})