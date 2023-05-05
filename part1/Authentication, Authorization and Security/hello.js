// // function getTopStocks(stocks, prices) {
// //     const averages = [];
  
// //     // Calculate the average price for each stock
// //     for (let i = 0; i < stocks.length; i++) {
// //       let total = 0;
// //       for (let j = 0; j < prices[i].length; j++) {
// //         total += prices[i][j];
// //       }
// //       const average = total / prices[i].length;
// //       averages.push({ stock: stocks[i], average: average });
// //     }
  
// //     // Sort the averages in descending order
// //     averages.sort((a, b) => b.average - a.average);
  
// //     // Return the top three stocks
// //     const topStocks = [];
// //     for (let i = 0; i < 3 && i < averages.length; i++) {
// //       topStocks.push(averages[i].stock);
// //     }
// //     return topStocks;
// //   }


// function getTopStocks(stocks, prices) {
//     const averages = [];
  
//     // Calculate the average price for each stock
//     for (let i = 0; i < stocks.length; i++) {
//       let total = 0;
//       for (let j = 0; j < prices[i].length; j++) {
//         total += prices[i][j];
//       }
//       const average = total / prices[i].length;
//       averages.push({ stock: stocks[i], average: average });
//     }
  
//     // Sort the averages in descending order
//     averages.sort((a, b) => b.average - a.average);
  
//     // Return the top three stocks
//     const topStocks = [];
//     for (let i = 0; i < 3; i++) {
//       topStocks.push(averages[i].stock);
//     }
//     return topStocks;
//   }
  
  
// const stocks = ['AMZN', 'CACC', 'EQIX', 'GOOG', 'ORLY', 'ULTA'];
// const prices = [
//   [12.81, 11.09, 12.11, 10.93, 9.83, 8.14],
//   [10.34, 10.56, 10.14, 12.1, 11.29, 10.12],
//   [8.98, 9.31, 9.04, 8.92, 9.1, 8.89],
//   [11.08, 11.24, 10.87, 11.32, 11.5, 11.13],
//   [9.25, 9.43, 9.67, 9.13, 9.56, 9.34],
//   [10.78, 10.32, 11.01, 10.84, 10.92, 10.67]
// ];

// const topStocks = getTopStocks(stocks, prices);
// console.log(topStocks);

// function FindSumPair(numbers, k) {
//     const seen = {};
//     for (let i = 0; i < numbers.length; i++) {
//       const complement = k - numbers[i];
//       if (seen[complement] !== undefined) {
//         return [seen[complement], i];
//       }
//       seen[numbers[i]] = i;
//     }
//     return [0, 0];
//   }


// console.log(FindSumPair([1,5,8,1,2], 13))

// function isDuodigit(number) {
//     const digits = new Set([...String(number)]);
//     return digits.size <= 2;
//   }
  
//   function Duodigit(number) {
//     return isDuodigit(number) ? `${number} is a duodigit` : `${number} is not a duodigit`;
//   }

//   console.log(Duodigit(12)); // "12 is a duodigit"
// console.log(Duodigit(1633333)); // "1633333 is a duodigit"
// console.log(Duodigit(102));

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrent = function(nums) {
  let numb = 0;
  let result = []
  for(let i = 0; i < nums.length; i++){
    numb = 0
      for(let j=0; j < nums.length; j++){
          if(nums[i]>nums[j]){
              numb++
          }
      }
      result.push(numb)

  }
  return result
  
};

console.log( smallerNumbersThanCurrent([6,5,4,8]))
