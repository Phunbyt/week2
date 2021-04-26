/**
 * This is the entry point to the program
 * Question 1 - Classifier
 *
 * @param {any} newInput Array of student objects
 */
function classifier(input) {
    // to make a deep copy of the array, used the JSON method
    let newInput = JSON.parse(JSON.stringify(input))

    // looped through the array to get the age and created an age property in the array
    for (let inputDate of newInput) {
        let date = new Date().getFullYear() - new Date(inputDate.dob).getFullYear();
        inputDate.age = date
    }
    // to pass the case of "empty arrays", returned the object's number of groups as 0
    if (newInput.length === 0) return { noOfGroups: 0 }

    // to create and ordered list, the inputs in the array was sorted based on their age
    newInput.sort((a, b) => a.age - b.age)

    // created a temporary array (stack) and a sorted array (grouped) which holds the inputs in the array
    // and grouped them into various sub groups
    let grouped = []
    let stack = [];

    stack.push(newInput[0])

    for (let i = 1; i < newInput.length; i++) {
        let student = newInput[i];
        if (student.age - stack[0].age <= 5 && stack.length <= 2) {
            stack.push(student)
        } else {
            grouped.push(stack);
            stack = []
            stack.push(student)
        }
    }

    // this is to pass the check if the stack array is still holding any values, it should be pushed to the grouped for further manipulations
    if (stack !== null) {
        grouped.push(stack);
    }

    // the result object is created with the value of the number of groups
    let result = {
        noOfGroups: grouped.length,
    }

    // to create a dynamic object, i looped throughtthe length of the grouped array
    for (let i = 0; i < grouped.length; i++) {
        let subgroup = grouped[i]
        let total = 0
        let regs = []

        // the total sum of ages is gotten by looping through the subarrays in the main array (grouped) and getting every students age
        // the registration numbers of the students are also pushed into an array

        for (let student of subgroup) {
            total += student.age
            regs.push(Number(student.regNo))
        }

        // here the values in the registration numbers are sorted in an ascending order
        regs.sort((a, b) => a - b)

        // a grouped variable is named and it is incremented by "i", then it is set as the property in the result object
        // here the properties of the groups are being created with their corresponding values.
        let group = `group${i + 1}`
        result[group] = {
            members: subgroup,
            oldest: subgroup[subgroup.length - 1].age,
            sum: total,
            regNos: regs
        }
    }
    return result;
}

module.exports = classifier;
