'use strict';

function cs142MakeMultiFilter (originalArray){
    return function arrayFilterer (filterCriteria, callback) {
        currentArray = originalArray;
        for (s of currentArray) {
                if filterCriteria(s) {
                delete currentArray.index(s);
                }
        callback(currentArray){
            this.
            }
        }
        }

    }
}