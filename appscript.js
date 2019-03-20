function myFunction() {

var sheet = SpreadsheetApp.getActiveSheet();
var lastRow = sheet.getLastRow();
  for(var i = 2 ; i < lastRow ; i++){  
    testGET(sheet.getRange(i,1).getValue(),lastRow,i)
  }
}

function testGET(query,lastRow , i) {
  
 
  var url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + query +'&country=US';
  
  var options =
      {
        "method"  : "GET",   
        "followRedirects" : true,
        "muteHttpExceptions": true
      };
  
  var result = UrlFetchApp.fetch(url, options);
  if (result.getResponseCode() == 200) {
        var titleColumn = "B"+i;
        var authorColumn = "C"+i;
        var categoriesColumn = "D"+i;
        var descriptinoColumn = "E"+i;
        var avgRatingColumn = "F"+i;
        var ratingCountColumn = "G"+i;

        var params = JSON.parse(result.getContentText());
        var titleRange = SpreadsheetApp.getActiveSpreadsheet().getRange(titleColumn);
        var authorRange = SpreadsheetApp.getActiveSpreadsheet().getRange(authorColumn);
        var categoriesRange = SpreadsheetApp.getActiveSpreadsheet().getRange(categoriesColumn);
        var descriptinoRange = SpreadsheetApp.getActiveSpreadsheet().getRange(descriptinoColumn);
        var avgRatingRange = SpreadsheetApp.getActiveSpreadsheet().getRange(avgRatingColumn);
        var ratingCountRange = SpreadsheetApp.getActiveSpreadsheet().getRange(ratingCountColumn);
      if(params.totalItems === 1){
        titleRange.setValue(params.items[0].volumeInfo.title)
        authorRange.setValue(params.items[0].volumeInfo.authors[0])
        categoriesRange.setValue(params.items[0].volumeInfo.categories[0])
        descriptinoRange.setValue(params.items[0].volumeInfo.description)
        avgRatingRange.setValue(params.items[0].volumeInfo.averageRating)
        ratingCountRange.setValue(params.items[0].volumeInfo.ratingsCount)
       }
  }  
}
