var BudgetJs = Ember.Application.create();
BudgetJs.Budget = Ember.Object.create({
	income: 50000,
	expenses: [],
	remainder: function() {
		var total = 0;
		this.get('expenses').getEach('cost').map(function(a) {
			total += a;
		});
		
		return total;
	}.property()
});

BudgetJs.Expense = Ember.Object.create({
	cost: 0,
	description: "",
	tag: ""
});

BudgetJs.expenseController = Ember.ArrayProxy.create({
	content: [],
	
	
	
	createExpense: function() {
		this.pushObject(BudgetJs.Expense.create({ 
			cost: BudgetJs.expenseCreateController.get('cost'), 
			description: BudgetJs.expenseCreateController.get('description'), 
			tag: BudgetJs.expenseCreateController.get('tag')
		}));
		
		BudgetJs.expenseCreateController.set('cost', 0);
		BudgetJs.expenseCreateController.set('description', "");
		BudgetJs.expenseCreateController.set('tag', "");
	},
	
	findByTag: function(tag) {
		return this.content.filter(function(item) {
			if (item.get("tag") == tag.toLowerCase()) return true;
		});
	}
});


BudgetJs.createExpenseController = Ember.Object.create({
	cost: 0,
	description: "",
	tag: ""
});