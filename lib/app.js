var BudgetJs = Ember.Application.create();
BudgetJs.Budget = Ember.Object.create({
	income: 50000,
	expenses: [],
	
	profit: function() {
	    var total_expenses = 0;
		this.get('expenses').getEach('cost').map(function(a) {
			total_expenses += a;
		});
		
		return this.get('income') - total_expenses;
		
	}.property('income')
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


<<<<<<< HEAD
BudgetJs.createExpenseController = Ember.Object.create({
	cost: 0,
	description: "",
	tag: ""
});
=======


BudgetJs.IsItEnough = Ember.View.extend({
	threshold: 1000000,
	incomeBinding: 'BudgetJs.Budget.income',

	isEnough: function() {
		return this.get('income') > this.get('threshold');
	}.property('income'),
});
>>>>>>> upstream/master
