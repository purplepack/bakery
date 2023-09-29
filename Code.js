function doGet(e) {
  if (!e.parameter.page) 
  {
    var htmlOutput =  HtmlService.createTemplateFromFile('index');
    return htmlOutput.evaluate();
  }
  else if(e.parameter['page'] == 'sales')
  {
    Logger.log(JSON.stringify(e));
    var htmlOutput =  HtmlService.createTemplateFromFile('sales');
    return htmlOutput.evaluate();  
  }
  else if(e.parameter['page'] == 'add')
  {
    var htmlOutput =  HtmlService.createTemplateFromFile('add');
    return htmlOutput.evaluate();  
  } 
  else if(e.parameter['page'] == 'cashier')
  {
    var htmlOutput =  HtmlService.createTemplateFromFile('cashier');
    return htmlOutput.evaluate();  
  } 
  else if(e.parameter['page'] == 'store')
  {
    var htmlOutput =  HtmlService.createTemplateFromFile('store');
    return htmlOutput.evaluate();  
  } 
  else if(e.parameter['page'] == 'receipt')
  {
    var htmlOutput =  HtmlService.createTemplateFromFile('receipt');
    return htmlOutput.evaluate();  
  } 
  else if(e.parameter['page'] == 'ingredients')
  {
    var htmlOutput =  HtmlService.createTemplateFromFile('ingredients');
    return htmlOutput.evaluate();  
  } 
  else if(e.parameter['page'] == 'newingredients')
  {
    var htmlOutput =  HtmlService.createTemplateFromFile('newingredients');
    return htmlOutput.evaluate();  
  } 
  else if(e.parameter['page'] == 'index')
  {
    var htmlOutput =  HtmlService.createTemplateFromFile('index');
    return htmlOutput.evaluate();  
  }   
}

function acceptAddData(addForm) {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName("Products")
  ws.appendRow([
                addForm.productId,
                addForm.productName,
                addForm.description,
                addForm.price,
                addForm.cost,
                addForm.quantity,
                addForm.supplierInfo,
                addForm.taxRate,
                addForm.categories
  ])
}

function acceptAddIngredientsForm(addIngredientsForm) {
  const currentDate = new Date()
  const status = "received"
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName("Movement")
  const email = Session.getActiveUser().getEmail()
  ws.appendRow([
                currentDate.getTime(),
                addIngredientsForm.ingredient,
                addIngredientsForm.quantity,
                status,
                currentDate,
                email
  ])
}

function acceptCreateIngredientsForm(createIngredientsForm) {
  const currentDate = new Date()
  const status = "received"
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName("Ingredients List")
  const email = Session.getActiveUser().getEmail()
  console.log(createIngredientsForm)
  ws.appendRow([
                currentDate.getTime(),
                createIngredientsForm.ingredient,
                createIngredientsForm.unit,
                createIngredientsForm.triggerLevel,
                currentDate,
                email
  ])
}

function getCategories(){
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName("Products")
  const categories = ws.getRange("B2:B").getValues().filter(r => r[0] !== "").map(r => r[0])
  console.log(categories)
  return categories
}

function getIngredients(){
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName("Ingredients List")
  const ingredients = ws.getRange("B2:C").getValues().filter(r => r[0] !== "") //.map(r => r[0])
  console.log(ingredients)
  return ingredients
}

function acceptSalesData(salesForm) {
  console.log(salesForm)

  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName("Sales")
  const email = Session.getActiveUser().getEmail()

  for (const product of salesForm.product) {
    ws.appendRow([
      salesForm.cashierId,
      salesForm.customerName,
      product,
      salesForm.qty[salesForm.product.indexOf(product)],
      salesForm.pricePerQty[salesForm.product.indexOf(product)],
      salesForm.discounts,
      salesForm.subtotal,
      salesForm.taxes,
      salesForm.total[salesForm.product.indexOf(product)],
      salesForm.paymentMethod,
      email
    ])
  }
}

function onFormSubmit(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName("Staffs")
  // Get the form response data.
  var response = e.response;

  // Send an email notification to the user.
  var email = {
    to: response["Email Address"],
    subject: "Form submission notification",
    body: "You have submitted the form successfully."
  };
  MailApp.sendEmail(email);
}

function getStoreIngredients(){
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName("Movement")
  const ingredients = ws.getRange("A3:G").getValues().filter(r => r[0] !== "") //.map(r => r[0])
  console.log(ingredients)
  return ingredients
}





