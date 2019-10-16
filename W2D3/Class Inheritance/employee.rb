class Employee
  attr_reader :employees

  def initialize(name, title, salary, boss)
    @name = name
    @title = title
    @salary = salary
    @boss = boss
    @employees = nil
  end

  def bonus(multiplier)
    (salary) * multiplier
  end

  protected
  attr_reader :salary, :name
end
