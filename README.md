# playwright-sportsdirect


Trying out playwright to see what all the fuss is about.

### install using
```npm install```

### Run using:
```npx jest```

###### Scenario: Should be on the sportsdirect main page
When: I load SportsDirect.com 
Then: the page title is "TOP SNEAKERS"
And: The header equals "SportsDirect.com – The UK’s No 1 Sports Retailer"

###### Scenario: Should search for super shoes and add to cart
Given: I am seeing the page from other country than Latvia
When: Change language modal is visible
Then: I dismiss change language modal

Given: I am searching for "super shoes"
When: I am presented with lists of shoes
And: I can find text "Response Super Mens Training Shoes"
And: I click on the text "Response Super Mens Training Shoes"
Then: Detailed page is loaded
When: I click on FIRST shoe size
And: I click on Add to cart
Then: Cart modal is opened
When: I click on View Cart
Then: MY BAG page is displayed
And: I can see "Response Super Mens Training Shoes" present on the page

