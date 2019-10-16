require_relative 'employee.rb'

class Manager < Employee
  def initialize(name, title, salary, boss, employees)
    super(name, title, salary, boss)
    @employees = employees
  end

  def bonus(multiplier)
    total_salary_of_employees = 0
    employees.each do |employee|
      unless employee.employees.nil?
        total_salary_of_employees += employee.salary
        total_salary_of_employees += employee.bonus(1)
      else
        total_salary_of_employees += employee.salary
      end
    end
    total_salary_of_employees * multiplier
  end

  protected
  attr_reader :salary, :employees
end

david = Employee.new("David", "TA", 10000, "Darren")
shawna = Employee.new("Shawna", "TA", 12000, "Darren")
darren = Manager.new("Darren", "TA Manager", 78000, "Ned", [david, shawna])
ned = Manager.new("Ned", "Founder", 1000000, "", [darren])

p ned.bonus(5)
# p darren.bonus(4)