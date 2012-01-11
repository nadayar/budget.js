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
	}.property(),
	
	validate_income: Ember.computed(function(key, value) {
        if (arguments.length === 1) {
            return this.get('income');
        } else {
            var parseVal = parseFloat(value);
            if (parseVal < 10000) {
                alert('You don\'t need a budget tracker because you are too poor');
                return value;
            } 
            if (parseVal > 500000) {
                alert('You don\'t need a budget tracker because with an income of more than half a million life is good and you dont need to budget');
                return value;
            }
            this.set('income', value);
            return value;
        }
     }).property('income')
});

BudgetJs.Expense = Ember.Object.create({
	cost: 0,
	description: "",
	tag: ""
});

BudgetJs.expenseController = Ember.ArrayProxy.create({
	content: [],
	
	createExpense: function(cost, description, tag) {
		this.pushObject(BudgetJs.Expense.create({ 
			cost: cost, 
			description: description, 
			tag: tag.toLowerCase()
		}));
	},
	
	findByTag: function(tag) {
		return this.content.filter(function(item) {
			if (item.get("tag") == tag.toLowerCase()) return true;
		});
	}
});

BudgetJs.IsItEnough = Ember.View.extend({
	threshold: 1000000,
	incomeBinding: 'BudgetJs.Budget.income',

	isEnough: function() {
		return this.get('income') > this.get('threshold');
	}.property('income'),
});
