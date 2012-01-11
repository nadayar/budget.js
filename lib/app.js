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
			cost: BudgetJs.expenseCreateView.get('cost'), 
			description: BudgetJs.expenseCreateView.get('description'), 
			tag: BudgetJs.expenseCreateView.get('tag')
		}));
		
		BudgetJs.expenseCreateView.set('cost', 0);
		BudgetJs.expenseCreateView.set('description', "");
		BudgetJs.expenseCreateView.set('tag', "");
	},
	
	findByTag: function(tag) {
		return this.content.filter(function(item) {
			if (item.get("tag") == tag.toLowerCase()) return true;
		});
	}
});

BudgetJs.expenseCreateView = Ember.View.extend({
	cost: 0,
	description: "",
	tag: ""
});
