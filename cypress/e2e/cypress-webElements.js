/// <reference types="cypress" />

describe ('webElements',() =>{

    beforeEach('Go To Form Layour Page',() => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
    })
    it('firstTest',()=> {

        //find by Tag
        cy.get('input')

        //find by ID
        cy.get('#inputEmail1')

        //find by Attributes
        cy.get('[placeholder]')

        //find by Attributes with value
        cy.get('[placeholder="Email"]')

        //find by Class
        cy.get('.input-full-width')

        //find by Entire Class value

        //find by two or more attributes
        cy.get('[placeholder="Email"][fullwidth]')

        //find by tag,attributes,id
        cy.get('input[placeholder="Email"]#inputEmail1')

        //find by Cypress ID
        cy.get('[data-cy="imputEmail1"]')
    })
    
    it('secondTest', () => {

        cy.get('#inputEmail3').type('syazwan@gmail.com')
        cy.get('#inputPassword3').type('password123')
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain','Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()
    })

    it('save subject to command', () => {
        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain','Password')

        //Code that work in other language but not in Cypress
        //const usingTheGrid = cy.contains('nb-card', 'Using the Grid')
        //usingTheGrid.find('[for="inputPassword2"]').should('contain','Email')
        //usingTheGrid..find('[for="inputPassword2"]').should('contain','Password')

        //1 - Cypress alias
        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid')
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain','Email')
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain','Password')

        //2 - Cypress + JQuery then() method
        cy.contains('nb-card', 'Using the Grid').then(usingGridForm =>{
            cy.wrap(usingGridForm).find('[for="inputEmail1"]').should('contain','Email')
            cy.wrap(usingGridForm).find('[for="inputPassword2"]').should('contain','Password')
        })

    })

    it('extract test value', () =>{

        //1 - Cypress command
        cy.get('[for="exampleInputEmail1"]').should('contain','Email address')

        //2 - JQuery function
        cy.get('[for="exampleInputEmail1"]').then(label =>{
            const labelText = label.text()
            expect(labelText).to.equal('Email address')
            //OR
            cy.wrap(label).should('contain','Email address')
        })

        //3 - Cypress invoke method
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text =>{
            expect(text).to.equal('Email address')
        })
        //OR
        cy.get('[for="exampleInputEmail1"]').invoke('text').should('contain','Email address')
        //Save as alias
        cy.get('[for="exampleInputEmail1"]').invoke('text').as('labelTest').should('contain','Email address')

        //4 - Get attribute 
        cy.get('[for="exampleInputEmail1"]').invoke('attr','class').then(classValue =>{
            expect(classValue).to.equal('label')
        })

        //5 - Invoke properties
        cy.get('#exampleInputEmail1').type('test@test.com')
        cy.get('#exampleInputEmail1').invoke('prop','value').should('contain','test@test.com')
    })

    it ('Checkbox and Radio button',()=>{
        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButton =>{
            cy.wrap(radioButton).eq(0).check({force: true}).should('be.checked')
            cy.wrap(radioButton).eq(1).check({force: true}).should('be.checked')
            cy.wrap(radioButton).eq(0).should('not.be.checked')
            cy.wrap(radioButton).eq(2).should('be.disabled')
        })

        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        //Check - will check current status before perform the command
        cy.get('[type="checkbox"]').check({force:true})
        cy.get('[type="checkbox"]').uncheck({force:true})

        //Click - wil perform without checking
        cy.get('[type="checkbox"]').eq(0).click({force: true})
        cy.get('[type="checkbox"]').eq(1).click({force: true})

    })

    it('Date picker', () =>{

        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()

            //Loop function in Cypress
            function selectDateToAssert(day){

                //set and get the current date using Javascript
                let date = new Date()
                date.setDate(date.getDate() + day)
                let futureDay = date.getDate()
                let futureMonth = date.toLocaleDateString('en-US',{month:'short'})
                let futureYear = date.getFullYear()
                let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`

                cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute =>{
                    if(!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)){
                        cy.get('[data-name="chevron-right"]').click()
                        selectDateToAssert(day)
                    }
                    else {
                        cy.get('.day-cell').not('bounding-month').contains(futureDay).click()
                    }
                }) 
                return dateToAssert
            }

            const dateToAssert = selectDateToAssert(300)
            cy.wrap(input).invoke('prop','value').should('contain',dateToAssert)
            cy.wrap(input).should('have.value', dateToAssert)
        })

    })

    it ('list & dropdown', () =>{

        //1-simple selection
        cy.get('nav').find('nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav').find('nb-select').should('contain','Dark')

        //2 using Each function to loop option
        cy.get('nav nb-select').then(dropDown =>{
            cy.wrap(dropDown).click()
            cy.get('.options-list nb-option').each( (listItem,index) => {
                const itemText = listItem.text().trim()
                cy.wrap(listItem).click()
                cy.wrap(dropDown).should('contain', itemText)
                if(index<3){
                    cy.wrap(dropDown).click()
                }
            })
        })
    })

    it ('Web Tables', () =>{

        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //1 Get the row
        cy.get('tbody').contains('tr', 'Larry').then( tableRow =>{
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('19')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            //Get by table row index
            cy.wrap(tableRow).find('td').eq(6).should('contain', '19')

        })

        //2 Get by index
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Harry')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Victor')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then( tableColumn => {
            cy.wrap(tableColumn).eq(2).should('contain', 'Harry')
            cy.wrap(tableColumn).eq(3).should('contain', 'Victor')
        })

        //3 Get each row validated
        cy.get('thead [placeholder="Age"]').clear().type('20')
        cy.wait(500)
        cy.get('tbody tr').each(tableRow =>{
            cy.wrap(tableRow).find('td').eq(6).should('contain', '20')
        })
        
        //Check every value in array
        const age = [20,19,40,200]

        cy.wrap(age).each(age =>{
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each(tableRow =>{
                if (age == 200){
                    cy.wrap(tableRow).should('contain', 'No data found')
                }
                else{
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)

                }      
            })

        })
        
    })

    it ('Tooltips',() =>{
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips')
            .contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })

    it.only ('dialog box', () =>{
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //First method - Will not failed if no message appear
        // cy.get('tbody tr').first().find('.nb-trash').click()
        // cy.on('window:confirm', (confirm) =>{
        //     expect(confirm).to.equal('Are you sure you want to delete?')
        // } )

        //Second method 
        const stub = cy.stub() //If no popup. the value will be emptied
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(() =>{
             expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
         })

        //Cancel the dialog
        // cy.get('tbody tr').first().find('.nb-trash').click()
        // cy.on('window:confirm', () => false)
    })
})