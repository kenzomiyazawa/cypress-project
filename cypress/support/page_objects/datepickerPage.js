
function selectDayFromCurrent(day){
   
    //set and get the current date using Javascript
    let date = new Date()
    date.setDate(date.getDate() + day)
    let futureDay = date.getDate()
    let futureMonth = date.toLocaleDateString('default',{month:'short'})
    let dateToAssert = futureMonth+' '+futureDay+', '+date.getFullYear()

    cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute =>{
        if(!dateAttribute.includes(futureMonth)){
            cy.get('[data-name="chevron-right"]').click()
            selectDayFromCurrent(day)
        }
        else {
            cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
        }
    }) 
    return dateToAssert
    
}
export class DatepickerPage{
    selectCommonDatePickerDateFromToday(dayFromToday){

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            let dateToAssert = selectDayFromCurrent(dayFromToday)
            cy.wrap(input).invoke('prop','value').should('contain',dateToAssert)
            cy.wrap(input).should('have.value', dateToAssert)
        })
    }

    selectDatePickerWithRangeFromToday(firstDay, secondDay){

        cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
            cy.wrap(input).click()
            let dateToAssertFirst = selectDayFromCurrent(firstDay)
            let dateToAssertSecond = selectDayFromCurrent(secondDay)
            const finalDateToAssert = dateToAssertFirst+' - '+dateToAssertSecond
            cy.wrap(input).invoke('prop','value').should('contain',finalDateToAssert)
            cy.wrap(input).should('have.value', finalDateToAssert)
        })
    }
       
}

export const onDatePickerPage = new DatepickerPage()