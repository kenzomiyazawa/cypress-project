
import { onDatePickerPage } from "../support/page_objects/datepickerPage"
import { onFormLayoutPage } from "../support/page_objects/formLayoutPage"
import { navigateTo } from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"

describe ('Test with Page Objects', () =>{

    beforeEach('Go To Form Layout Page',() => {
        cy.openHomePage()
    })

    it('verify navigation action',() =>{
        navigateTo.formLayoutPage()
        navigateTo.datePickerPage()
        navigateTo.toasterPage()
        navigateTo.smartTablePage()
        navigateTo.toolTipPage()
    })

    it('should submit Inline and Basic form and select tomorow date in the calendar', () =>{
        navigateTo.formLayoutPage()
        onFormLayoutPage.submitInLineformWithNameAndEmail('John Doe', 'john.doe@gmail.com')
        onFormLayoutPage.submitBasicForm('john.doe@gmail.com','password123')
        navigateTo.datePickerPage()
        onDatePickerPage.selectCommonDatePickerDateFromToday(1)
        onDatePickerPage.selectDatePickerWithRangeFromToday(2, 7)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('Michael', 'Jackson')
        onSmartTablePage.updateAgeByFirstName('Michael', 19)
        onSmartTablePage.deleteRowByIndex(1)

    })
})
