/**
 * Laundry Problem
 * Question 2
 *
 * @returns {any} Trip data analysis
 */
function getMaxPairs(noOfWashes, cleanPile, dirtyPile) {
    let pair = 0;
    let stackOfClean = []
        //here the clean pile of socks are sorted into a stack. if they match the previous
        // input in the stack of clean socks, the value of pair increases, else they are pushed into the stackOfClean array
    cleanPile.sort((a, b) => a - b)
    for (let i = 0; i < cleanPile.length; i++) {
        let unpairedClean = cleanPile[i]
        if (stackOfClean.length == 0) {
            stackOfClean.push(unpairedClean)
        } else if (stackOfClean.length > 0) {
            if (stackOfClean[stackOfClean.length - 1] == unpairedClean) {
                stackOfClean.pop()
                pair++
            } else {
                stackOfClean.push(unpairedClean)
            }
        }
    }

    // here, if there is an available number of washes, the values in the stackOfClean array are checked against the values in the
    // dirty pile.
    // to remove the matching values from the dirtypile, the splice and finde index functions are used
    for (let i = 0; i < stackOfClean.length; i++) {
        let matchAndWash = stackOfClean[i]
        if (noOfWashes > 0) {
            if (dirtyPile.includes(matchAndWash)) {
                noOfWashes--;
                pair++
                let getIndex = dirtyPile.findIndex((val) => val == matchAndWash)
                dirtyPile.splice(getIndex, 1)
            }
        }
    }


    dirtyPile.sort((a, b) => a - b)

    let holder = []

    // here if there are still number of washes available, the dirtypiles are sorted and if the values
    // match the previous value, the pair variable is increased

    for (let i = 0; i < dirtyPile.length; i++) {
        let compareSocks = dirtyPile[i]
        if (noOfWashes >= 2) {
            if (holder.length == 0) {
                holder.push(compareSocks)
            } else if (noOfWashes > 0) {

                if (holder[holder.length - 1] == compareSocks) {
                    holder.pop();
                    pair++
                    noOfWashes -= 2
                } else {
                    holder.push(compareSocks)
                }
            }
        }
    }
    return pair;
    // at the end of the day, all these issues won't arise
    // if Anna had just saved up some cash and gotten herself a more useful
    // and usable washing machine.
}

module.exports = getMaxPairs;
